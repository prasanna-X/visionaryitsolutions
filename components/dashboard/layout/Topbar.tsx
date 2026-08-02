"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { C, display, mono } from "@/components/tokens";
import { useSidebar } from "./SidebarContext";

export default function Topbar({ admin }: { admin: { name: string; email: string; role: string } }) {
  const router = useRouter();
  const { toggleCollapsed, setMobileOpen } = useSidebar();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  function handleMenuClick() {
    // Below md: open the mobile drawer. md and up: collapse/expand the sidebar.
    if (window.matchMedia("(min-width: 768px)").matches) {
      toggleCollapsed();
    } else {
      setMobileOpen(true);
    }
  }

  return (
    <header
      className="flex items-center justify-between px-4 md:px-8 py-4"
      style={{ borderBottom: `1px solid ${C.line}`, background: C.panel2 }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleMenuClick}
          className="p-1.5 -ml-1.5 rounded-lg focus-ring"
          style={{ color: C.inkDim }}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <span
          style={{
            fontFamily: mono,
            fontSize: 16,
            letterSpacing: 1.5,
            color: C.inkDim,
            textTransform: "uppercase",
          }}
        >
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="text-right hidden sm:block">
          <div style={{ fontFamily: display, fontWeight: 600, fontSize: 14 }}>{admin.name}</div>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.inkFaint, textTransform: "uppercase" }}>
            {admin.role}
          </div>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-none"
          style={{ background: C.accentDeep, color: C.accentSoft, fontFamily: display, fontWeight: 600, fontSize: 13 }}
        >
          {admin.name?.charAt(0).toUpperCase() ?? "A"}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 focus-ring"
          style={{ fontFamily: mono, fontSize: 12, color: C.inkDim }}
          aria-label="Log out"
        >
          <LogOut size={14} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}