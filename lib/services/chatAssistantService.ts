import type { ChatMessage } from "@/types/chat";
import { findFaqAnswer } from "@/lib/content/faqMatcher";

// Simulated per-chunk delay (ms) so the frontend's streaming UI still shows
// a natural typing effect, even though the answer comes from a static
// dataset instead of a live model. Set to 0 to disable and send instantly.
const CHUNK_DELAY_MS = 15;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Answers purely from the local FAQ dataset (see faqData.ts) — no external
// AI/API call is made. Returns a plain-text ReadableStream so the existing
// HTTP route and DB-persistence code can consume it exactly as before.
export async function streamAssistantReply(history: ChatMessage[]): Promise<ReadableStream<Uint8Array>> {
    const lastUserMessage = [...history].reverse().find((m) => m.role === "user");
    const { answer } = findFaqAnswer(lastUserMessage?.content ?? "");

    const encoder = new TextEncoder();
    // Chunk by word so the stream still "types" the answer out, matching
    // the UX of the previous Anthropic-backed streaming response.
    const words = answer.split(/(\s+)/); // keep whitespace as separate chunks

    return new ReadableStream<Uint8Array>({
        async start(controller) {
            try {
                for (const word of words) {
                    if (word.length === 0) continue;
                    controller.enqueue(encoder.encode(word));
                    if (CHUNK_DELAY_MS > 0) await sleep(CHUNK_DELAY_MS);
                }
            } catch (err) {
                controller.error(err);
                return;
            }
            controller.close();
        },
        cancel() {
            // Nothing to clean up — no network request in flight.
        },
    });
}