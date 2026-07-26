import { NextResponse } from 'next/server';
import { getAllTeamMembers, createTeamMember } from '@/lib/services/teamMemberService';

export async function GET() {
  return NextResponse.json(await getAllTeamMembers());
}

export async function POST(request: Request) {
  const body = await request.json();
  const member = await createTeamMember(body);
  return NextResponse.json(member, { status: 201 });
}
