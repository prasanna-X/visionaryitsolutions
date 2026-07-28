import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import { getAllProducts } from "@/lib/services/productService";
import { getProductIcon, isImageSrc } from "@/components/home/productIcons";
import type { Product } from "@/types/product";

export const metadata = { title: "Products — Visionary IT Solutions" };

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "fallback-1",
    slug: "visionbookings",
    title: "VisionBookings",
    category: "Booking System",
    tagline: null,
    description:
      "An online booking and scheduling platform for service businesses — clients book appointments in real time while you manage availability, staff, and payments from one dashboard.",
    logo: null,
    website_url: "https://visionbookings.com",
    status: "published",
    featured: false,
    display_order: 1,
    meta_title: null,
    meta_description: null,
  },
  {
    id: "fallback-2",
    slug: "thenepalmade",
    title: "TheNepalMade",
    category: "Ecommerce",
    tagline: null,
    description:
      "A homegrown ecommerce marketplace spotlighting Nepali-made products, built to help local makers and brands sell online with secure checkout and order tracking.",
    logo: null,
    website_url: "https://thenepalmade.com",
    status: "published",
    featured: false,
    display_order: 2,
    meta_title: null,
    meta_description: null,
  },
  {
    id: "fallback-3",
    slug: "visionflix",
    title: "VisionFlix",
    category: "OTT",
    tagline: null,
    description:
      "A streaming platform for on-demand video, delivering subscription-based access to movies, series, and original content with a smooth, cross-device viewing experience.",
    logo: null,
    website_url: "https://visionflix.com",
    status: "published",
    featured: false,
    display_order: 3,
    meta_title: null,
    meta_description: null,
  },
];

function ProductMark({ product }: { product: Product }) {
  // logo may be a real image URL (Supabase storage / external) OR an icon
  // keyword like "calendar" left over from earlier data. Handle both.
  if (isImageSrc(product.logo)) {
    return (
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center overflow-hidden"
        style={{ background: C.accentDeep }}
      >
        <Image src={product.logo} alt={`${product.title} logo`} width={28} height={28} className="object-contain" />
      </div>
    );
  }

  if (product.logo) {
    const Icon = getProductIcon(product.logo);
    return (
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: C.accentDeep }}
      >
        <Icon size={20} color={C.accentSoft} />
      </div>
    );
  }

  // Fallback: initials monogram when no logo is set
  const initials = product.title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center"
      style={{ background: C.accentDeep }}
    >
      <span style={{ fontFamily: display, fontWeight: 700, color: C.accentSoft, fontSize: 14 }}>{initials}</span>
    </div>
  );
}

// "/products" — Supabase-backed (public anon client, respects RLS). Nav.tsx links here directly.
export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await getAllProducts();
  } catch {
    // Supabase not configured yet, or query failed — fall back below rather than crashing the page.
    products = [];
  }

  // Defensive filter in case RLS isn't (yet) scoped to published-only rows.
  const published = products.filter((p) => p.status === "published");
  const list = (published.length ? published : FALLBACK_PRODUCTS)
    .slice()
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <main id="product" style={{ background: C.panel2, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
            What we've built
          </span>
        </div>
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl max-w-xl mb-4">
          Products we've launched and run ourselves.
        </h1>

        {list.length === 0 ? (
          <p style={{ color: C.inkDim }}>No products published yet — check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p) => (
              <Link
                key={p.id}
                href={p.website_url || "#"}
                target={p.website_url ? "_blank" : undefined}
                rel={p.website_url ? "noopener noreferrer" : undefined}
                className="service-card p-7 rounded-2xl focus-ring group flex flex-col"
                style={{ background: C.panel, border: `1px solid ${C.line}` }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="mb-0 shrink-0">
                    <ProductMark product={p} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg">
                        {p.title}
                      </h3>
                      {p.featured && (
                        <span
                          style={{ fontFamily: mono, fontSize: 10, color: C.accent, textTransform: "uppercase" }}
                        >
                          Featured
                        </span>
                      )}
                      <ArrowUpRight
                        size={16}
                        color={C.inkDim}
                        className="opacity-0 group-hover:opacity-70 transition-opacity"
                      />
                    </div>
                    <span
                      style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1.5, color: C.accent, textTransform: "uppercase" }}
                    >
                      {p.category}
                    </span>
                  </div>
                </div>
                {p.tagline && (
                  <p style={{ color: C.ink, fontSize: 13, fontStyle: "italic" }} className="mb-2">
                    {p.tagline}
                  </p>
                )}

                <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }}>{p.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}