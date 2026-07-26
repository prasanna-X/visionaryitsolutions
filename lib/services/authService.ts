import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { getSessionToken, decodeSession, setSessionCookie, clearSessionCookie } from '@/lib/auth';

export async function login(email: string, password: string) {
  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin) throw new Error('Invalid email or password');

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) throw new Error('Invalid email or password');

  setSessionCookie(admin.id);
  return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
}

export async function logout() {
  clearSessionCookie();
}

export async function getCurrentAdmin() {
  const token = getSessionToken();
  if (!token) return null;

  const adminId = decodeSession(token);
  if (!adminId) return null;

  const admin = await db.admin.findUnique({ where: { id: adminId } });
  if (!admin) return null;

  return { id: admin.id, name: admin.name, email: admin.email, role: admin.role, avatarUrl: admin.avatarUrl };
}
