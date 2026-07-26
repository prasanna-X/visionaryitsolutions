import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: send password reset email
  return NextResponse.json({ success: true });
}
