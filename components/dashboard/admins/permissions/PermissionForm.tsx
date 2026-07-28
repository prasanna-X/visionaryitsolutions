"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, mono } from "@/components/tokens";
import type { Permission } from "@/types/permission";

export default function PermissionForm({ permission }: { permission?: Permission }) {
  const router = useRouter();
  const isEdit = Boolean(permission?.id);
  const [form, setForm] = useState({
    code: permission?.code ?? "",
    description: permission?.description ?? "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/permissions/${permission!.id}` : "/api/permissions", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this permission.");
      }
      router.push("/dashboard/permissions");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Could not save this permission.");
    } finally {
      setSaving(false);
    }
  }

  const labelStyle = { fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim } as const;
  const inputStyle = { background: C.panel, border: `1px solid ${C.line}`, color: C.ink } as const;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Code</label>
        <input
          required
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={inputStyle}
          placeholder="manage_services"
        />
      </div>

      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={{ ...inputStyle, resize: "none" }}
          placeholder="Create, edit, and delete services"
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
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create permission"}
        </button>
      </div>
    </form>
  );
}
