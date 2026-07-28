import { NextRequest, NextResponse } from 'next/server';
import { getRoleById, updateRole, deleteRole } from '@/lib/services/roleService';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const role = await getRoleById(params.id);
    if (!role) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(role);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const role = await updateRole(params.id, body);
    return NextResponse.json(role);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteRole(params.id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
