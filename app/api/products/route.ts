import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/services/productService';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products failed:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await createProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products failed:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}