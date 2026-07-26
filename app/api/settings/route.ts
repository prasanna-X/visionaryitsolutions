import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/services/settingsService';

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json(await updateSettings(body));
}
