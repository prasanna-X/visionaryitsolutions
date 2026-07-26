import { CloverMark } from "@/components/home/Marks";
import { C, display, mono } from "@/components/tokens";

export const metadata = { title: "Reset Password — Visionary IT Solutions" };

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm text-center">
      <CloverMark size={34} fill={C.accent} />
      <span
        style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}
        className="block mt-4"
      >
        Reset access
      </span>
      <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl mt-2 mb-4">
        Forgot your password?
      </h1>
      <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.6 }}>
        Contact a super admin to reset your password — self-service reset isn't enabled yet.
      </p>
    </div>
  );
}
