"use client";

import { Code2, Cloud, Wrench, Bot, ShieldCheck, LineChart } from "lucide-react";
import { CloverMark } from "./Marks";
import { C, display, mono } from "./tokens";

const SERVICES = [
  {
    icon: Code2,
    title: "Web & App Development",
    body: "Custom websites and applications shaped around how your team actually works, from first sketch through to production.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    body: "Servers, storage, and deployments set up to stay online, scale with demand, and cost less to run month to month.",
  },
  {
    icon: Wrench,
    title: "IT Consulting & Support",
    body: "Hands-on, ongoing support and straight technical advice, so the decision-making doesn't fall entirely on you.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    body: "AI-driven workflows and integrations that take repetitive work off your team's plate and speed up daily operations.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    body: "Practical protection for your data, network, and customers, sized to your business rather than bolted on.",
  },
  {
    icon: LineChart,
    title: "Digital Transformation",
    body: "Moving paper trails and spreadsheets onto systems that actually scale as the business grows around them.",
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="flex items-center gap-2 mb-3">
        <CloverMark size={10} fill={C.accent} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
          What we do
        </span>
      </div>
      <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl max-w-xl mb-14">
        Six ways we help IT-dependent businesses move faster.
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <div key={s.title} className="service-card p-7 rounded-2xl" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center mb-6" style={{ background: C.accentDeep }}>
              <s.icon size={20} color={C.accentSoft} />
            </div>
            <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg mb-2">
              {s.title}
            </h3>
            <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
