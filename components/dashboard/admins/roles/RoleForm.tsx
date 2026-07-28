"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, mono } from "@/components/tokens";
import type { Permission } from "@/types/permission";
import type { RoleWithPermissions } from "@/types/role";

export default function RoleForm({
  role,
  allPermissions,
}: {
  role?: RoleWithPermissions;
  allPermissions: Permission[];
}) {
  const router = useRouter();
  const isEdit = Boolean(role?.id);
  const [form, setForm] = useState({
    name: role?.name ?? "",
    description: role?.description ?? "",
    permission_ids: role?.permission_ids ?? [],
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function togglePermission(id: string) {
    setForm((prev) => ({
      ...prev,
      permission_ids: prev.permission_ids.includes(id)
        ? prev.permission_ids.filter((p) => p !== id)
        : [...prev.permission_ids, id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(isEdit ? `/api/roles/${role!.id}` : "/api/roles", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save this role.");
      }
      router.push("/dashboard/roles");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Could not save this role.");
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
          placeholder="editor"
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
          placeholder="Can manage content but not admins or roles"
        />
      </div>

      <div>
        <label style={labelStyle} className="block mb-2 uppercase">Permissions</label>
        <div
          className="flex flex-col gap-1 p-4 rounded-lg"
          style={{ background: C.panel, border: `1px solid ${C.line}` }}
        >
          {allPermissions.length === 0 ? (
            <p style={{ color: C.inkFaint, fontSize: 13 }}>No permissions exist yet.</p>
          ) : (
            allPermissions.map((p) => (
              <label key={p.id} className="flex items-center gap-3 py-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.permission_ids.includes(p.id)}
                  onChange={() => togglePermission(p.id)}
                  className="focus-ring"
                />
                <span style={{ fontFamily: mono, fontSize: 13.5 }}>{p.code}</span>
                {p.description && (
                  <span style={{ fontSize: 12.5, color: C.inkFaint }}>— {p.description}</span>
                )}
              </label>
            ))
          )}
        </div>
      </div>

      {error && <p style={{ color: "#E08A7D", fontSize: 13.5 }}>{error}</p>}

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-full focus-ring"
          style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14, opacity: saving ? 0.6 : 1 }}
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create role"}
        </button>
      </div>
    </form>
  );
}
