"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { getProductIcon } from "@/components/home/productIcons";
import { C, display, mono } from "@/components/tokens";
import type { Product } from "@/types/product";

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This can't be undone.")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">Products</h1>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
          style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13 }}
        >
          <Plus size={15} /> New product
        </Link>
      </div>

      {products.length === 0 ? (
        <p style={{ color: C.inkDim }}>
          No products yet — create the first one, or check that Supabase is configured (see .env.local).
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {products.map((p) => {
            const Icon = getProductIcon(p.icon);
            return (
              <div
                key={p.id}
                className="flex items-center justify-between px-5 py-4 rounded-xl"
                style={{ background: C.panel, border: `1px solid ${C.line}` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.accentDeep }}>
                    <Icon size={16} color={C.accentSoft} />
                  </div>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 14.5 }}>{p.name}</div>
                    <div style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>{p.tag}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/dashboard/products/${p.id}/edit`} className="focus-ring" style={{ color: C.inkDim }}>
                    <Pencil size={16} />
                  </Link>
                  <button onClick={() => handleDelete(p.id)} className="focus-ring" style={{ color: C.inkDim }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
