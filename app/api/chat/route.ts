import { NextResponse } from "next/server";
import {
    addMessage,
    createConversation,
    getConversationById,
    getMessagesForConversation,
} from "@/lib/services/chatService";
import { streamAssistantReply } from "@/lib/services/chatAssistantService";
import type { ChatSendInput } from "@/types/chat";

const MAX_MESSAGE_LENGTH = 4000;
// How many recent turns to send back to the model as context. Keeps token
// usage/latency bounded on very long-running conversations.
const MAX_HISTORY_MESSAGES = 20;

export async function POST(request: Request) {
    let body: Partial<ChatSendInput>;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const message = (body.message ?? "").trim();
    if (!message) {
        return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json(
            { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
            { status: 400 }
        );
    }

    try {
        // Resume an existing conversation if a valid id was passed, otherwise
        // start a new one for this visitor.
        let conversation = body.conversationId ? await getConversationById(body.conversationId) : null;
        if (!conversation) {
            conversation = await createConversation({
                visitorName: body.visitorName,
                visitorEmail: body.visitorEmail,
            });
        }

        await addMessage(conversation.id, "user", message);

        const history = (await getMessagesForConversation(conversation.id)).slice(-MAX_HISTORY_MESSAGES);
        const upstream = await streamAssistantReply(history);

        // Tee the stream: one branch goes straight to the browser, the other
        // is buffered in the background and saved to the DB once complete —
        // so the reply shows up in the dashboard without slowing down the
        // response the visitor sees.
        const [forClient, forStorage] = upstream.tee();

        (async () => {
            const reader = forStorage.getReader();
            const decoder = new TextDecoder();
            let full = "";
            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    full += decoder.decode(value, { stream: true });
                }
                if (full.trim()) {
                    await addMessage(conversation.id, "assistant", full.trim());
                }
            } catch (err) {
                console.error("Failed to persist assistant reply:", err);
            }
        })();

        return new Response(forClient, {
            headers: {
                "content-type": "text/plain; charset=utf-8",
                "x-conversation-id": conversation.id,
                "cache-control": "no-store",
            },
        });
    } catch (error) {
        console.error("Chat request failed:", error);
        const message =
            error instanceof Error && error.message.includes("ANTHROPIC_API_KEY")
                ? "The chat assistant isn't configured yet. Please try again later."
                : "Something went wrong. Please try again.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
