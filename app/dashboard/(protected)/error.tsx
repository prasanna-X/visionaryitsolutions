'use client';

import { AlertTriangle } from "lucide-react";
import { CloverMark } from "@/components/home/Marks";
import { C, display, mono } from "@/components/tokens";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 text-center px-6"
      style={{ minHeight: "60vh", background: C.bg }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: C.accentDeep }}
      >
        <AlertTriangle size={24} color={C.accentSoft} />
      </div>

      <div className="flex items-center gap-2">
        <CloverMark size={9} fill={C.accent} />
        <span
          style={{
            fontFamily: mono,
            fontSize: 12,
            letterSpacing: 3,
            color: C.accent,
            textTransform: "uppercase",
          }}
        >
          Error
        </span>
      </div>

      <h2
        style={{ fontFamily: display, fontWeight: 700, color: C.ink }}
        className="text-2xl md:text-3xl"
      >
        Dashboard error
      </h2>

      <p style={{ color: C.inkDim, fontSize: 15, lineHeight: 1.7 }} className="max-w-md">
        {error.message || "Something went wrong while loading the dashboard."}
      </p>

      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full mt-4 focus-ring"
        style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14 }}
      >
        Try again
      </button>
    </div>
  );
}