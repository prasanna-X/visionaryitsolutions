import { NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/lib/services/projectService';

export async function GET() {
  return NextResponse.json(await getAllProjects());
}

export async function POST(request: Request) {
  const body = await request.json();
  const project = await createProject(body);
  return NextResponse.json(project, { status: 201 });
}
