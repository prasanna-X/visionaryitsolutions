import { NextResponse } from 'next/server';
import { getAdminById, updateAdmin, deleteAdmin } from '@/lib/services/adminService';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const profile = await getAdminById(params.id);
  console.log(`[GET /admins/${params.id}] response:`, JSON.stringify(profile, null, 2));

  return NextResponse.json(profile);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  console.log(`[PUT /admins/${params.id}] request body:`, JSON.stringify(body, null, 2));

  const updated = await updateAdmin(params.id, body);
  console.log(`[PUT /admins/${params.id}] response:`, JSON.stringify(updated, null, 2));

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteAdmin(params.id);
  const response = { success: true };
  console.log(`[DELETE /admins/${params.id}] response:`, JSON.stringify(response, null, 2));
  return NextResponse.json(response);
}