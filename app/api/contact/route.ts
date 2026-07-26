import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: save lead / send notification email
  return NextResponse.json({ success: true });
}
