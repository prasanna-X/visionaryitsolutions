import { CloverMark } from "@/components/home/Marks";
import { C, mono } from "@/components/tokens";

export default function Loading() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5"
      style={{ minHeight: "60vh", background: C.bg }}
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: `2px solid ${C.accentDeep}`,
            borderTopColor: C.accent,
          }}
        />
        <CloverMark size={20} fill={C.accent} />
      </div>

      <span
        style={{
          fontFamily: mono,
          fontSize: 12.5,
          letterSpacing: 3,
          color: C.inkDim,
          textTransform: "uppercase",
        }}
      >
        Loading
      </span>
    </div>
  );
}