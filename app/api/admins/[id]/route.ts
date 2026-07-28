import { NextResponse } from 'next/server';
import { getAdminById, updateAdmin, deleteAdmin } from '@/lib/services/adminService';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(await getAdminById(id));
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  return NextResponse.json(await updateAdmin(id, body));
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  await deleteAdmin(id);
  return NextResponse.json({ success: true });
}
