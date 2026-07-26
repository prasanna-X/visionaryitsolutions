import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CloverMark } from "@/components/marketing/Marks";
import { getServiceIcon } from "@/components/marketing/serviceIcons";
import { C, display, mono } from "@/components/tokens";
import { getServiceBySlug, getAllServices } from "@/lib/services/serviceService";

export async function generateStaticParams() {
  const services = await getAllServices().catch(() => []);
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  return { title: service ? `${service.title} — Visionary IT Solutions` : "Service Not Found" };
}

// "/services/:slug" — DB-driven detail page.
export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  if (!service) return notFound();

  const Icon = getServiceIcon(service.icon);

  return (
    <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 mb-10 focus-ring"
        style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim, letterSpacing: 1 }}
      >
        <ArrowLeft size={14} /> All services
      </Link>

      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-8" style={{ background: C.accentDeep }}>
        <Icon size={24} color={C.accentSoft} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <CloverMark size={9} fill={C.accent} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
          Service
        </span>
      </div>

      <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl mb-6">
        {service.title}
      </h1>

      <p style={{ color: C.inkDim, fontSize: 18, lineHeight: 1.75 }} className="mb-8">
        {service.summary}
      </p>

      <div style={{ color: C.ink, fontSize: 15.5, lineHeight: 1.8, whiteSpace: "pre-line" }}>
        {service.description}
      </div>

      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full mt-12 focus-ring"
        style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14 }}
      >
        Talk to us about this
      </Link>
    </article>
  );
}
