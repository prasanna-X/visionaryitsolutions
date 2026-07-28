"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, User, Inbox, Shield, Wrench, Package, Users, Settings } from "lucide-react";
import { C, display, mono } from "@/components/tokens";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
  { label: "Submissions", href: "/dashboard/contact-submissions", icon: Inbox },
  { label: "Admins", href: "/dashboard/admins", icon: Shield },
  { label: "Services", href: "/dashboard/services", icon: Wrench },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Team Members", href: "/dashboard/team-members", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-60 flex-none min-h-screen px-5 py-6"
      style={{ background: C.panel2, borderRight: `1px solid ${C.line}` }}
    >
      <div className="flex items-center gap-2 px-2 mb-8">
        {/* <CloverMark size={20} fill={C.accent} /> */}
        <span style={{ fontFamily: display, fontWeight: 700, fontSize: 17, letterSpacing: 0.5 }}>
          VIVAAN IT SOLUTIONS
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/dashboard" ? pathname === item.href : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg focus-ring"
              style={{
                background: active ? C.accentDeep : "transparent",
                color: active ? C.accentSoft : C.inkDim,
                fontFamily: mono,
                fontSize: 13,
              }}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
