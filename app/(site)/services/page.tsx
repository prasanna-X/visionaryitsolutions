import Link from "next/link";
import { CloverMark } from "@/components/marketing/Marks";
import { getServiceIcon } from "@/components/marketing/serviceIcons";
import { C, display, mono } from "@/components/tokens";
import { getAllServices } from "@/lib/services/serviceService";

export const metadata = { title: "Services — Visionary IT Solutions" };

// "/services" — full listing page (deep-linkable version of the homepage section).
export default async function ServicesPage() {
  const services = await getAllServices().catch(() => []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="flex items-center gap-2 mb-3">
        <CloverMark size={10} fill={C.accent} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
          What we do
        </span>
      </div>
      <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl max-w-xl mb-14">
        Every service we offer, in one place.
      </h1>

      {services.length === 0 ? (
        <p style={{ color: C.inkDim }}>No services published yet — check back soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = getServiceIcon(s.icon);
            return (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="service-card p-7 rounded-2xl focus-ring"
                style={{ background: C.panel, border: `1px solid ${C.line}` }}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6" style={{ background: C.accentDeep }}>
                  <Icon size={20} color={C.accentSoft} />
                </div>
                <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg mb-2">
                  {s.title}
                </h3>
                <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }}>{s.summary}</p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
