"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, ArrowUpDown, Search } from "lucide-react";
import { getServiceIcon } from "@/components/home/serviceIcons";
import { C, display, mono } from "@/components/tokens";

type SortKey = "title" | "slug" | "sort_order";

export default function ServiceTable({ services }: { services: any[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("sort_order");
  const [sortAsc, setSortAsc] = useState(true);

  async function handleDelete(id: string) {
    if (!confirm("Delete this service? This can't be undone.")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const rows = useMemo(() => {
    const filtered = services.filter((s) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return s.title?.toLowerCase().includes(q) || s.slug?.toLowerCase().includes(q);
    });

    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av ?? "").localeCompare(String(bv ?? ""));
      }
      return sortAsc ? cmp : -cmp;
    });
  }, [services, query, sortKey, sortAsc]);

  const headerStyle = {
    fontFamily: mono,
    fontSize: 11,
    letterSpacing: 1.2,
    color: C.inkFaint,
    textTransform: "uppercase" as const,
  };

  function SortButton({ label, sortKey: key }: { label: string; sortKey: SortKey }) {
    const active = sortKey === key;
    return (
      <button
        onClick={() => toggleSort(key)}
        className="flex items-center gap-1 focus-ring"
        style={{ ...headerStyle, color: active ? C.ink : C.inkFaint }}
      >
        {label}
        <ArrowUpDown size={11} style={{ opacity: active ? 1 : 0.4 }} />
      </button>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">Services</h1>
        <Link
          href="/dashboard/services/new"
          className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
          style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13 }}
        >
          <Plus size={15} /> New service
        </Link>
      </div>

      <div className="mb-4 relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color={C.inkFaint} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search services…"
          className="w-full pl-9 pr-3 py-2 rounded-lg focus-ring"
          style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.ink, fontSize: 13 }}
        />
      </div>

      {services.length === 0 ? (
        <p style={{ color: C.inkDim }}>No services yet — create the first one.</p>
      ) : rows.length === 0 ? (
        <p style={{ color: C.inkDim }}>No services match "{query}".</p>
      ) : (
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: C.panel, borderBottom: `1px solid ${C.line}` }}>
                <th className="text-left px-5 py-3 w-12"></th>
                <th className="text-left px-3 py-3"><SortButton label="Title" sortKey="title" /></th>
                <th className="text-left px-3 py-3"><SortButton label="Slug" sortKey="slug" /></th>
                <th className="text-left px-3 py-3 w-28"><SortButton label="Order" sortKey="sort_order" /></th>
                <th className="text-right px-5 py-3 w-24" style={headerStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s, i) => {
                const Icon = getServiceIcon(s.icon);
                return (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: i < rows.length - 1 ? `1px solid ${C.line}` : "none",
                      background: C.bg,
                    }}
                  >
                    <td className="px-5 py-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.accentDeep }}>
                        <Icon size={16} color={C.accentSoft} />
                      </div>
                    </td>
                    <td className="px-3 py-3" style={{ fontFamily: display, fontWeight: 600, fontSize: 14.5, color: C.ink }}>
                      {s.title}
                    </td>
                    <td className="px-3 py-3" style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>
                      /{s.slug}
                    </td>
                    <td className="px-3 py-3" style={{ fontFamily: mono, fontSize: 12, color: C.inkDim }}>
                      {s.sort_order}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <Link href={`/dashboard/services/${s.id}/edit`} className="focus-ring" style={{ color: C.inkDim }}>
                          <Pencil size={16} />
                        </Link>
                        <button onClick={() => handleDelete(s.id)} className="focus-ring" style={{ color: C.inkDim }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}