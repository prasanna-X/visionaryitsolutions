import { NextRequest, NextResponse } from 'next/server';
import { getPermissionById, updatePermission, deletePermission } from '@/lib/services/permissionService';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const permission = await getPermissionById(id);
    if (!permission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(permission);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const permission = await updatePermission(id, body);
    return NextResponse.json(permission);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await deletePermission(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}