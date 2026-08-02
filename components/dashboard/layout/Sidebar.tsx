"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, User, Inbox, Shield, Wrench, Package, Building2, Settings,
  X,
} from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import { useSidebar } from "./SidebarContext";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "My Company", href: "/dashboard/company", icon: Building2 },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
  { label: "Submissions", href: "/dashboard/contact-submissions", icon: Inbox },
  { label: "Admins", href: "/dashboard/admins", icon: Shield },
  { label: "Services", href: "/dashboard/services", icon: Wrench },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  const NavLinks = ({ forceExpanded = false }: { forceExpanded?: boolean }) => {
    const isCollapsed = forceExpanded ? false : collapsed;
    return (
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/dashboard" ? pathname === item.href : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              title={isCollapsed ? item.label : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg focus-ring"
              style={{
                background: active ? C.accentDeep : "transparent",
                color: active ? C.accentSoft : C.inkDim,
                fontFamily: mono,
                fontSize: 13,
                justifyContent: isCollapsed ? "center" : "flex-start",
              }}
            >
              <Icon size={16} className="flex-none" />
              {!isCollapsed && item.label}
            </Link>
          );
        })}
      </nav>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col flex-none min-h-screen px-5 py-4 transition-[width] duration-200"
        style={{
          background: C.panel2,
          borderRight: `1px solid ${C.line}`,
          width: collapsed ? 84 : 240,
        }}
      >
        <div
          className="flex items-center mb-8 px-1"
          style={{ justifyContent: collapsed ? "center" : "flex-start" }}
        >
          {!collapsed && (
            <img
              src="/icons/VITSIconSideTrans.png"
              alt="vivaanitsolutions"
              className="object-contain rounded-full"
              style={{ background: C.panel, width: 160, height: 48 }}
            />
          )}
          {collapsed && (
            <img
              src="/icons/VITSIconTrans.png"
              alt="vivaanitsolutions"
              className="object-contain rounded-full"
              style={{ background: C.panel, width: 36, height: 36 }}
            />
          )}
        </div>

        <NavLinks />
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer — always shows full labels regardless of desktop collapse state */}
      <aside
        className="md:hidden fixed top-0 left-0 h-full w-64 flex flex-col px-5 py-4 z-50 transition-transform duration-200"
        style={{
          background: C.panel2,
          borderRight: `1px solid ${C.line}`,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <img
            src="/icons/VITSIconSideTrans.png"
            alt="vivaanitsolutions"
            className="w-44 h-14 rounded-full object-cover"
            style={{ background: C.panel }}
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1 rounded-lg focus-ring"
            style={{ color: C.inkDim }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <NavLinks forceExpanded />
      </aside>
    </>
  );
}