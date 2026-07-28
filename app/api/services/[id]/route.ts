import { NextResponse } from 'next/server';
import { getServiceById, updateService, deleteService } from '@/lib/services/serviceService';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(await getServiceById(id));
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  return NextResponse.json(await updateService(id, body));
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  await deleteService(id);
  return NextResponse.json({ success: true });
}