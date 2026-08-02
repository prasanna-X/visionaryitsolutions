import Image from "next/image";
import Link from "next/link";
import { C, display, mono } from "@/components/tokens";
import { getCompanyDetails } from "@/lib/services/companyService"; // adjust to your actual path
import { getAllServices } from "@/lib/services/serviceService";
import { SERVICE_SLUGS, getServiceDetailContent } from "@/lib/content/serviceDetails";

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

  const address = [
    company?.address_line1,
    company?.address_line2,
    company?.city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer style={{ borderTop: `1px solid ${C.line}` }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 md:col-span-2">
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
              {/* <span style={{ fontFamily: display, fontWeight: 700, letterSpacing: 0.5 }} className="text-sm">
                {name}
              </span> */}
            </div>
            <div style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim }} className="flex flex-col gap-1">
              {address && <span>{address}</span>}
              {(company?.state || company?.country) && (
                <span>
                  {[company?.state, company?.country].filter(Boolean).join(", ")}
                </span>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/[\s-]/g, "")}`} style={{ color: C.inkDim }} className="hover:underline w-fit">
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} style={{ color: C.inkDim }} className="hover:underline w-fit">
                  {email}
                </a>
              )}
            </div>
          </div>

          {/* Shortcut links */}
          <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
              <span
                style={{ fontFamily: display, fontWeight: 700, letterSpacing: 0.5, color: C.inkDim }}
                className="text-xs uppercase mb-1"
              >
                Services
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

        {/* Divider */}
        <div className="mt-10" style={{ borderTop: `1px solid ${C.line}` }} />

        {/* Meta / copyright */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>
            &copy; {new Date().getFullYear()} · Vivaan IT Solutions Pvt Ltd. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}