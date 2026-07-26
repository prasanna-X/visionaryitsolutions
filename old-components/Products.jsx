"use client";

import { CalendarCheck, ShoppingBag, Clapperboard, ArrowUpRight } from "lucide-react";
import { C } from "@/components/tokens";

const products = [
    {
        name: "VisionBookings",
        tag: "Booking System",
        description:
            "An online booking and scheduling platform for service businesses — clients book appointments in real time while you manage availability, staff, and payments from one dashboard.",
        icon: CalendarCheck,
        url: "https://visionbookings.com",
    },
    {
        name: "TheNepalMade",
        tag: "Ecommerce",
        description:
            "A homegrown ecommerce marketplace spotlighting Nepali-made products, built to help local makers and brands sell online with secure checkout and order tracking.",
        icon: ShoppingBag,
        url: "https://thenepalmade.com",
    },
    {
        name: "VisionFlix",
        tag: "OTT",
        description:
            "A streaming platform for on-demand video, delivering subscription-based access to movies, series, and original content with a smooth, cross-device viewing experience.",
        icon: Clapperboard,
        url: "https://visionflix.com",
    },
];

export default function Products() {
    return (
        <section id="products" className="w-full px-6 py-24 md:px-12 lg:px-24">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
                    Products
                </h1>
                <p className="max-w-2xl text-base md:text-lg opacity-70 mb-16">
                    A brief intro describing your product lineup or philosophy goes here.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((p) => {
                        const Icon = p.icon;
                        return (
                            <a
                                key={p.name}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ borderColor: C.ink }
                                }
                                className="group rounded-2xl border border-opacity-10 p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ background: C.accentDeep ?? C.ink, color: C.bg }}
                                >
                                    <Icon size={22} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-medium">{p.name}</h3>
                                        <ArrowUpRight
                                            size={16}
                                            className="opacity-0 group-hover:opacity-70 transition-opacity"
                                        />
                                    </div>
                                    <span
                                        className="text-xs uppercase tracking-wide opacity-60"
                                        style={{ letterSpacing: 1 }}
                                    >
                                        {p.tag}
                                    </span>
                                </div>

                                <p className="text-sm opacity-70">{p.description}</p>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}