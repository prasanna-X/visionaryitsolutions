import { NextResponse } from 'next/server';
import { getAdminById, updateAdmin, deleteAdmin } from '@/lib/services/adminService';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await getAdminById(params.id));
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json(await updateAdmin(params.id, body));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteAdmin(params.id);
  return NextResponse.json({ success: true });
}
