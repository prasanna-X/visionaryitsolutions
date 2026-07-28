"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { Role } from "@/types/role";

export default function RoleTable({ roles }: { roles: Role[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this role? Admins assigned to it will lose it.")) return;
    await fetch(`/api/roles/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">Roles</h1>
        <Link
          href="/dashboard/roles/new"
          className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
          style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13 }}
        >
          <Plus size={15} /> New role
        </Link>
      </div>

      {roles.length === 0 ? (
        <p style={{ color: C.inkDim }}>No roles yet — create the first one.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {roles.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between px-5 py-4 rounded-xl"
              style={{ background: C.panel, border: `1px solid ${C.line}` }}
            >
              <div>
                <div style={{ fontFamily: display, fontWeight: 600, fontSize: 14.5 }}>{r.name}</div>
                {r.description && (
                  <div style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }} className="mt-0.5">
                    {r.description}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/roles/${r.id}/edit`} className="focus-ring" style={{ color: C.inkDim }}>
                  <Pencil size={16} />
                </Link>
                <button onClick={() => handleDelete(r.id)} className="focus-ring" style={{ color: C.inkDim }}>
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
