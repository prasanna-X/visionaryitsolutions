"use client";

import { ArrowRight } from "lucide-react";
import { CloverMark, Badge, CircuitField } from "./Marks";
import { C, display, mono } from "./tokens";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <CircuitField opacity={0.07} />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-14 items-center relative">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <CloverMark size={12} fill={C.accent} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
              Kathmandu, Nepal
            </span>
          </div>

          <h1
            style={{ fontFamily: display, fontWeight: 700, lineHeight: 1.08, letterSpacing: -0.5 }}
            className="text-4xl sm:text-5xl md:text-[52px]"
          >
            Software that runs your business,
            <span style={{ color: C.accent }}> not the other way around.</span>
          </h1>

          <p style={{ color: C.inkDim, fontSize: 18, lineHeight: 1.7 }} className="mt-6 max-w-md">
            We design, build, and maintain the web platforms, cloud systems, and AI-powered
            software that growing businesses in Kathmandu rely on every day.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">
            <a
              href="tel:+9779864482678"
              className="flex items-center gap-2 px-6 py-3 rounded-full focus-ring"
              style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14 }}
            >
              Talk to us <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="flex items-center gap-2 px-6 py-3 rounded-full focus-ring"
              style={{ border: `1px solid ${C.accentDeep}`, color: C.ink, fontSize: 14 }}
            >
              See what we do
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="float-badge">
            <Badge size={260} />
          </div>
        </div>
      </div>
    </section>
  );
}
