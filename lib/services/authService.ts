import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { getSessionToken, setSessionCookie, clearSessionCookie } from '@/lib/auth';

export async function login(email: string, password: string) {
  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin) throw new Error('Invalid credentials');

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  // TODO: create JWT/session token
  const token = 'signed-session-token';
  setSessionCookie(token);
  return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
}

export async function logout() {
  clearSessionCookie();
}

export async function getCurrentAdmin() {
  const token = getSessionToken();
  if (!token) return null;
  // TODO: verify token, decode admin id
  return db.admin.findFirst();
}
