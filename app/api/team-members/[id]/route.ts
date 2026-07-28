import { NextResponse } from 'next/server';
import { getTeamMemberById, updateTeamMember, deleteTeamMember } from '@/lib/services/teamMemberService';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(await getTeamMemberById(id));
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  return NextResponse.json(await updateTeamMember(id, body));
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  await deleteTeamMember(id);
  return NextResponse.json({ success: true });
}