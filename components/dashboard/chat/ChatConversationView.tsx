"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { C, display, body, mono } from "@/components/tokens";
import type { ChatConversationWithMessages, ChatConversationStatus } from "@/types/chat";

function formatDate(iso: string) {
    return new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

export default function ChatConversationView({
    conversation,
}: {
    conversation: ChatConversationWithMessages;
}) {
    const router = useRouter();
    const [status, setStatus] = useState<ChatConversationStatus>(conversation.status);
    const [saving, setSaving] = useState(false);

    async function toggleStatus() {
        const next: ChatConversationStatus = status === "active" ? "closed" : "active";
        setSaving(true);
        try {
            const res = await fetch(`/api/chat/conversations/${conversation.id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ status: next }),
            });
            if (res.ok) setStatus(next);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this conversation? This can't be undone.")) return;
        await fetch(`/api/chat/conversations/${conversation.id}`, { method: "DELETE" });
        router.push("/dashboard/chat");
        router.refresh();
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link
                        href="/dashboard/chat"
                        className="inline-flex items-center gap-1.5 mb-3 focus-ring"
                        style={{ color: C.inkDim, fontFamily: mono, fontSize: 12 }}
                    >
                        <ArrowLeft size={14} /> Back to conversations
                    </Link>
                    <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">
                        {conversation.visitor_name || "Anonymous visitor"}
                    </h1>
                    {conversation.visitor_email && (
                        <div style={{ fontFamily: mono, fontSize: 12.5, color: C.inkFaint }}>{conversation.visitor_email}</div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleStatus}
                        disabled={saving}
                        className="px-3.5 py-2 rounded-lg focus-ring disabled:opacity-50"
                        style={{
                            background: status === "active" ? C.accentDeep : C.panel,
                            color: status === "active" ? C.accentSoft : C.inkDim,
                            border: `1px solid ${C.line}`,
                            fontFamily: mono,
                            fontSize: 12,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                        }}
                    >
                        {status === "active" ? "Mark closed" : "Reopen"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 rounded-lg focus-ring"
                        style={{ color: C.inkDim, border: `1px solid ${C.line}` }}
                        aria-label="Delete conversation"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="rounded-xl overflow-hidden p-5 flex flex-col gap-3" style={{ border: `1px solid ${C.line}`, background: C.panel }}>
                {conversation.messages.length === 0 ? (
                    <p style={{ color: C.inkDim }}>No messages in this conversation yet.</p>
                ) : (
                    conversation.messages.map((m) => (
                        <div
                            key={m.id}
                            className="max-w-[75%] px-4 py-2.5 rounded-2xl whitespace-pre-wrap break-words"
                            style={{
                                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                                background: m.role === "user" ? C.accentDeep : C.bg,
                                color: m.role === "user" ? C.accentSoft : C.ink,
                                fontFamily: body,
                                fontSize: 13.5,
                                lineHeight: 1.5,
                            }}
                        >
                            <div>{m.content}</div>
                            <div style={{ fontFamily: mono, fontSize: 10, opacity: 0.6, marginTop: 4 }}>
                                {m.role === "user" ? "Visitor" : "Assistant"} · {formatDate(m.created_at)}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
