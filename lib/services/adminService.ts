import { db } from '@/lib/db';
import { hashPassword } from '@/lib/password';

export async function getAllAdmins() {
  return db.admin.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getAdminById(id: string) {
  return db.admin.findUnique({ where: { id } });
}

export async function createAdmin(data: { name: string; email: string; password: string; role?: string }) {
  const passwordHash = await hashPassword(data.password);
  return db.admin.create({
    data: { name: data.name, email: data.email, passwordHash, role: data.role ?? 'admin' },
  });
}

export async function updateAdmin(id: string, data: Partial<{ name: string; email: string; role: string; avatarUrl: string }>) {
  return db.admin.update({ where: { id }, data });
}

export async function deleteAdmin(id: string) {
  return db.admin.delete({ where: { id } });
}
