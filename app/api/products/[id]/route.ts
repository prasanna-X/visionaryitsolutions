import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/services/productService';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(await getProductById(id));
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  return NextResponse.json(await updateProduct(id, body));
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}