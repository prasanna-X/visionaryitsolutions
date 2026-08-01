import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, X } from "lucide-react";
import { CloverMark } from "@/components/home/Marks";
import { getServiceIcon } from "@/components/home/serviceIcons";
import { C, display, mono } from "@/components/tokens";
import { getServiceBySlug, getAllServices } from "@/lib/services/serviceService";
import { SERVICE_SLUGS, getServiceDetailContent, buildComparisonMatrix } from "@/lib/content/serviceDetails";

export async function generateStaticParams() {
  const dbServices = await getAllServices().catch(() => []);
  const dbSlugs = dbServices.map((s) => s.slug);
  const allSlugs = Array.from(new Set([...dbSlugs, ...SERVICE_SLUGS]));
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  const fallback = getServiceDetailContent(slug);
  const title = service?.title ?? fallback?.title;
  return { title: title ? `${title} — Visionary IT Solutions` : "Service Not Found" };
}

const sectionLabelStyle = {
  fontFamily: mono,
  fontSize: 12,
  letterSpacing: 3,
  color: C.accent,
  textTransform: "uppercase" as const,
};

// "/services/:slug" — DB-driven detail page, filled in with curated
// content (tagline, micro-services, pricing, process, tech stack) when
// the database row is missing or doesn't have that content yet.
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  const fallback = getServiceDetailContent(slug);

  if (!service && !fallback) return notFound();

  const title = service?.title ?? fallback?.title ?? "";
  const description = service?.description ?? fallback?.description ?? "";
  const icon = service?.icon ?? fallback?.icon;
  const tagline = fallback?.tagline;
  const highlights = fallback?.highlights ?? [];
  const microServices = fallback?.microServices ?? [];
  const process = fallback?.process ?? [];
  const techStack = fallback?.techStack ?? [];
  const pricingTiers = fallback?.pricingTiers ?? [];
  const comparisonRows = pricingTiers.length > 1 ? buildComparisonMatrix(pricingTiers) : [];

  const Icon = getServiceIcon(icon);

  return (
    <article className="max-w-5xl mx-auto px-6 py-20 md:py-28">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 mb-10 focus-ring"
        style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim, letterSpacing: 1 }}
      >
        <ArrowLeft size={14} /> All services
      </Link>

      {/* --- Header --- */}
      <div className="max-w-2xl">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-8" style={{ background: C.accentDeep }}>
          {/* eslint-disable-next-line react-hooks/static-components -- icon is resolved once from a fixed key per page render, not recreated on user-driven re-renders */}
          <Icon size={24} color={C.accentSoft} />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <CloverMark size={9} fill={C.accent} />
          <span style={sectionLabelStyle}>Service</span>
        </div>

        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl mb-4">
          {title}
        </h1>

        {tagline && (
          <p style={{ color: C.accentSoft, fontSize: 18, lineHeight: 1.6 }} className="mb-8">
            {tagline}
          </p>
        )}

        <div style={{ color: C.ink, fontSize: 15.5, lineHeight: 1.8, whiteSpace: "pre-line" }} className="mb-10">
          {description}
        </div>

        {highlights.length > 0 && (
          <div className="p-7 rounded-2xl mb-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <span style={sectionLabelStyle} className="block mb-5" >
              What&apos;s included
            </span>
            <ul className="flex flex-col gap-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-none mt-0.5"
                    style={{ background: C.accentDeep }}
                  >
                    <Check size={12} color={C.accentSoft} />
                  </span>
                  <span style={{ color: C.inkDim, fontSize: 15, lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* --- Micro-services --- */}
      {microServices.length > 0 && (
        <section className="mt-20 md:mt-28">
          <div className="flex items-center gap-2 mb-3">
            <CloverMark size={9} fill={C.accent} />
            <span style={sectionLabelStyle}>Within this service</span>
          </div>
          <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl md:text-3xl mb-3 max-w-xl">
            Break it down into what you actually need.
          </h2>
          <p style={{ color: C.inkDim, fontSize: 15, lineHeight: 1.7 }} className="mb-10 max-w-xl">
            Most projects only need a slice of this service. Here&apos;s roughly what each piece runs on its own.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {microServices.map((m) => (
              <div key={m.name} className="p-6 rounded-2xl" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-base">
                    {m.name}
                  </h3>
                  <span
                    className="flex-none px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ background: C.accentDeep, color: C.accentSoft, fontFamily: mono, fontSize: 12 }}
                  >
                    {m.priceRange}
                  </span>
                </div>
                <p style={{ color: C.inkDim, fontSize: 14, lineHeight: 1.65 }}>{m.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Process --- */}
      {process.length > 0 && (
        <section className="mt-20 md:mt-28">
          <div className="flex items-center gap-2 mb-3">
            <CloverMark size={9} fill={C.accent} />
            <span style={sectionLabelStyle}>How it runs</span>
          </div>
          <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl md:text-3xl mb-10 max-w-xl">
            Delivery, step by step.
          </h2>

          <div className="flex flex-col">
            {process.map((step, i) => (
              <div key={step.title} className="flex gap-5 md:gap-7">
                <div className="flex flex-col items-center flex-none">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-none"
                    style={{
                      background: C.accentDeep,
                      color: C.accentSoft,
                      fontFamily: mono,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  {i < process.length - 1 && (
                    <span className="w-px flex-1 my-1" style={{ background: C.line, minHeight: 24 }} />
                  )}
                </div>
                <div className="pb-8">
                  <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-base mb-1.5">
                    {step.title}
                  </h3>
                  <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }} className="max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Tech stack --- */}
      {techStack.length > 0 && (
        <section className="mt-20 md:mt-28">
          <div className="flex items-center gap-2 mb-3">
            <CloverMark size={9} fill={C.accent} />
            <span style={sectionLabelStyle}>What we build with</span>
          </div>
          <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl md:text-3xl mb-10 max-w-xl">
            Tech stack.
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
            {techStack.map((group) => (
              <div key={group.category}>
                <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim }} className="block mb-3 uppercase">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 rounded-full"
                      style={{ border: `1px solid ${C.line}`, color: C.ink, fontSize: 13.5 }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Pricing --- */}
      {pricingTiers.length > 0 && (
        <section className="mt-20 md:mt-28">
          <div className="flex items-center gap-2 mb-3">
            <CloverMark size={9} fill={C.accent} />
            <span style={sectionLabelStyle}>Cost</span>
          </div>
          <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl md:text-3xl mb-3 max-w-xl">
            Pick a starting point.
          </h2>
          <p style={{ color: C.inkDim, fontSize: 15, lineHeight: 1.7 }} className="mb-10 max-w-xl">
            Ballpark packages to scope a conversation from — every quote is finalized after we understand what you actually need.
          </p>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="p-7 rounded-2xl flex flex-col relative"
                style={{
                  background: tier.popular ? C.panel2 : C.panel,
                  border: tier.popular ? `1px solid ${C.accent}` : `1px solid ${C.line}`,
                }}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-7 px-3 py-1 rounded-full"
                    style={{ background: C.accent, color: C.bg, fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}
                  >
                    MOST POPULAR
                  </span>
                )}

                <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg mb-1 mt-1">
                  {tier.name}
                </h3>
                <p style={{ color: C.inkDim, fontSize: 13.5, lineHeight: 1.5 }} className="mb-5">
                  {tier.description}
                </p>

                <div className="mb-6">
                  <span style={{ fontFamily: display, fontWeight: 700, color: C.ink }} className="text-2xl">
                    {tier.price}
                  </span>
                  <span style={{ color: C.inkFaint, fontSize: 13 }} className="ml-2">
                    {tier.billing}
                  </span>
                </div>

                <ul className="flex flex-col gap-3 mb-7">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check size={14} color={C.accent} className="flex-none mt-0.5" />
                      <span style={{ color: C.inkDim, fontSize: 13.5, lineHeight: 1.5 }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center px-5 py-2.5 rounded-full focus-ring"
                  style={
                    tier.popular
                      ? { background: C.accent, color: C.bg, fontWeight: 600, fontSize: 13.5 }
                      : { border: `1px solid ${C.line}`, color: C.ink, fontWeight: 600, fontSize: 13.5 }
                  }
                >
                  Get a quote
                </Link>
              </div>
            ))}
          </div>

          {/* --- Comparison table --- */}
          {comparisonRows.length > 0 && (
            <div className="mt-10 overflow-x-auto rounded-2xl" style={{ border: `1px solid ${C.line}` }}>
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.line}` }}>
                    <th
                      className="text-left px-6 py-4"
                      style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim, textTransform: "uppercase" }}
                    >
                      Feature
                    </th>
                    {pricingTiers.map((tier) => (
                      <th
                        key={tier.name}
                        className="text-center px-6 py-4"
                        style={{
                          fontFamily: display,
                          fontWeight: 600,
                          fontSize: 14,
                          color: tier.popular ? C.accentSoft : C.ink,
                        }}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} style={{ background: i % 2 === 1 ? C.panel : "transparent" }}>
                      <td className="px-6 py-3.5" style={{ color: C.inkDim, fontSize: 13.5, borderTop: `1px solid ${C.line}` }}>
                        {row.feature}
                      </td>
                      {row.included.map((isIncluded, idx) => (
                        <td key={idx} className="px-6 py-3.5 text-center" style={{ borderTop: `1px solid ${C.line}` }}>
                          {isIncluded ? (
                            <Check size={16} color={C.accent} className="inline-block" />
                          ) : (
                            <X size={16} color={C.inkFaint} className="inline-block" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      <div className="mt-20 md:mt-24">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full focus-ring"
          style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14 }}
        >
          Talk to us about this
        </Link>
      </div>
    </article>
  );
}
