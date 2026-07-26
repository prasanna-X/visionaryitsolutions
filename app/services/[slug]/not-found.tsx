import Link from "next/link";
import { C, display } from "@/components/tokens";

export default function ServiceNotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-28 text-center">
      <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl mb-4">
        We couldn't find that service.
      </h1>
      <p style={{ color: C.inkDim }} className="mb-8">
        It may have been renamed or removed.
      </p>
      <Link href="/services" className="focus-ring" style={{ color: C.accent }}>
        Back to all services
      </Link>
    </main>
  );
}
