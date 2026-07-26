import { CloverMark } from "@/components/marketing/Marks";
import { C, display, mono } from "@/components/tokens";

export const metadata = { title: "About — Visionary IT Solutions" };

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      <div className="flex items-center gap-2 mb-3">
        <CloverMark size={10} fill={C.accent} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
          About us
        </span>
      </div>
      <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl mb-6">
        A small studio, based in Kathmandu.
      </h1>
      <p style={{ color: C.inkDim, fontSize: 17, lineHeight: 1.8 }} className="mb-5">
        Visionary IT Solutions designs, builds, and maintains the web platforms, cloud systems,
        and AI-powered software that growing businesses in Kathmandu rely on every day.
      </p>
      <p style={{ color: C.inkDim, fontSize: 17, lineHeight: 1.8 }}>
        We stay small on purpose — small enough to know your systems personally, and set up to
        keep working with you long after the first delivery.
      </p>
    </main>
  );
}
