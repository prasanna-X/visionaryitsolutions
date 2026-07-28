"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Trash2,
  Plus,
  ShieldCheck,
  KeyRound,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
} from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import type { Admin } from "@/types/admin";

type SortKey = "name" | "email" | "role" | "created_at";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 10;

export default function AdminTable({ admins }: { admins: Admin[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  async function handleDelete(id: string) {
    if (!confirm("Delete this admin? This can't be undone.")) return;
    await fetch(`/api/admins/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = q
      ? admins.filter(
        (a) =>
          a.name?.toLowerCase().includes(q) ||
          a.email?.toLowerCase().includes(q) ||
          a.role?.toLowerCase().includes(q)
      )
      : admins;

    return [...rows].sort((a, b) => {
      const av = (a[sortKey] ?? "").toString().toLowerCase();
      const bv = (b[sortKey] ?? "").toString().toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [admins, query, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const headerCellStyle = {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: 1,
    color: C.inkFaint,
    textTransform: "uppercase" as const,
  };

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ChevronsUpDown size={13} style={{ opacity: 0.4 }} />;
    return sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">Admins</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/roles"
            className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
            style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.ink, fontWeight: 600, fontSize: 13 }}
          >
            <ShieldCheck size={15} /> Roles
          </Link>
          <Link
            href="/dashboard/permissions"
            className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
            style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.ink, fontWeight: 600, fontSize: 13 }}
          >
            <KeyRound size={15} /> Permissions
          </Link>
          <Link
            href="/dashboard/admins/new"
            className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
            style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13 }}
          >
            <Plus size={15} /> New admin
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg w-full max-w-xs"
          style={{ background: C.panel, border: `1px solid ${C.line}` }}
        >
          <Search size={14} color={C.inkFaint} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search admins…"
            className="bg-transparent outline-none w-full"
            style={{ fontSize: 13.5, color: C.ink }}
          />
        </div>
        <span style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }} className="ml-auto">
          {filtered.length} {filtered.length === 1 ? "admin" : "admins"}
        </span>
      </div>

      {admins.length === 0 ? (
        <p style={{ color: C.inkDim }}>
          No admins yet — create the first one, or check that Supabase is configured (see .env.local).
        </p>
      ) : filtered.length === 0 ? (
        <p style={{ color: C.inkDim }}>No admins match "{query}".</p>
      ) : (
        <>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: C.panel, borderBottom: `1px solid ${C.line}` }}>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort("name")}
                      className="flex items-center gap-1.5 focus-ring"
                      style={headerCellStyle}
                    >
                      Name <SortIcon column="name" />
                    </button>
                  </th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort("email")}
                      className="flex items-center gap-1.5 focus-ring"
                      style={headerCellStyle}
                    >
                      Email <SortIcon column="email" />
                    </button>
                  </th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort("email")}
                      className="flex items-center gap-1.5 focus-ring"
                      style={headerCellStyle}
                    >
                      Phone <SortIcon column="phone" />
                    </button>
                  </th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort("role")}
                      className="flex items-center gap-1.5 focus-ring"
                      style={headerCellStyle}
                    >
                      Role <SortIcon column="role" />
                    </button>
                  </th>
                  <th className="text-left px-5 py-3" style={headerCellStyle}>Status</th>
                  <th className="text-left px-5 py-3">
                    <button
                      onClick={() => toggleSort("created_at")}
                      className="flex items-center gap-1.5 focus-ring"
                      style={headerCellStyle}
                    >
                      Created <SortIcon column="created_at" />
                    </button>
                  </th>
                  <th className="text-right px-5 py-3" style={headerCellStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((a, i) => {
                  const initial = a.name?.charAt(0)?.toUpperCase() || "?";
                  return (
                    <tr
                      key={a.id}
                      style={{
                        background: C.bg,
                        borderBottom: i === paged.length - 1 ? "none" : `1px solid ${C.line}`,
                      }}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0"
                            style={{ background: C.accentDeep }}
                          >
                            {a.avatar_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={a.avatar_url} alt={a.name} className="w-full h-full object-cover" />
                            ) : (
                              <span style={{ color: C.accentSoft, fontFamily: display, fontWeight: 600, fontSize: 12 }}>
                                {initial}
                              </span>
                            )}
                          </div>
                          <span style={{ fontFamily: display, fontWeight: 600, fontSize: 14 }}>{a.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3" style={{ fontFamily: mono, fontSize: 13, color: C.inkDim }}>
                        {a.email}
                      </td>
                      <td className="px-5 py-3" style={{ fontFamily: mono, fontSize: 13, color: C.inkDim }}>
                        {a.phone}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          style={{
                            fontFamily: mono,
                            fontSize: 11,
                            letterSpacing: 1,
                            color: C.accent,
                            textTransform: "uppercase",
                          }}
                        >
                          {a.role}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {a.is_active ? (
                          <span style={{ fontSize: 12.5, color: C.inkDim }}>Active</span>
                        ) : (
                          <span
                            style={{ fontFamily: mono, fontSize: 10.5, color: C.inkFaint, letterSpacing: 1 }}
                            className="uppercase px-1.5 py-0.5 rounded"
                          >
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3" style={{ fontSize: 13, color: C.inkFaint }}>
                        {new Date(a.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-4">
                          <Link href={`/dashboard/admins/${a.id}/edit`} className="focus-ring" style={{ color: C.inkDim }}>
                            <Pencil size={15} />
                          </Link>
                          <button onClick={() => handleDelete(a.id)} className="focus-ring" style={{ color: C.inkDim }}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <span style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg focus-ring"
                  style={{
                    background: C.panel,
                    border: `1px solid ${C.line}`,
                    color: C.ink,
                    fontSize: 13,
                    opacity: currentPage === 1 ? 0.4 : 1,
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg focus-ring"
                  style={{
                    background: C.panel,
                    border: `1px solid ${C.line}`,
                    color: C.ink,
                    fontSize: 13,
                    opacity: currentPage === totalPages ? 0.4 : 1,
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}