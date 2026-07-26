import { C } from "@/components/tokens";

// Minimal shell for /dashboard/login and /dashboard/forgot-password — no
// sidebar, no auth guard (this IS the auth entry point).
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: C.bg, color: C.ink }}
    >
      {children}
    </div>
  );
}
