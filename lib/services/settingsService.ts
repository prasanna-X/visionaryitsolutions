import { db } from '@/lib/db';

export async function getSettings() {
  return db.settings.findFirst();
}

export async function updateSettings(data: Partial<{ siteName: string; contactEmail: string; phone: string; address: string }>) {
  const existing = await db.settings.findFirst();
  if (!existing) return db.settings.create({ data: data as any });
  return db.settings.update({ where: { id: existing.id }, data });
}
