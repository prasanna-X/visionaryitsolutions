import { Phone, MapPin } from "lucide-react";
import { CloverMark, CircuitField } from "@/components/home/Marks";
import { C, display, mono } from "@/components/tokens";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact — Visionary IT Solutions" };

export default function ContactPage() {
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
            <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-[34px] mb-6 max-w-sm">
              Tell us what your systems need to do.
            </h1>
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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
