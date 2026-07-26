import { NextResponse } from 'next/server';
import { getTeamMemberById, updateTeamMember, deleteTeamMember } from '@/lib/services/teamMemberService';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await getTeamMemberById(params.id));
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json(await updateTeamMember(params.id, body));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteTeamMember(params.id);
  return NextResponse.json({ success: true });
}
