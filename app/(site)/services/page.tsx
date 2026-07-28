import Link from "next/link";
import { Code2, Cloud, Wrench, Bot, ShieldCheck, LineChart } from "lucide-react";
import { CloverMark } from "@/components/home/Marks";
import { getServiceIcon } from "@/components/home/serviceIcons";
import { C, display, mono } from "@/components/tokens";
import { getAllServices } from "@/lib/services/serviceService";

export const metadata = { title: "Services — Visionary IT Solutions" };

// Used only if the API call fails or returns an empty list.
const FALLBACK_SERVICES = [
  {
    id: "web-app-development",
    slug: "web-app-development",
    Icon: Code2,
    title: "Web & App Development",
    summary:
      "Custom websites and applications shaped around how your team actually works, from first sketch through to production.",
  },
  {
    id: "cloud-infrastructure",
    slug: "cloud-infrastructure",
    Icon: Cloud,
    title: "Cloud & Infrastructure",
    summary:
      "Servers, storage, and deployments set up to stay online, scale with demand, and cost less to run month to month.",
  },
  {
    id: "it-consulting-support",
    slug: "it-consulting-support",
    Icon: Wrench,
    title: "IT Consulting & Support",
    summary:
      "Hands-on, ongoing support and straight technical advice, so the decision-making doesn't fall entirely on you.",
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    Icon: Bot,
    title: "AI Automation",
    summary:
      "AI-driven workflows and integrations that take repetitive work off your team's plate and speed up daily operations.",
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    Icon: ShieldCheck,
    title: "Cybersecurity",
    summary:
      "Practical protection for your data, network, and customers, sized to your business rather than bolted on.",
  },
  {
    id: "digital-transformation",
    slug: "digital-transformation",
    Icon: LineChart,
    title: "Digital Transformation",
    summary:
      "Moving paper trails and spreadsheets onto systems that actually scale as the business grows around them.",
  },
];

export default async function ServicesPage() {
  const apiServices = await getAllServices().catch(() => []);
  const services = apiServices.length > 0 ? apiServices : FALLBACK_SERVICES;

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
            const Icon = s.Icon ?? getServiceIcon(s.icon);
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
                <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }}>{s.description}</p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}