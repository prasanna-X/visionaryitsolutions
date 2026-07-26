"use client";

import Image from "next/image";
import { C } from "@/components/tokens";

interface CloverMarkProps {
  size?: number;
  fill?: string;
  stroke?: string;
}

/* Clover mark — the brand's four-leaf clover, redrawn in SVG so it can be
   recolored, scaled, and reused as a live UI signature (bullets, watermark,
   badge) instead of a flat image. */
export function CloverMark({ size = 40, fill = C.ink, stroke = "none" }: CloverMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth={stroke !== "none" ? 4 : 0}>
        <circle cx="100" cy="70" r="34" fill={fill} />
        <circle cx="130" cy="100" r="34" fill={fill} />
        <circle cx="100" cy="130" r="34" fill={fill} />
        <circle cx="70" cy="100" r="34" fill={fill} />
        <circle cx="100" cy="100" r="22" fill={fill} />
      </g>
    </svg>
  );
}

interface CloverBulletProps {
  color?: string;
  size?: number;
}

export function CloverBullet({ color = C.accent, size = 9 }: CloverBulletProps) {
  return (
    <span style={{ display: "inline-flex", flex: "none", marginTop: 6 }}>
      <CloverMark size={size} fill={color} />
    </span>
  );
}

interface BadgeProps {
  size?: number;
  src?: string;
}

/* Full circular badge — now a static PNG emblem instead of hand-drawn SVG.
   Drop the exported artwork at /public/images/vits_logo.png (square,
   ideally 2x the largest rendered size for crisp retina display). */
export function Badge({ size = 220, src = "/images/vits_logo.png" }: BadgeProps) {
  return (
    <Image
      src={src}
      alt="Visionary IT Solutions emblem"
      width={size}
      height={size}
      priority
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

interface CircuitFieldProps {
  opacity?: number;
}

/* Faint circuit-grid watermark — a nod to "IT" without leaning on a
   cliché neon-terminal look. */
export function CircuitField({ opacity = 0.06 }: CircuitFieldProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 400 400"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={C.accent} strokeWidth="0.6" />
          <circle cx="0" cy="0" r="2" fill={C.accent} />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#grid)" />
    </svg>
  );
}
