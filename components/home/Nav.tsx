"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { C, display, mono } from "@/components/tokens";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#process", label: "Process" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "rgba(11,15,13,0.85)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.line}` }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3 focus-ring">
          <Image
            src="/images/vits_logo_inverse.png"
            alt="Visionary IT Solutions logo"
            width={50}
            height={50}
            style={{ width: 50, height: 50, objectFit: "contain" }}
          />
          <span style={{ fontFamily: display, fontWeight: 700, letterSpacing: 1 }} className="text-lg">
            VISIONARY <span style={{ color: C.accent }}>IT</span> SOLUTIONS
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link focus-ring"
              style={{ fontFamily: mono, fontSize: 13, letterSpacing: 1, color: C.inkDim, textTransform: "uppercase" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+9779864482678"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full focus-ring"
          style={{ border: `1px solid ${C.accentDeep}`, color: C.accent, fontFamily: mono, fontSize: 13 }}
        >
          <Phone size={14} /> +977 986-4482678
        </a>

        <button
          className="md:hidden focus-ring"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ color: C.ink }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ borderTop: `1px solid ${C.line}` }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: mono, fontSize: 13, letterSpacing: 1, color: C.inkDim, textTransform: "uppercase" }}
              className="pt-3"
            >
              {l.label}
            </a>
          ))}
          <a href="tel:+9779864482678" style={{ color: C.accent, fontFamily: mono, fontSize: 13 }} className="pt-1">
            +977 986-4482678
          </a>
        </div>
      )}
    </header>
  );
}
