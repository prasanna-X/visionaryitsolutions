"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Phone, Mail, Building2 } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { ContactSubmission, ContactStatus } from "@/types/contact";

const STATUS_OPTIONS: ContactStatus[] = ["new", "contacted", "closed"];

export default function ContactSubmissionDetail({ submission }: { submission: ContactSubmission }) {
    const router = useRouter();
    const [status, setStatus] = useState<ContactStatus>(submission.status);
    const [saving, setSaving] = useState(false);
    const [statusError, setStatusError] = useState("");

    // Keep local state in sync if the server refetches this submission
    // (e.g. after router.refresh()) with a different status than we have locally.
    useEffect(() => {
        setStatus(submission.status);
    }, [submission.status]);

    async function handleStatusChange(next: ContactStatus) {
        if (next === status || saving) return;

        const previous = status;
        setStatus(next); // optimistic
        setSaving(true);
        setStatusError("");

        try {
            const res = await fetch(`/api/contact-submissions/${submission.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: next }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || `Failed to update status (${res.status}).`);
            }

            router.refresh();
        } catch (err: any) {
            // Roll back the optimistic update since it didn't actually persist.
            setStatus(previous);
            setStatusError(err.message || "Failed to update status. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this submission? This can't be undone.")) return;
        await fetch(`/api/contact-submissions/${submission.id}`, { method: "DELETE" });
        router.push("/dashboard/contact-submissions");
        router.refresh();
    }

    const fieldLabel = {
        fontFamily: mono,
        fontSize: 11,
        letterSpacing: 1.2,
        color: C.inkFaint,
        textTransform: "uppercase" as const,
    };

    return (
        <div className="max-w-2xl">
            <Link
                href="/dashboard/contact-submissions"
                className="inline-flex items-center gap-1.5 mb-6 focus-ring"
                style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim }}
            >
                <ArrowLeft size={14} /> Back to submissions
            </Link>

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl mb-1">
                        {submission.name}
                    </h1>
                    {submission.organization && (
                        <div className="flex items-center gap-1.5" style={{ color: C.inkDim, fontSize: 13.5 }}>
                            <Building2 size={13} /> {submission.organization}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg focus-ring"
                    style={{ border: `1px solid ${C.line}`, color: C.inkDim, fontSize: 13 }}
                >
                    <Trash2 size={14} /> Delete
                </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                    <span style={fieldLabel}>Phone</span>
                    <div className="flex items-center gap-1.5 mt-1.5" style={{ color: C.ink, fontSize: 14.5 }}>
                        <Phone size={14} color={C.inkFaint} /> {submission.phone}
                    </div>
                </div>

                {submission.email && (
                    <div className="p-4 rounded-xl" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                        <span style={fieldLabel}>Email</span>
                        <div className="flex items-center gap-1.5 mt-1.5" style={{ color: C.ink, fontSize: 14.5 }}>
                            <Mail size={14} color={C.inkFaint} /> {submission.email}
                        </div>
                    </div>
                )}

                <div className="p-4 rounded-xl" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                    <span style={fieldLabel}>IT Solution</span>
                    <div className="mt-1.5" style={{ color: C.ink, fontSize: 14.5 }}>
                        {submission.it_solutions || "—"}
                    </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                    <span style={fieldLabel}>Received</span>
                    <div className="mt-1.5" style={{ color: C.ink, fontSize: 14.5 }}>
                        {new Date(submission.created_at).toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            </div>

            <div className="p-5 rounded-xl mb-6" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                <span style={fieldLabel}>Message</span>
                <p className="mt-2" style={{ color: C.ink, fontSize: 14.5, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {submission.message}
                </p>
            </div>

            <div>
                <span style={fieldLabel} className="block mb-2">Status</span>
                <div className="flex gap-2 items-center">
                    {STATUS_OPTIONS.map((opt) => (
                        <button
                            key={opt}
                            disabled={saving}
                            onClick={() => handleStatusChange(opt)}
                            className="px-4 py-2 rounded-full focus-ring capitalize"
                            style={{
                                fontFamily: mono,
                                fontSize: 12.5,
                                fontWeight: 600,
                                background: status === opt ? C.accent : "transparent",
                                color: status === opt ? C.bg : C.inkDim,
                                border: `1px solid ${status === opt ? C.accent : C.line}`,
                                opacity: saving ? 0.6 : 1,
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                    {saving && (
                        <span style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>Saving…</span>
                    )}
                </div>
                {statusError && (
                    <p className="mt-2" style={{ color: "#B5453D", fontSize: 13 }}>{statusError}</p>
                )}
            </div>
        </div>
    );
}