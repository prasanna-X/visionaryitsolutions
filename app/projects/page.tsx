import Link from "next/link";
import { CloverMark } from "@/components/marketing/Marks";
import { C, display, mono } from "@/components/tokens";
import { getPublishedProjects } from "@/lib/services/projectService";

export const metadata = { title: "Case Studies — Visionary IT Solutions" };

// "/projects" — published case studies only (drafts stay in the dashboard).
export default async function ProjectsPage() {
  const projects = await getPublishedProjects().catch(() => []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="flex items-center gap-2 mb-3">
        <CloverMark size={10} fill={C.accent} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
          Case studies
        </span>
      </div>
      <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl mb-14">
        What we've built.
      </h1>

      {projects.length === 0 ? (
        <p style={{ color: C.inkDim }}>Case studies coming soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="p-7 rounded-2xl focus-ring block"
              style={{ background: C.panel, border: `1px solid ${C.line}` }}
            >
              {p.clientName && (
                <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.accent, textTransform: "uppercase" }}>
                  {p.clientName}
                </span>
              )}
              <h3 style={{ fontFamily: display, fontWeight: 600 }} className="text-lg mt-2 mb-2">
                {p.title}
              </h3>
              <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.65 }}>{p.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
