"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, mono } from "@/components/tokens";
import type { Admin } from "@/types/admin";

const ROLE_OPTIONS = ["admin", "super_admin", "editor", "viewer"];

export default function AdminForm({ admin }: { admin?: Admin | null }) {
  const router = useRouter();
  const isEdit = Boolean(admin?.id);
  const [form, setForm] = useState({
    name: admin?.name ?? "",
    email: admin?.email ?? "",
    password: "",
    role: admin?.role ?? ROLE_OPTIONS[0],
    phone: admin?.phone ?? "",
    avatar_url: admin?.avatar_url ?? "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      // Password is only sent on create — editing an admin doesn't change
      const payload = isEdit
        ? { name: form.name, email: form.email, role: form.role, phone: form.phone, avatar_url: form.avatar_url }
        : form;

      const res = await fetch(isEdit ? `/api/admins/${admin?.id}` : "/api/admins", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this admin.");
      }
      router.push("/dashboard/admins");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Could not save this admin.");
    } finally {
      setSaving(false);
    }
  }

  const labelStyle = { fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim } as const;
  const inputStyle = { background: C.panel, border: `1px solid ${C.line}`, color: C.ink } as const;

  return (
    <div>
      <h1 style={{ fontFamily: mono, fontWeight: 700, color: C.inkDim }} className="mt-1 mb-6">
        {isEdit ? "Edit admin details" : "Create a new admin"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
            placeholder="jane@visionaryitsolutions.com"
          />
        </div>

        {!isEdit && (
          <div>
            <label style={labelStyle} className="block mb-2 uppercase">Password</label>
            <input
              required
              type="password"
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg focus-ring"
              style={inputStyle}
              placeholder="At least 8 characters"
            />
          </div>
        )}

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
          >
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
            placeholder="+977 98XXXXXXXX"
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-2 uppercase">Avatar URL</label>
          <input
            type="url"
            value={form.avatar_url}
            onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
            className="w-full px-4 py-3 rounded-lg focus-ring"
            style={inputStyle}
            placeholder="https://…"
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
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create admin"}
          </button>
        </div>
      </form>
    </div>
  );
}