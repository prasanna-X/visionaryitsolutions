"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowUpDown, Search, Eye } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { ContactSubmission, ContactStatus } from "@/types/contact";

type SortKey = "name" | "created_at" | "status" | "it_solutions";

const STATUS_STYLES: Record<ContactStatus, { bg: string; fg: string; label: string }> = {
    new: { bg: C.accentDeep, fg: C.accentSoft, label: "New" },
    contacted: { bg: "#3A3220", fg: "#E8C468", label: "Contacted" },
    closed: { bg: C.panel, fg: C.inkFaint, label: "Closed" },
};

function StatusBadge({ status }: { status: ContactStatus }) {
    const s = STATUS_STYLES[status] ?? STATUS_STYLES.new;
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
    return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function ContactSubmissionTable({ submissions }: { submissions: ContactSubmission[] }) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("created_at");
    const [sortAsc, setSortAsc] = useState(false);

    async function handleDelete(id: string) {
        if (!confirm("Delete this submission? This can't be undone.")) return;
        await fetch(`/api/contact-submissions/${id}`, { method: "DELETE" });
        router.refresh();
    }

    function toggleSort(key: SortKey) {
        if (key === sortKey) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(key === "name" || key === "it_solutions");
        }
    }

    const rows = useMemo(() => {
        const filtered = submissions.filter((s) => {
            const q = query.trim().toLowerCase();
            if (!q) return true;
            return (
                s.name?.toLowerCase().includes(q) ||
                s.phone?.toLowerCase().includes(q) ||
                s.email?.toLowerCase().includes(q) ||
                s.organization?.toLowerCase().includes(q) ||
                s.it_solutions?.toLowerCase().includes(q)
            );
        });

        return [...filtered].sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];
            const cmp = String(av ?? "").localeCompare(String(bv ?? ""));
            return sortAsc ? cmp : -cmp;
        });
    }, [submissions, query, sortKey, sortAsc]);

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
                    Contact Submissions
                </h1>
            </div>

            <div className="mb-4 relative max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color={C.inkFaint} />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search submissions…"
                    className="w-full pl-9 pr-3 py-2 rounded-lg focus-ring"
                    style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.ink, fontSize: 13 }}
                />
            </div>

            {submissions.length === 0 ? (
                <p style={{ color: C.inkDim }}>No submissions yet.</p>
            ) : rows.length === 0 ? (
                <p style={{ color: C.inkDim }}>No submissions match "{query}".</p>
            ) : (
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr style={{ background: C.panel, borderBottom: `1px solid ${C.line}` }}>
                                <th className="text-left px-5 py-3 w-28" style={headerStyle}>Status</th>
                                <th className="text-left px-3 py-3"><SortButton label="Name" sortKey="name" /></th>
                                <th className="text-left px-3 py-3" style={headerStyle}>Contact</th>
                                <th className="text-left px-3 py-3"><SortButton label="Solution" sortKey="it_solutions" /></th>
                                <th className="text-left px-3 py-3 w-32"><SortButton label="Received" sortKey="created_at" /></th>
                                <th className="text-right px-5 py-3 w-24" style={headerStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((s, i) => (
                                <tr
                                    key={s.id}
                                    style={{
                                        borderBottom: i < rows.length - 1 ? `1px solid ${C.line}` : "none",
                                        background: C.bg,
                                    }}
                                >
                                    <td className="px-5 py-3">
                                        <StatusBadge status={s.status} />
                                    </td>
                                    <td className="px-3 py-3" style={{ fontFamily: display, fontWeight: 600, fontSize: 14.5, color: C.ink }}>
                                        {s.name}
                                        {s.organization && (
                                            <div style={{ fontFamily: mono, fontSize: 11.5, color: C.inkFaint, fontWeight: 400 }}>
                                                {s.organization}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 py-3" style={{ fontFamily: mono, fontSize: 12, color: C.inkDim }}>
                                        <div>{s.phone}</div>
                                        {s.email && <div style={{ color: C.inkFaint }}>{s.email}</div>}
                                    </td>
                                    <td className="px-3 py-3" style={{ fontSize: 13, color: C.inkDim }}>
                                        {s.it_solutions || "—"}
                                    </td>
                                    <td className="px-3 py-3" style={{ fontFamily: mono, fontSize: 12, color: C.inkDim }}>
                                        {formatDate(s.created_at)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-4">
                                            <Link href={`/dashboard/contact-submissions/${s.id}`} className="focus-ring" style={{ color: C.inkDim }}>
                                                <Eye size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(s.id)} className="focus-ring" style={{ color: C.inkDim }}>
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