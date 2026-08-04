import { getCompanyDetails } from "@/lib/services/companyService";
import { getAllServices } from "@/lib/services/serviceService";
import { getAllProducts } from "@/lib/services/productService";
import type { ChatMessage } from "@/types/chat";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-5";
const MAX_TOKENS = 1024;
const SYSTEM_PROMPT_TTL_MS = 5 * 60 * 1000; // rebuild every 5 min so edits in the dashboard show up without a redeploy

let cachedSystemPrompt: { prompt: string; expiresAt: number } | null = null;

// Pulls live company/services/products data (same source as the public
// site) so the assistant always answers from what's actually published,
// rather than a hardcoded description that drifts out of date.
async function buildSystemPrompt(): Promise<string> {
    if (cachedSystemPrompt && cachedSystemPrompt.expiresAt > Date.now()) {
        return cachedSystemPrompt.prompt;
    }

    const [company, services, products] = await Promise.all([
        getCompanyDetails().catch(() => null),
        getAllServices().catch(() => []),
        getAllProducts().catch(() => []),
    ]);

    const companyName = company?.name || "the company";
    const lines: string[] = [];

    lines.push(
        `You are the AI support assistant embedded on the ${companyName} website. You help visitors understand what ${companyName} does, answer questions about its services and products, and point qualified visitors toward getting in touch.`
    );

    if (company?.tagline || company?.description) {
        lines.push("", "## About the company");
        if (company.tagline) lines.push(`Tagline: ${company.tagline}`);
        if (company.description) lines.push(company.description);
    }

    if (services.length) {
        lines.push("", "## Services offered");
        for (const s of services as { title: string; description: string }[]) {
            lines.push(`- ${s.title}: ${s.description}`);
        }
    }

    const publishedProducts = (products as { status: string; title: string; tagline?: string | null; description: string }[]).filter(
        (p) => p.status === "published"
    );
    if (publishedProducts.length) {
        lines.push("", "## Products");
        for (const p of publishedProducts) {
            lines.push(`- ${p.title}${p.tagline ? ` — ${p.tagline}` : ""}: ${p.description}`);
        }
    }

    const contactBits: string[] = [];
    if (company?.email) contactBits.push(`email ${company.email}`);
    if (company?.phone) contactBits.push(`phone ${company.phone}`);
    if (contactBits.length) {
        lines.push(
            "",
            "## Contact",
            `Visitors can reach the team via ${contactBits.join(" or ")}, or the Contact page / WhatsApp button on the site.`
        );
    }

    lines.push(
        "",
        "## Guidelines",
        "- Be concise, warm, and professional. Prefer short paragraphs or brief bullet lists over long essays.",
        "- Only answer from the information above and general, non-sensitive professional knowledge. Never invent pricing, timelines, or commitments you don't have information about.",
        "- If you don't know something specific (exact pricing, delivery timelines, custom requirements), say so honestly and suggest the visitor use the Contact page or WhatsApp button to reach the team directly.",
        "- If asked something unrelated to the company or its offerings, briefly and politely redirect back to how you can help.",
        "- Never claim to be a human. If asked, say plainly that you're an AI assistant for the site."
    );

    const prompt = lines.join("\n");
    cachedSystemPrompt = { prompt, expiresAt: Date.now() + SYSTEM_PROMPT_TTL_MS };
    return prompt;
}

// Calls the Anthropic Messages API with streaming and returns a plain-text
// ReadableStream of just the reply's text (SSE framing stripped out), so
// both the HTTP response to the browser and DB persistence can consume it
// directly without knowing anything about Anthropic's wire format.
export async function streamAssistantReply(history: ChatMessage[]): Promise<ReadableStream<Uint8Array>> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        throw new Error(
            "ANTHROPIC_API_KEY is not set. Add it to your .env / hosting provider's environment variables."
        );
    }

    const system = await buildSystemPrompt();
    const model = process.env.ANTHROPIC_CHAT_MODEL || DEFAULT_MODEL;

    const messages = history.map((m) => ({ role: m.role, content: m.content }));

    const response = await fetch(ANTHROPIC_API_URL, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
            model,
            max_tokens: MAX_TOKENS,
            system,
            messages,
            stream: true,
        }),
    });

    if (!response.ok || !response.body) {
        const text = await response.text().catch(() => "");
        throw new Error(`Anthropic API error (${response.status}): ${text || response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    return new ReadableStream<Uint8Array>({
        async start(controller) {
            let buffer = "";
            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() ?? ""; // keep the last, possibly-incomplete line for next read

                    for (const line of lines) {
                        if (!line.startsWith("data:")) continue;
                        const data = line.slice(5).trim();
                        if (!data || data === "[DONE]") continue;

                        try {
                            const event = JSON.parse(data);
                            if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
                                controller.enqueue(encoder.encode(event.delta.text as string));
                            }
                        } catch {
                            // Malformed/partial SSE payload — skip rather than kill the stream.
                        }
                    }
                }
            } catch (err) {
                controller.error(err);
                return;
            }
            controller.close();
        },
        cancel() {
            reader.cancel();
        },
    });
}
