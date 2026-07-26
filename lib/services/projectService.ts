import { db } from '@/lib/db';

export async function getAllProjects() {
  return db.project.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getPublishedProjects() {
  return db.project.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
}

export async function getProjectById(id: string) {
  return db.project.findUnique({ where: { id } });
}

export async function getProjectBySlug(slug: string) {
  return db.project.findUnique({ where: { slug } });
}

export async function createProject(data: { slug: string; title: string; summary: string; description: string }) {
  return db.project.create({ data });
}

export async function updateProject(id: string, data: Partial<{ title: string; summary: string; description: string; published: boolean }>) {
  return db.project.update({ where: { id }, data });
}

export async function deleteProject(id: string) {
  return db.project.delete({ where: { id } });
}
