import { cookies } from 'next/headers';

export function getSessionToken() {
  return cookies().get('session')?.value ?? null;
}

export function setSessionCookie(token: string) {
  cookies().set('session', token, { httpOnly: true, secure: true, path: '/' });
}

export function clearSessionCookie() {
  cookies().delete('session');
}
