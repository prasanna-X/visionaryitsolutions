import { NextRequest, NextResponse } from 'next/server';
import { getAllPermissions, createPermission } from '@/lib/services/permissionService';

export async function GET() {
  try {
    const permissions = await getAllPermissions();
    return NextResponse.json(permissions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const permission = await createPermission(body);
    return NextResponse.json(permission, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
