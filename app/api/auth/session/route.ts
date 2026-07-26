import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/services/authService';

export async function GET() {
  const admin = await getCurrentAdmin();
  return NextResponse.json(admin);
}
