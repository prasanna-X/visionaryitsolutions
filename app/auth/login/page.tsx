"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CloverMark } from "@/components/Marks";
import { C, display, mono } from "@/components/tokens";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // signInWithPassword returns a session containing both an access_token
    // (short-lived JWT) and a refresh_token. @supabase/ssr stores both in
    // cookies; middleware.js refreshes the access token automatically
    // whenever it expires.
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6"
      style={{ background: C.bg, color: C.ink, fontFamily: "inherit" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <CloverMark size={28} fill={C.accent} />
          <span style={{ fontFamily: display, fontWeight: 700, letterSpacing: 1 }}>
            VISIONARY <span style={{ color: C.accent }}>IT</span> ADMIN
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-8 rounded-2xl"
          style={{ background: C.panel, border: `1px solid ${C.line}` }}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 uppercase"
              style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg focus-ring"
              style={{ background: C.bg, border: `1px solid ${C.accentDeep}`, color: C.ink }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 uppercase"
              style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg focus-ring"
              style={{ background: C.bg, border: `1px solid ${C.accentDeep}`, color: C.ink }}
            />
          </div>

          {error && (
            <p style={{ color: "#E1897E", fontSize: 13.5 }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full mt-2 focus-ring disabled:opacity-60"
            style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14 }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
