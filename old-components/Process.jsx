"use client";

import { ArrowRight, ArrowDown } from "lucide-react";
import { CloverMark } from "./Marks";
import { C, display, mono } from "./tokens";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "We start by understanding your business, your goals, and how your team currently works before proposing anything.",
  },
  {
    n: "02",
    title: "Design",
    body: "We map out the system architecture, workflows, and user experience so every piece fits together before development starts.",
  },
  {
    n: "03",
    title: "Development",
    body: "We build the solution in focused sprints, with regular check-ins so you always know where the project stands.",
  },
  {
    n: "04",
    title: "Deployment",
    body: "We launch carefully — testing thoroughly and migrating data safely so go-live causes zero disruption to your business.",
  },
  {
    n: "05",
    title: "Support",
    body: "We stay on after launch to monitor, maintain, and improve the system as your business and needs grow.",
  },
];

export default function Process() {
  return (
    <section id="process" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="flex items-center gap-2 mb-3">
        <CloverMark size={10} fill={C.accent} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
          Our workflow
        </span>
      </div>
      <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl max-w-xl mb-14">
        How We Deliver Project
      </h2>

      <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex flex-col lg:flex-row lg:flex-1 items-stretch">
            <div
              className="step-card flex-1 p-6 rounded-2xl flex flex-col"
              style={{ background: C.panel, border: `1px solid ${C.line}` }}
            >
              <span style={{ fontFamily: mono, fontSize: 12, color: C.accentSoft, letterSpacing: 2 }}>{step.n}</span>
              <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg mt-2 mb-2">
                {step.title}
              </h3>
              <p style={{ color: C.inkDim, fontSize: 13.5, lineHeight: 1.6 }}>{step.body}</p>
            </div>

            {i < STEPS.length - 1 && (
              <>
                <div className="hidden lg:flex items-center justify-center px-1" style={{ color: C.accentDeep }}>
                  <ArrowRight size={18} />
                </div>
                <div className="flex lg:hidden justify-center py-2" style={{ color: C.accentDeep }}>
                  <ArrowDown size={18} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
