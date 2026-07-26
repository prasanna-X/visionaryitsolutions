import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/services/authService';
import { updateAdmin } from '@/lib/services/adminService';

export async function GET() {
  return NextResponse.json(await getCurrentAdmin());
}

export async function PUT(request: Request) {
  const admin = await getCurrentAdmin();
  const body = await request.json();
  return NextResponse.json(await updateAdmin(admin!.id, body));
}
