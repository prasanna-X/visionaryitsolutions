"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_ICONS } from "@/components/home/productIcons";
import { C, mono } from "@/components/tokens";
import type { Product } from "@/types/product";

const ICON_OPTIONS = Object.keys(PRODUCT_ICONS);

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    name: product?.name ?? "",
    tag: product?.tag ?? "",
    description: product?.description ?? "",
    icon: product?.icon ?? ICON_OPTIONS[0],
    url: product?.url ?? "",
    order: product?.order ?? 0,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/products/${product!.id}` : "/api/products", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this product.");
      }
      router.push("/dashboard/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Could not save this product.");
    } finally {
      setSaving(false);
    }
  }

  const labelStyle = { fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim } as const;
  const inputStyle = { background: C.panel, border: `1px solid ${C.line}`, color: C.ink } as const;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={inputStyle}
          placeholder="VisionBookings"
        />
      </div>

      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Slug</label>
        <input
          required
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={inputStyle}
          placeholder="visionbookings"
        />
      </div>

      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Tag (category)</label>
        <input
          required
          value={form.tag}
          onChange={(e) => setForm({ ...form, tag: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={inputStyle}
          placeholder="Booking System"
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
        <label style={labelStyle} className="block mb-2 uppercase">Product URL</label>
        <input
          type="url"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={inputStyle}
          placeholder="https://visionbookings.com"
        />
      </div>

      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Description</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={{ ...inputStyle, resize: "none" }}
        />
      </div>

      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Display order</label>
        <input
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
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
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
