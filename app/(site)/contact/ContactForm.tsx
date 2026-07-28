"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CloverMark } from "@/components/home/Marks";
import { C, display, mono } from "@/components/tokens";

interface ContactFormState {
  name: string;
  phone: string;
  message: string;
}

// Private to the /contact route — not in components/home, since this is
// the only place it's used and Next.js requires client components to be
// in their own file, separate from the page's `metadata` export.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ContactFormState>({ name: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="h-full flex flex-col justify-center">
        <CloverMark size={34} fill={C.accentDeep} />
        <h3 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl mt-5 mb-2">
          Message received.
        </h3>
        <p style={{ color: "#4B5A50" }}>We'll get back to you shortly. Thanks for reaching out.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="name"
          style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: "#4B5A50" }}
          className="block mb-2 uppercase"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={{ background: "#fff", border: "1px solid #D6DED8", color: C.paperInk }}
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: "#4B5A50" }}
          className="block mb-2 uppercase"
        >
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={{ background: "#fff", border: "1px solid #D6DED8", color: C.paperInk }}
          placeholder="98XXXXXXXX"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: "#4B5A50" }}
          className="block mb-2 uppercase"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg focus-ring"
          style={{ background: "#fff", border: "1px solid #D6DED8", color: C.paperInk, resize: "none" }}
          placeholder="What are you looking to build?"
        />
      </div>
      {error && <p style={{ color: "#B5453D", fontSize: 13.5 }}>{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-full mt-2 focus-ring"
        style={{ background: C.paperInk, color: C.paper, fontWeight: 600, fontSize: 14, opacity: sending ? 0.6 : 1 }}
      >
        {sending ? "Sending…" : "Send message"} <Send size={15} />
      </button>
    </form>
  );
}
