import Image from "next/image";
import Link from "next/link";
import { C, display, mono } from "@/components/tokens";
import { getCompanyDetails } from "@/lib/services/companyService"; // adjust to your actual path
import { getAllServices } from "@/lib/services/serviceService";
import { SERVICE_SLUGS, getServiceDetailContent } from "@/lib/content/serviceDetails";
import { MapPin, Phone, MessageSquare } from "lucide-react";

const SHORTCUT_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

async function getFooterServiceLinks() {
  const dbServices = await getAllServices().catch(() => []);
  const dbSlugMap = new Map(dbServices.map((s) => [s.slug, s.title]));
  const allSlugs = Array.from(new Set([...dbSlugMap.keys(), ...SERVICE_SLUGS]));

  return allSlugs
    .map((slug) => {
      const title = dbSlugMap.get(slug) ?? getServiceDetailContent(slug)?.title;
      if (!title) return null;
      return { slug, title };
    })
    .filter((s): s is { slug: string; title: string } => Boolean(s));
}

export default async function Footer() {
  const [company, serviceLinks] = await Promise.all([
    getCompanyDetails(),
    getFooterServiceLinks(),
  ]);

  const name = company?.name;
  const logoUrl = company?.favicon_url;
  const phone = company?.phone;
  const email = company?.email;
  const short_desc = company?.short_desc;

  const address = [
    company?.address_line1,
    company?.address_line2,
    company?.city,
    company?.state,
    company?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const maps_url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
  const phone_url = phone ? "tel:" + phone.replace(/\s+/g, "") : "";
  const mailto_url = email ? "mailto:" + email : "";

  return (
    <footer style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt={`${name ?? "Company"} logo`}
                  width={200}
                  height={70}
                  style={{ width: 200, height: 70, objectFit: "contain" }}
                />
              )}
            </div>
            {short_desc && (
              <p style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim, lineHeight: 1.7 }}>
                {short_desc}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Shortcut links */}
              <div className="flex flex-col gap-2 sm:w-32">
                <span
                  style={{ fontFamily: display, fontWeight: 700, letterSpacing: 0.5, color: C.inkDim }}
                  className="text-xs uppercase mb-1"
                >
                  Quick Links
                </span>
                {SHORTCUT_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim }}
                    className="hover:underline w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Service links */}
              {serviceLinks.length > 0 && (
                <div className="flex flex-col gap-2 sm:w-44">
                  <span
                    style={{ fontFamily: display, fontWeight: 700, letterSpacing: 0.5, color: C.inkDim }}
                    className="text-xs uppercase mb-1"
                  >
                    Our Services
                  </span>
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim }}
                      className="hover:underline w-fit"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <div style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim }} className="flex flex-col flex-1">
              <span
                style={{ fontFamily: display, fontWeight: 700, letterSpacing: 0.5, color: C.inkDim }}
                className="text-xs uppercase mb-1"
              >
                Contact us
              </span>
              <ul className="mt-2 space-y-4">
                <li className="flex gap-3">
                  <MapPin size={12.5} className="shrink-0" />
                  <div>
                    <p>Visit office</p>
                    <a
                      href={maps_url}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring block text-white/55 hover:text-primary hover:underline"
                    >
                      {address}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone size={12.5} className="shrink-0 " />
                  <div>
                    <p>Call us</p>
                    <a
                      href={phone_url}
                      className="focus-ring block text-white/55 hover:text-white hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MessageSquare size={12.5} className="shrink-0" />
                  <div>
                    <p>Email us</p>
                    <a
                      href={mailto_url}
                      className="focus-ring block text-white/55 hover:text-white hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div >

        {/* Divider */}
        < div className="mt-10" style={{ borderTop: `1px solid ${C.line}` }
        } />

        {/* Meta / copyright */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>
            &copy; {new Date().getFullYear()} · Vivaan IT Solutions Pvt Ltd. All Rights Reserved.
          </span>
        </div>
      </div >
    </footer >
  );
}