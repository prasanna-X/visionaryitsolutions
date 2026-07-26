import { NextResponse } from 'next/server';
import { getAllServices, createService } from '@/lib/services/serviceService';

export async function GET() {
  return NextResponse.json(await getAllServices());
}

export async function POST(request: Request) {
  const body = await request.json();
  const service = await createService(body);
  return NextResponse.json(service, { status: 201 });
}
