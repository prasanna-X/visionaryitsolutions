"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { C, display, mono } from "@/components/tokens";

export default function Topbar({ admin }: { admin: { name: string; email: string; role: string } }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <header
      className="flex items-center justify-between px-8 py-4"
      style={{ borderBottom: `1px solid ${C.line}`, background: C.panel2 }}
    >
      <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim, textTransform: "uppercase" }}>
        Dashboard
      </span>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div style={{ fontFamily: display, fontWeight: 600, fontSize: 14 }}>{admin.name}</div>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.inkFaint, textTransform: "uppercase" }}>{admin.role}</div>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
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
          <LogOut size={14} /> Logout
        </button>
      </div>
    </header>
  );
}
