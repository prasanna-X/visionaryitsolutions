"use client";

import { CloverMark, CloverBullet } from "@/components/home/Marks";
import { C, display, mono } from "@/components/tokens";

interface ApproachPoint {
  title: string;
  body: string;
}

const APPROACH_POINTS: ApproachPoint[] = [
  {
    title: "A local team, on call",
    body: "Based in Kathmandu and reachable directly — not routed through an overseas support queue.",
  },
  {
    title: "Built to last, not to launch",
    body: "We stay on after go-live to maintain, patch, and improve what we build, rather than moving on.",
  },
  {
    title: "Straight answers, no upsell",
    body: "Recommendations sized to what your systems actually need, explained without unnecessary jargon.",
  },
];

export default function Approach() {
  return (
    <section id="approach" style={{ background: C.panel2, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CloverMark size={10} fill={C.accent} />
            <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
              Why teams work with us
            </span>
          </div>
          <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl mb-6">
            A studio that stays close to what it builds.
          </h2>
          <p style={{ color: C.inkDim, lineHeight: 1.75 }} className="max-w-md">
            Visionary IT Solutions is a small, focused team — small enough to know your systems
            personally, and set up to keep working with you long after the first delivery.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {APPROACH_POINTS.map((p) => (
            <div key={p.title} className="flex gap-4">
              <CloverBullet size={16} />
              <div>
                <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg mb-1">
                  {p.title}
                </h3>
                <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
