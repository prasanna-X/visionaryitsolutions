import { CloverMark } from "@/components/home/Marks";
import LoginForm from "@/components/dashboard/auth/LoginForm";
import { C, display, mono } from "@/components/tokens";

export const metadata = { title: "Admin Login — Visionary IT Solutions" };

// "/dashboard/login" — the only public entry point under /dashboard.
export default function DashboardLoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center mb-8">
        <CloverMark size={34} fill={C.accent} />
        <span
          style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}
          className="mt-4"
        >
          Admin access
        </span>
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl mt-2">
          Sign in to the dashboard
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}
