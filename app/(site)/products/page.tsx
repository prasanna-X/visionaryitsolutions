import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CloverMark } from "@/components/home/Marks";
import { getProductIcon } from "@/components/home/productIcons";
import { C, display, mono } from "@/components/tokens";
import { getAllProducts } from "@/lib/services/productService";
import type { Product } from "@/types/product";

export const metadata = { title: "Products — Visionary IT Solutions" };

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fallback-1",
    slug: "visionbookings",
    name: "VisionBookings",
    tag: "Booking System",
    description:
      "An online booking and scheduling platform for service businesses — clients book appointments in real time while you manage availability, staff, and payments from one dashboard.",
    icon: "calendar",
    url: "https://visionbookings.com",
    order: 1,
  },
  {
    id: "fallback-2",
    slug: "thenepalmade",
    name: "TheNepalMade",
    tag: "Ecommerce",
    description:
      "A homegrown ecommerce marketplace spotlighting Nepali-made products, built to help local makers and brands sell online with secure checkout and order tracking.",
    icon: "shopping",
    url: "https://thenepalmade.com",
    order: 2,
  },
  {
    id: "fallback-3",
    slug: "visionflix",
    name: "VisionFlix",
    tag: "OTT",
    description:
      "A streaming platform for on-demand video, delivering subscription-based access to movies, series, and original content with a smooth, cross-device viewing experience.",
    icon: "video",
    url: "https://visionflix.com",
    order: 3,
  },
];

// "/products" — Supabase-backed. Nav.tsx links here directly.
export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await getAllProducts();
  } catch {
    // Supabase not configured yet — fall back below rather than crashing the page.
    products = [];
  }
  const list = products.length ? products : FALLBACK_PRODUCTS;

  return (
    <main id="product" style={{ background: C.panel2, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="flex items-center gap-2 mb-3">
          <CloverMark size={10} fill={C.accent} />
          <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
            What we've built
          </span>
        </div>
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl max-w-xl mb-4">
          Products we've launched and run ourselves.
        </h1>
        {/* <p style={{ color: C.inkDim, lineHeight: 1.75 }} className="max-w-md mb-14">
        A brief intro describing your product lineup or philosophy goes here.
      </p> */}

        {list.length === 0 ? (
          <p style={{ color: C.inkDim }}>No products published yet — check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p) => {
              const Icon = getProductIcon(p.icon);
              return (
                <Link
                  key={p.id}
                  href={p.url || "#"}
                  target={p.url ? "_blank" : undefined}
                  rel={p.url ? "noopener noreferrer" : undefined}
                  className="service-card p-7 rounded-2xl focus-ring group flex flex-col"
                  style={{ background: C.panel, border: `1px solid ${C.line}` }}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6" style={{ background: C.accentDeep }}>
                    <Icon size={20} color={C.accentSoft} />
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg">
                      {p.name}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      color={C.inkDim}
                      className="opacity-0 group-hover:opacity-70 transition-opacity"
                    />
                  </div>
                  <span
                    style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1.5, color: C.accent, textTransform: "uppercase" }}
                    className="mb-3"
                  >
                    {p.tag}
                  </span>

                  <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }}>{p.description}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}