"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowUpDown, Search, Eye } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { ChatConversation, ChatConversationStatus } from "@/types/chat";

type SortKey = "visitor_name" | "last_message_at" | "status";

const STATUS_STYLES: Record<ChatConversationStatus, { bg: string; fg: string; label: string }> = {
    active: { bg: C.accentDeep, fg: C.accentSoft, label: "Active" },
    closed: { bg: C.panel, fg: C.inkFaint, label: "Closed" },
};

function StatusBadge({ status }: { status: ChatConversationStatus }) {
    const s = STATUS_STYLES[status] ?? STATUS_STYLES.active;
    return (
        <span
            className="inline-block px-2.5 py-1 rounded-full"
            style={{ background: s.bg, color: s.fg, fontFamily: mono, fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase" }}
        >
            {s.label}
        </span>
    );
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

export default function ChatConversationTable({ conversations }: { conversations: ChatConversation[] }) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("last_message_at");
    const [sortAsc, setSortAsc] = useState(false);

    async function handleDelete(id: string) {
        if (!confirm("Delete this conversation? This can't be undone.")) return;
        await fetch(`/api/chat/conversations/${id}`, { method: "DELETE" });
        router.refresh();
    }

    function toggleSort(key: SortKey) {
        if (key === sortKey) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(key === "visitor_name");
        }
    }

    const rows = useMemo(() => {
        const filtered = conversations.filter((c) => {
            const q = query.trim().toLowerCase();
            if (!q) return true;
            return (
                c.visitor_name?.toLowerCase().includes(q) ||
                c.visitor_email?.toLowerCase().includes(q) ||
                c.id.toLowerCase().includes(q)
            );
        });

        return [...filtered].sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];
            const cmp = String(av ?? "").localeCompare(String(bv ?? ""));
            return sortAsc ? cmp : -cmp;
        });
    }, [conversations, query, sortKey, sortAsc]);

    const headerStyle = {
        fontFamily: mono,
        fontSize: 11,
        letterSpacing: 1.2,
        color: C.inkFaint,
        textTransform: "uppercase" as const,
    };

    function SortButton({ label, sortKey: key }: { label: string; sortKey: SortKey }) {
        const active = sortKey === key;
        return (
            <button
                onClick={() => toggleSort(key)}
                className="flex items-center gap-1 focus-ring"
                style={{ ...headerStyle, color: active ? C.ink : C.inkFaint }}
            >
                {label}
                <ArrowUpDown size={11} style={{ opacity: active ? 1 : 0.4 }} />
            </button>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">
                    Chat Conversations
                </h1>
            </div>

            <div className="mb-4 relative max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color={C.inkFaint} />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search conversations…"
                    className="w-full pl-9 pr-3 py-2 rounded-lg focus-ring"
                    style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.ink, fontSize: 13 }}
                />
            </div>

            {conversations.length === 0 ? (
                <p style={{ color: C.inkDim }}>No chat conversations yet.</p>
            ) : rows.length === 0 ? (
                <p style={{ color: C.inkDim }}>No conversations match "{query}".</p>
            ) : (
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr style={{ background: C.panel, borderBottom: `1px solid ${C.line}` }}>
                                <th className="text-left px-5 py-3 w-28" style={headerStyle}>Status</th>
                                <th className="text-left px-3 py-3"><SortButton label="Visitor" sortKey="visitor_name" /></th>
                                <th className="text-left px-3 py-3" style={headerStyle}>Conversation ID</th>
                                <th className="text-left px-3 py-3 w-44"><SortButton label="Last message" sortKey="last_message_at" /></th>
                                <th className="text-right px-5 py-3 w-24" style={headerStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((c, i) => (
                                <tr
                                    key={c.id}
                                    style={{
                                        borderBottom: i < rows.length - 1 ? `1px solid ${C.line}` : "none",
                                        background: C.bg,
                                    }}
                                >
                                    <td className="px-5 py-3">
                                        <StatusBadge status={c.status} />
                                    </td>
                                    <td className="px-3 py-3" style={{ fontFamily: display, fontWeight: 600, fontSize: 14.5, color: C.ink }}>
                                        {c.visitor_name || "Anonymous visitor"}
                                        {c.visitor_email && (
                                            <div style={{ fontFamily: mono, fontSize: 11.5, color: C.inkFaint, fontWeight: 400 }}>
                                                {c.visitor_email}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 py-3" style={{ fontFamily: mono, fontSize: 11.5, color: C.inkFaint }}>
                                        {c.id.slice(0, 8)}…
                                    </td>
                                    <td className="px-3 py-3" style={{ fontFamily: mono, fontSize: 12, color: C.inkDim }}>
                                        {formatDate(c.last_message_at)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-4">
                                            <Link href={`/dashboard/chat/${c.id}`} className="focus-ring" style={{ color: C.inkDim }}>
                                                <Eye size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(c.id)} className="focus-ring" style={{ color: C.inkDim }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
