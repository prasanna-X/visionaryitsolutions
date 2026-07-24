"use client";

import { useState } from "react";
import { Phone, MapPin, Send } from "lucide-react";
import { CloverMark, CircuitField } from "./Marks";
import { C, display, mono } from "./tokens";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSent(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: C.paper, color: C.paperInk }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden md:my-10 md:shadow-2xl">
        <div className="p-9 md:p-12 relative overflow-hidden" style={{ background: C.bg, color: C.ink }}>
          <CircuitField opacity={0.08} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <CloverMark size={10} fill={C.accent} />
              <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
                Get in touch
              </span>
            </div>
            <h2 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-[34px] mb-6 max-w-sm">
              Tell us what your systems need to do.
            </h2>
            <p style={{ color: C.inkDim, lineHeight: 1.7 }} className="max-w-sm mb-10">
              Call, or send a message and we'll get back to you within one business day.
            </p>

            <div className="flex flex-col gap-5">
              <a href="tel:+9779864482678" className="flex items-center gap-3 focus-ring">
                <span className="w-10 h-10 rounded-full flex items-center justify-center flex-none" style={{ background: C.accentDeep }}>
                  <Phone size={16} color={C.accentSoft} />
                </span>
                <span style={{ fontFamily: mono, fontSize: 15 }}>+977 986-4482678</span>
              </a>
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center flex-none" style={{ background: C.accentDeep }}>
                  <MapPin size={16} color={C.accentSoft} />
                </span>
                <span style={{ color: C.inkDim, lineHeight: 1.6, fontSize: 15 }}>
                  New Naikap, Chandragiri&#8209;14
                  <br />
                  Kathmandu, Nepal
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-9 md:p-12" style={{ background: C.paper }}>
          {sent ? (
            <div className="h-full flex flex-col justify-center">
              <CloverMark size={34} fill={C.accentDeep} />
              <h3 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl mt-5 mb-2">
                Message received.
              </h3>
              <p style={{ color: "#4B5A50" }}>We'll get back to you shortly. Thanks for reaching out.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: "#4B5A50" }} className="block mb-2 uppercase">
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
                <label htmlFor="phone" style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: "#4B5A50" }} className="block mb-2 uppercase">
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
                <label htmlFor="message" style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: "#4B5A50" }} className="block mb-2 uppercase">
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
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full mt-2 focus-ring"
                style={{ background: C.paperInk, color: C.paper, fontWeight: 600, fontSize: 14 }}
              >
                Send message <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
