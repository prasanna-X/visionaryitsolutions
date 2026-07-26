import { NextResponse } from 'next/server';
import { getServiceById, updateService, deleteService } from '@/lib/services/serviceService';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await getServiceById(params.id));
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json(await updateService(params.id, body));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteService(params.id);
  return NextResponse.json({ success: true });
}
