import Image from "next/image";
import Link from "next/link";
import { C, display, mono } from "@/components/tokens";
import { getCompanyDetails } from "@/lib/services/companyService"; // adjust to your actual path

const SHORTCUT_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default async function Footer() {
  const company = await getCompanyDetails();

  const name = company?.name;
  const logoUrl = company?.logo_url;
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
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-3 md:col-span-2">
          <div className="flex items-center gap-3">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={`${name ?? "Company"} logo`}
                width={50}
                height={50}
                style={{ width: 50, height: 50, objectFit: "contain" }}
              />
            )}
            <span style={{ fontFamily: display, fontWeight: 700, letterSpacing: 0.5 }} className="text-sm">
              {name}
            </span>
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

        {/* Meta / copyright */}
        <div className="flex flex-col justify-between items-start md:items-end gap-4">
          <span style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>
            &copy; {new Date().getFullYear()} · Made in Kathmandu
          </span>
        </div>
      </div>
    </footer>
  );
}