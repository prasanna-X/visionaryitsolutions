import { NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject } from '@/lib/services/projectService';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await getProjectById(params.id));
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json(await updateProject(params.id, body));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteProject(params.id);
  return NextResponse.json({ success: true });
}
