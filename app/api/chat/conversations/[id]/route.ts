import { NextResponse } from "next/server";
import { deleteConversation, updateConversationStatus } from "@/lib/services/chatService";
import type { ChatConversationStatus } from "@/types/chat";

const VALID_STATUSES: ChatConversationStatus[] = ["active", "closed"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let body: { status?: ChatConversationStatus };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!body.status || !VALID_STATUSES.includes(body.status)) {
        return NextResponse.json(
            { error: `Status must be one of: ${VALID_STATUSES.join(", ")}.` },
            { status: 400 }
        );
    }

    try {
        const conversation = await updateConversationStatus(id, body.status);
        return NextResponse.json({ success: true, conversation });
    } catch (error) {
        console.error("Failed to update conversation status:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await deleteConversation(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete conversation:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
