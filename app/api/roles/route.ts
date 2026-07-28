import { NextRequest, NextResponse } from 'next/server';
import { getAllRoles, createRole } from '@/lib/services/roleService';

export async function GET() {
  try {
    const roles = await getAllRoles();
    return NextResponse.json(roles);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const role = await createRole(body);
    return NextResponse.json(role, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
