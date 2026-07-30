"use client";

import { Pencil, Mail, Phone, Globe, MapPin } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { CompanyDetails } from "@/types/company";

const headerStyle = {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: 1.2,
    color: C.inkFaint,
    textTransform: "uppercase" as const,
};

function Field({ label, value }: { label: string; value?: string | number | null }) {
    if (!value) return null;
    return (
        <div className="py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div style={headerStyle} className="mb-1">{label}</div>
            <div style={{ color: C.ink, fontSize: 14.5 }}>{value}</div>
        </div>
    );
}

export default function CompanyDetailsView({
    company,
    onEdit,
}: {
    company: CompanyDetails | null;
    onEdit: () => void;
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">
                    Company Details
                </h1>
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
                    style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13 }}
                >
                    <Pencil size={14} /> {company ? "Edit" : "Add details"}
                </button>
            </div>

            {!company ? (
                <p style={{ color: C.inkDim }}>No company details set up yet.</p>
            ) : (
                <div className="rounded-xl overflow-hidden px-5" style={{ border: `1px solid ${C.line}`, background: C.bg }}>
                    <div className="flex items-center gap-4 py-5" style={{ borderBottom: `1px solid ${C.line}` }}>
                        {company.logo_url && (
                            <img src={company.logo_url} alt={company.name} className="w-14 h-14 rounded-full object-cover" style={{ background: C.panel }} />
                        )}
                        <div>
                            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: C.ink }}>{company.name}</div>
                            {company.tagline && <div style={{ color: C.inkDim, fontSize: 13 }}>{company.tagline}</div>}
                        </div>
                    </div>

                    <Field label="Description" value={company.description} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <Field label="Email" value={company.email} />
                        <Field label="Phone" value={company.phone} />
                        <Field label="Alt. Phone" value={company.alt_phone} />
                        <Field label="Website" value={company.website_url} />
                    </div>

                    <Field
                        label="Address"
                        value={[company.address_line1, company.address_line2, company.city, company.state, company.postal_code, company.country]
                            .filter(Boolean)
                            .join(", ") || null}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                        <Field label="Registration No." value={company.registration_number} />
                        <Field label="Tax ID" value={company.tax_id} />
                        <Field label="Founded" value={company.founded_year} />
                    </div>

                    {company.business_hours && Object.keys(company.business_hours).length > 0 && (
                        <div className="py-3">
                            <div style={headerStyle} className="mb-2">Business Hours</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {Object.entries(company.business_hours).map(([day, hours]) => (
                                    <div key={day} style={{ fontSize: 13, color: C.inkDim }}>
                                        <span style={{ color: C.ink, textTransform: "capitalize" }}>{day}</span>: {hours}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}