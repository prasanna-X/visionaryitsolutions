import { NextRequest, NextResponse } from 'next/server';
import { getAdminById, updateAdmin, deleteAdmin } from '@/lib/services/adminService';

async function getCurrentUserId(req: NextRequest): Promise<string | null> {
  throw new Error('getCurrentUserId not implemented — wire up your auth method here');
}

export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await getAdminById(userId);
  console.log(`[GET /profile] response:`, JSON.stringify(profile, null, 2));

  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const userId = await getCurrentUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  console.log(`[PUT /profile] request body:`, JSON.stringify(body, null, 2));

  const updated = await updateAdmin(userId, body);
  console.log(`[PUT /profile] response:`, JSON.stringify(updated, null, 2));

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const userId = await getCurrentUserId(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await deleteAdmin(userId);
  const response = { success: true };
  console.log(`[DELETE /profile] response:`, JSON.stringify(response, null, 2));
  return NextResponse.json(response);
}