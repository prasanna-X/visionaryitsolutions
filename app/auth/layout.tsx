import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CloverMark } from "@/components/Marks";
import SignOutButton from "@/components/admin/SignOutButton";
import { C, display, mono } from "@/components/tokens";

export default async function AdminLayout({ children }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    // Logged in, but not granted admin rights yet (no admin_profiles row).
    redirect("/admin/login");
  }

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh" }}>
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: `1px solid ${C.line}` }}
      >
        <div className="flex items-center gap-3">
          <CloverMark size={24} fill={C.accent} />
          <span style={{ fontFamily: display, fontWeight: 700, letterSpacing: 1 }}>
            VISIONARY <span style={{ color: C.accent }}>IT</span> ADMIN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: mono, fontSize: 13, color: C.inkDim }}>
            {profile.full_name || user.email}
          </span>
          <SignOutButton />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
