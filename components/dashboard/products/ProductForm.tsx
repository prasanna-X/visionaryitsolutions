"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_ICONS } from "@/components/home/productIcons";
import { C, mono } from "@/components/tokens";
import type { Product } from "@/types/product";

const ICON_OPTIONS = Object.keys(PRODUCT_ICONS);

export default function ProductForm({ product }: { product?: Product | null }) {
  const router = useRouter();
  const isEdit = Boolean(product?.id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    title: product?.title ?? "",
    category: product?.category ?? "",
    description: product?.description ?? "",
    icon: product?.icon || ICON_OPTIONS[0],
    logo: product?.logo ?? "",
    website_url: product?.website_url ?? "",
    display_order: product?.display_order ?? 0,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(product?.logo ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    // show local preview immediately while the upload is in flight
    const localPreview = URL.createObjectURL(file);
    setLogoPreview(localPreview);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Failed to upload image.");

      setForm((f) => ({ ...f, logo: data.url }));
      setLogoPreview(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
      setLogoPreview(product?.logo ?? null);
      setForm((f) => ({ ...f, logo: product?.logo ?? "" }));
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveLogo() {
    setForm((f) => ({ ...f, logo: "" }));
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

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
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
          >
            {ICON_OPTIONS.map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
          <p style={{ fontFamily: mono, fontSize: 11, color: C.inkFaint }} className="mt-1.5">
            Used when no logo image is set below.
          </p>
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Logo image</label>
          <div className="flex items-center gap-4">
            {logoPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoPreview}
                alt="Logo preview"
                className="rounded-lg object-contain"
                style={{ width: 56, height: 56, background: C.panel, border: `1px solid ${C.line}` }}
              />
            )}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg focus-ring"
                style={inputStyle}
              />
              {uploading && (
                <p style={{ fontFamily: mono, fontSize: 12, color: C.inkDim }} className="mt-1.5">
                  Uploading…
                </p>
              )}
              {logoPreview && !uploading && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  style={{ fontFamily: mono, fontSize: 11, color: C.inkDim, textDecoration: "underline" }}
                  className="mt-1.5"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>
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
            disabled={saving || uploading}
            className="px-6 py-3 rounded-full focus-ring"
            style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14, opacity: saving || uploading ? 0.6 : 1 }}
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
}