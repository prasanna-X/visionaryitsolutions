"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Loader2 } from "lucide-react";
import { C, display, body, mono } from "@/components/tokens";

type WidgetMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

const STORAGE_KEY = "vits_chat_conversation_id";
const WELCOME: WidgetMessage = {
    id: "welcome",
    role: "assistant",
    content: "Hi! I'm the VITS assistant. Ask me anything about our services, products, or how to get in touch.",
};

function newId() {
    return Math.random().toString(36).slice(2);
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<WidgetMessage[]>([WELCOME]);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const conversationIdRef = useRef<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        conversationIdRef.current = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, isOpen]);

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        const text = input.trim();
        if (!text || isSending) return;

        setError(null);
        setInput("");
        setMessages((prev) => [...prev, { id: newId(), role: "user", content: text }]);
        setIsSending(true);

        const assistantId = newId();
        setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    conversationId: conversationIdRef.current,
                }),
            });

            if (!res.ok || !res.body) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Something went wrong. Please try again.");
            }

            const newConversationId = res.headers.get("x-conversation-id");
            if (newConversationId) {
                conversationIdRef.current = newConversationId;
                localStorage.setItem(STORAGE_KEY, newConversationId);
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                setMessages((prev) =>
                    prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
                );
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        } finally {
            setIsSending(false);
        }
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed z-50 flex flex-col overflow-hidden"
                    style={{
                        bottom: 96,
                        right: 24,
                        width: "min(380px, calc(100vw - 32px))",
                        height: "min(560px, calc(100vh - 140px))",
                        background: C.panel2,
                        border: `1px solid ${C.line}`,
                        borderRadius: 20,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3.5 shrink-0"
                        style={{ background: C.panel, borderBottom: `1px solid ${C.line}` }}
                    >
                        <div className="flex items-center gap-2.5">
                            <span
                                className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                                style={{ background: C.accentDeep }}
                            >
                                <Bot size={16} color={C.accentSoft} />
                            </span>
                            <div>
                                <div style={{ fontFamily: display, color: C.ink, fontSize: 14, fontWeight: 600 }}>
                                    VITS Assistant
                                </div>
                                <div style={{ fontFamily: mono, color: C.inkFaint, fontSize: 10.5 }}>
                                    AI-powered · usually replies instantly
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                            className="p-1.5 rounded-lg focus-ring"
                            style={{ color: C.inkDim }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className="max-w-[85%] px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap break-words"
                                style={{
                                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                                    background: m.role === "user" ? C.accentDeep : C.panel,
                                    color: m.role === "user" ? C.accentSoft : C.ink,
                                    fontFamily: body,
                                    fontSize: 13.5,
                                    lineHeight: 1.5,
                                    borderBottomRightRadius: m.role === "user" ? 4 : 16,
                                    borderBottomLeftRadius: m.role === "assistant" ? 4 : 16,
                                }}
                            >
                                {m.content || (
                                    <span className="inline-flex items-center gap-1.5" style={{ color: C.inkFaint }}>
                                        <Loader2 size={13} className="animate-spin" /> thinking…
                                    </span>
                                )}
                            </div>
                        ))}
                        {error && (
                            <div style={{ color: "#E8A468", fontFamily: mono, fontSize: 11.5 }}>{error}</div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={sendMessage} className="flex items-center gap-2 p-3 shrink-0" style={{ borderTop: `1px solid ${C.line}` }}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message…"
                            disabled={isSending}
                            className="flex-1 px-3.5 py-2.5 rounded-full focus-ring outline-none"
                            style={{
                                background: C.panel,
                                color: C.ink,
                                fontFamily: body,
                                fontSize: 13.5,
                                border: `1px solid ${C.line}`,
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isSending || !input.trim()}
                            aria-label="Send message"
                            className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 focus-ring transition-opacity disabled:opacity-40"
                            style={{ background: C.accent }}
                        >
                            <Send size={16} color={C.bg} />
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle button — sits right of the WhatsApp button */}
            <div className="fixed z-50 group flex flex-col items-center" style={{ bottom: 24, right: 24 }}>
                <span
                    className="mb-3 px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium opacity-0 translate-y-2 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-full"
                    style={{
                        background: "#111814",
                        color: "#fff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                >
                    {isOpen ? "Close chat" : "Chat with us"}
                </span>
                <button
                    onClick={() => setIsOpen((v) => !v)}
                    aria-label={isOpen ? "Close chat" : "Chat with the VITS assistant"}
                    className="relative flex items-center justify-center w-14 h-14 rounded-full focus-ring transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
                    style={{
                        background: C.accent,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                    }}
                >
                    {isOpen ? <X size={24} color={C.bg} /> : <Bot size={24} color={C.bg} />}
                </button>
            </div>
        </>
    );
}