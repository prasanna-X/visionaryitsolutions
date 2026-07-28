"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { Permission } from "@/types/permission";

export default function PermissionTable({ permissions }: { permissions: Permission[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this permission? Any roles using it will lose it.")) return;
    await fetch(`/api/permissions/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">Permissions</h1>
        <Link
          href="/dashboard/permissions/new"
          className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
          style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13 }}
        >
          <Plus size={15} /> New permission
        </Link>
      </div>

      {permissions.length === 0 ? (
        <p style={{ color: C.inkDim }}>No permissions yet — create the first one.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {permissions.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-5 py-4 rounded-xl"
              style={{ background: C.panel, border: `1px solid ${C.line}` }}
            >
              <div>
                <div style={{ fontFamily: mono, fontWeight: 600, fontSize: 14 }}>{p.code}</div>
                {p.description && (
                  <div style={{ fontSize: 13, color: C.inkFaint }} className="mt-0.5">{p.description}</div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/permissions/${p.id}/edit`} className="focus-ring" style={{ color: C.inkDim }}>
                  <Pencil size={16} />
                </Link>
                <button onClick={() => handleDelete(p.id)} className="focus-ring" style={{ color: C.inkDim }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
