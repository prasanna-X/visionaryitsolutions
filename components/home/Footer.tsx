"use client";

import Image from "next/image";
import { C, display, mono } from "@/components/tokens";

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/vits_logo_inverse.png"
            alt="VIVAAN IT Solutions logo"
            width={50}
            height={50}
            style={{ width: 50, height: 50, objectFit: "contain" }}
          />
          <span style={{ fontFamily: display, fontWeight: 700, letterSpacing: 0.5 }} className="text-sm">
            VIVAAN IT SOLUTIONS
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2" style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim }}>
          <span>New Naikap, Chandragiri-14, Kathmandu</span>
          <a href="tel:+9779864482678" style={{ color: C.inkDim }} className="hover:underline">
            +977 986-4482678
          </a>
        </div>

        <span style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>
          &copy; {new Date().getFullYear()} · Made in Kathmandu
        </span>
      </div>
    </footer>
  );
}
