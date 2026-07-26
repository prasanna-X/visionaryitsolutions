import { NextResponse } from 'next/server';
import { getAllAdmins, createAdmin } from '@/lib/services/adminService';

export async function GET() {
  return NextResponse.json(await getAllAdmins());
}

export async function POST(request: Request) {
  const body = await request.json();
  const admin = await createAdmin(body);
  return NextResponse.json(admin, { status: 201 });
}
