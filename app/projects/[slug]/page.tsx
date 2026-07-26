import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CloverMark } from "@/components/marketing/Marks";
import { C, display, mono } from "@/components/tokens";
import { getProjectBySlug } from "@/lib/services/projectService";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug).catch(() => null);
  return { title: project ? `${project.title} — Visionary IT Solutions` : "Case Study Not Found" };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug).catch(() => null);
  if (!project || !project.published) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 mb-10 focus-ring"
        style={{ fontFamily: mono, fontSize: 12.5, color: C.inkDim, letterSpacing: 1 }}
      >
        <ArrowLeft size={14} /> All case studies
      </Link>

      <div className="flex items-center gap-2 mb-3">
        <CloverMark size={9} fill={C.accent} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: 3, color: C.accent, textTransform: "uppercase" }}>
          {project.clientName || "Case study"}
        </span>
      </div>

      <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-3xl md:text-4xl mb-6">
        {project.title}
      </h1>

      <p style={{ color: C.inkDim, fontSize: 18, lineHeight: 1.75 }} className="mb-8">
        {project.summary}
      </p>

      <div style={{ color: C.ink, fontSize: 15.5, lineHeight: 1.8, whiteSpace: "pre-line" }}>
        {project.description}
      </div>
    </article>
  );
}
