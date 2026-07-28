"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_ICONS } from "@/components/home/productIcons";
import { C, mono } from "@/components/tokens";
import type { Product } from "@/types/product";

const ICON_OPTIONS = Object.keys(PRODUCT_ICONS);

export default function ProductForm({ product }: { product?: Product | null }) {
  const router = useRouter();
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    title: product?.title ?? "",
    category: product?.category ?? "",
    description: product?.description ?? "",
    logo: product?.logo ?? ICON_OPTIONS[0],
    website_url: product?.website_url ?? "",
    display_order: product?.display_order ?? 0,
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
    <div>
      <h1 style={{ fontFamily: mono, fontWeight: 700, color: C.inkDim }} className="mt-1 mb-6">
        {isEdit ? "Edit product details" : "Create a new product"}
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
          <label style={labelStyle} className="block mb-2 uppercase">Category</label>
          <input
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
            placeholder="Booking System"
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Icon</label>
          <select
            value={form.logo}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
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
            value={form.website_url}
            onChange={(e) => setForm({ ...form, website_url: e.target.value })}
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
            value={form.display_order}
            onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
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
    </div>
  );
}