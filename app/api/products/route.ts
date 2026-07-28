import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/services/productService';

export async function GET() {
  return NextResponse.json(await getAllProducts());

}

export async function POST(request: Request) {
  const body = await request.json();
  const Product = await createProduct(body);
  return NextResponse.json(Product, { status: 201 });
}
