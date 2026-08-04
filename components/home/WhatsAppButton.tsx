"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "9779864482678"; // no + or spaces
const DEFAULT_MESSAGE = "Hi! I'd like to know more about your services.";

export default function WhatsAppButton() {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed z-50 group focus-ring flex flex-col items-center"
            style={{ bottom: 24, right: 96 }}
        >
            <span
                className="mb-3 px-8 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium opacity-0 translate-y-2 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0 absolute bottom-full"
                style={{
                    background: "#111814",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
            >
                WhatsApp Us
            </span>

            <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "#25D366", opacity: 0.5, width: 56, height: 56 }}
            />
            <span
                className="wa-button-pop relative flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95 shrink-0"
                style={{
                    background: "#25D366",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
                }}
            >
                <MessageCircle size={26} color="#fff" fill="#fff" />
            </span>
        </a>
    );
}