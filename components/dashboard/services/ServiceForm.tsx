"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_ICONS } from "@/components/home/serviceIcons";
import { C, mono } from "@/components/tokens";
import type { Service } from "@/types/service";

const ICON_OPTIONS = Object.keys(SERVICE_ICONS);

export default function ServiceForm({ service }: { service?: Service | null }) {
  const router = useRouter();
  const isEdit = Boolean(service?.id);
  const [form, setForm] = useState({
    slug: service?.slug ?? "",
    title: service?.title ?? "",
    description: service?.description ?? "",
    icon: service?.icon ?? ICON_OPTIONS[0],
    sort_order: service?.sort_order ?? 0,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isEdit ? `/api/services/${service!.id}` : "/api/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this service.");
      }
      router.push("/dashboard/services");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Could not save this service.");
    } finally {
      setSaving(false);
    }
  }

  const labelStyle = { fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim } as const;
  const inputStyle = { background: C.panel, border: `1px solid ${C.line}`, color: C.ink } as const;

  return (
    <div>
      <h1 style={{ fontFamily: mono, fontWeight: 700, color: C.inkDim }} className="mt-1 mb-6">
        {isEdit ? "Edit service details below." : "Create a new service below."}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Slug (used in the URL)</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
            placeholder="cloud-infrastructure"
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Icon</label>
          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
          >
            {ICON_OPTIONS.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Description</label>
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={{ ...inputStyle, resize: "none" }}
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Sort order (lower shows first)</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
          />
        </div>

        {error && <p style={{ color: "#E08A7D", fontSize: 13.5 }}>{error}</p>}

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-full focus-ring"
            style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14, opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create service"}
          </button>
        </div>
      </form>
    </div>
  );
}