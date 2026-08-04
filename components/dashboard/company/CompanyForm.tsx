"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Save, Loader2 } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { CompanyDetails, CompanyDetailsInput } from "@/types/company";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const labelStyle = {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: 1,
    color: C.inkFaint,
    textTransform: "uppercase" as const,
};

const inputStyle = {
    background: C.panel,
    border: `1px solid ${C.line}`,
    color: C.ink,
    fontSize: 13.5,
};

function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    name: string;
    value: string | number;
    onChange: (name: string, value: string) => void;
    type?: string;
}) {
    return (
        <label className="flex flex-col gap-1.5">
            <span style={labelStyle}>{label}</span>
            <input
                type={type}
                value={value ?? ""}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full px-3 py-2 rounded-lg focus-ring"
                style={inputStyle}
            />
        </label>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-8 mb-3" style={{ ...labelStyle, color: C.accent }}>
            {children}
        </div>
    );
}

export default function CompanyForm({
    company,
    onCancel,
}: {
    company: CompanyDetails | null;
    onCancel: () => void;
}) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<CompanyDetailsInput>({
        name: company?.name ?? "",
        tagline: company?.tagline ?? "",
        short_desc: company?.short_desc ?? "",
        long_desc: company?.long_desc ?? "",
        logo_url: company?.logo_url ?? "",
        favicon_url: company?.favicon_url ?? "",
        email: company?.email ?? "",
        phone: company?.phone ?? "",
        alt_phone: company?.alt_phone ?? "",
        website_url: company?.website_url ?? "",
        address_line1: company?.address_line1 ?? "",
        address_line2: company?.address_line2 ?? "",
        city: company?.city ?? "",
        state: company?.state ?? "",
        postal_code: company?.postal_code ?? "",
        country: company?.country ?? "",
        facebook_url: company?.facebook_url ?? "",
        twitter_url: company?.twitter_url ?? "",
        linkedin_url: company?.linkedin_url ?? "",
        instagram_url: company?.instagram_url ?? "",
        youtube_url: company?.youtube_url ?? "",
        registration_number: company?.registration_number ?? "",
        tax_id: company?.tax_id ?? "",
        founded_year: company?.founded_year ?? undefined,
        business_hours: company?.business_hours ?? {},
    });

    function update(name: string, value: string) {
        setForm((f) => ({ ...f, [name]: value }));
    }

    function updateHours(day: string, value: string) {
        setForm((f) => ({
            ...f,
            business_hours: { ...(f.business_hours ?? {}), [day]: value },
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const payload = {
                ...form,
                founded_year: form.founded_year ? Number(form.founded_year) : null,
            };
            const res = await fetch("/api/company", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || "Failed to save company details");
            }
            router.refresh();
            onCancel();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-6">
                <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">
                    {company ? "Edit Company Details" : "Add Company Details"}
                </h1>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
                    style={{ border: `1px solid ${C.line}`, color: C.inkDim, fontSize: 13 }}
                >
                    <X size={14} /> Cancel
                </button>
            </div>

            {error && (
                <div className="mb-5 px-4 py-3 rounded-lg" style={{ background: "#3a1a1a", color: "#ff9d9d", fontSize: 13 }}>
                    {error}
                </div>
            )}

            <div className="rounded-xl px-5 py-2" style={{ border: `1px solid ${C.line}`, background: C.bg }}>
                <SectionTitle>Basic Info</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Company name" name="name" value={form.name ?? ""} onChange={update} />
                    <Input label="Tagline" name="tagline" value={form.tagline ?? ""} onChange={update} />
                </div>
                <label className="flex flex-col gap-1.5 mt-4">
                    <span style={labelStyle}>Short Description</span>
                    <textarea
                        value={form.short_desc ?? ""}
                        onChange={(e) => update("short_desc", e.target.value)}
                        rows={3}
                        maxLength={2000}
                        className="w-full px-3 py-2 rounded-lg focus-ring"
                        style={inputStyle}
                    />
                </label>
                <label className="flex flex-col gap-1.5 mt-4">
                    <span style={labelStyle}>Long Description</span>
                    <textarea
                        value={form.long_desc ?? ""}
                        onChange={(e) => update("long_desc", e.target.value)}
                        rows={6}
                        maxLength={5000}
                        className="w-full px-3 py-2 rounded-lg focus-ring"
                        style={inputStyle}
                    />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input label="Logo URL" name="logo_url" value={form.logo_url ?? ""} onChange={update} />
                    <Input label="Favicon URL" name="favicon_url" value={form.favicon_url ?? ""} onChange={update} />
                </div>

                <SectionTitle>Contact</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Email" name="email" value={form.email ?? ""} onChange={update} type="email" />
                    <Input label="Phone" name="phone" value={form.phone ?? ""} onChange={update} />
                    <Input label="Alt. phone" name="alt_phone" value={form.alt_phone ?? ""} onChange={update} />
                    <Input label="Website" name="website_url" value={form.website_url ?? ""} onChange={update} />
                </div>

                <SectionTitle>Address</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Address line 1" name="address_line1" value={form.address_line1 ?? ""} onChange={update} />
                    <Input label="Address line 2" name="address_line2" value={form.address_line2 ?? ""} onChange={update} />
                    <Input label="City" name="city" value={form.city ?? ""} onChange={update} />
                    <Input label="State" name="state" value={form.state ?? ""} onChange={update} />
                    <Input label="Postal code" name="postal_code" value={form.postal_code ?? ""} onChange={update} />
                    <Input label="Country" name="country" value={form.country ?? ""} onChange={update} />
                </div>

                <SectionTitle>Social Links</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Facebook" name="facebook_url" value={form.facebook_url ?? ""} onChange={update} />
                    <Input label="Twitter / X" name="twitter_url" value={form.twitter_url ?? ""} onChange={update} />
                    <Input label="LinkedIn" name="linkedin_url" value={form.linkedin_url ?? ""} onChange={update} />
                    <Input label="Instagram" name="instagram_url" value={form.instagram_url ?? ""} onChange={update} />
                    <Input label="YouTube" name="youtube_url" value={form.youtube_url ?? ""} onChange={update} />
                </div>

                <SectionTitle>Business Info</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Registration No." name="registration_number" value={form.registration_number ?? ""} onChange={update} />
                    <Input label="Tax ID" name="tax_id" value={form.tax_id ?? ""} onChange={update} />
                    <Input label="Founded year" name="founded_year" value={form.founded_year ?? ""} onChange={update} type="number" />
                </div>

                <SectionTitle>Business Hours</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6">
                    {DAYS.map((day) => (
                        <label key={day} className="flex flex-col gap-1.5">
                            <span style={{ ...labelStyle, textTransform: "capitalize" }}>{day}</span>
                            <input
                                value={form.business_hours?.[day] ?? ""}
                                onChange={(e) => updateHours(day, e.target.value)}
                                placeholder="9:00–18:00"
                                className="w-full px-3 py-2 rounded-lg focus-ring"
                                style={inputStyle}
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
                    style={{ border: `1px solid ${C.line}`, color: C.inkDim, fontSize: 13 }}
                >
                    <X size={14} /> Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
                    style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13, opacity: saving ? 0.6 : 1 }}
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? "Saving…" : "Save"}
                </button>
            </div>
        </form>
    );
}