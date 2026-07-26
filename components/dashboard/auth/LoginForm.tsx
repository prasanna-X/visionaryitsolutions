"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { C, mono } from "@/components/tokens";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="email"
          style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim }}
          className="block mb-2 uppercase"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.ink }}
          placeholder="you@visionaryit.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.inkDim }}
          className="block mb-2 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.ink }}
          placeholder="••••••••"
        />
      </div>

      {error && <p style={{ color: "#E08A7D", fontSize: 13.5 }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full mt-2 focus-ring"
        style={{ background: C.accent, color: C.bg, fontWeight: 600, fontSize: 14, opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Signing in…" : "Sign in"} <LogIn size={15} />
      </button>

      <a
        href="/dashboard/forgot-password"
        className="text-center focus-ring"
        style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim }}
      >
        Forgot your password?
      </a>
    </form>
  );
}
