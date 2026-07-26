import { db } from '@/lib/db';

export async function getAllServices() {
  return db.service.findMany({ orderBy: { order: 'asc' } });
}

export async function getServiceById(id: string) {
  return db.service.findUnique({ where: { id } });
}

export async function getServiceBySlug(slug: string) {
  return db.service.findUnique({ where: { slug } });
}

export async function createService(data: { slug: string; title: string; summary: string; description: string }) {
  return db.service.create({ data });
}

export async function updateService(id: string, data: Partial<{ title: string; summary: string; description: string }>) {
  return db.service.update({ where: { id }, data });
}

export async function deleteService(id: string) {
  return db.service.delete({ where: { id } });
}
