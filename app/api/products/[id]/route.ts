import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/services/productService';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(await getProductById(params.id));
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json(await updateProduct(params.id, body));
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteProduct(params.id);
  return NextResponse.json({ success: true });
}
