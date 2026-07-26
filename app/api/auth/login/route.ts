import { NextResponse } from 'next/server';
import { login } from '@/lib/services/authService';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await login(body.email, body.password);
  return NextResponse.json(result);
}
