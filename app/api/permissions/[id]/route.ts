import { NextRequest, NextResponse } from 'next/server';
import { getPermissionById, updatePermission, deletePermission } from '@/lib/services/permissionService';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const permission = await getPermissionById(params.id);
    if (!permission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(permission);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const permission = await updatePermission(params.id, body);
    return NextResponse.json(permission);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deletePermission(params.id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
