import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProductIcon } from "@/components/home/productIcons";
import { C } from "@/components/tokens";
import { getAllProducts } from "@/lib/services/productService";
import type { Product } from "@/types/product";

export const metadata = { title: "Products — Visionary IT Solutions" };

/* Fallback content shown only if the Supabase `products` table is empty
   or unreachable (e.g. before it's been created/seeded), so the page
   never renders blank. Once real rows exist, those take over automatically. */
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
    <main className="w-full px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          Products
        </h1>
        <p className="max-w-2xl text-base md:text-lg opacity-70 mb-16">
          A brief intro describing your product lineup or philosophy goes here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((p) => {
            const Icon = getProductIcon(p.icon);
            return (
              <Link
                key={p.id}
                href={p.url || "#"}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                style={{ borderColor: C.ink }}
                className="group rounded-2xl border border-opacity-10 p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: C.accentDeep ?? C.ink, color: C.bg }}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-medium">{p.name}</h3>
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-70 transition-opacity"
                    />
                  </div>
                  <span className="text-xs uppercase tracking-wide opacity-60" style={{ letterSpacing: 1 }}>
                    {p.tag}
                  </span>
                </div>

                <p className="text-sm opacity-70">{p.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
