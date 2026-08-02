import { NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/services/productService';

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/[id] failed:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();
    const product = await updateProduct(id, body);
    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT /api/products/[id] failed:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();

    // Only allow known-safe fields to be updated this way
    const allowed = ["status", "display_order", "title", "category", "slug", "logo", "icon"];
    const input = Object.fromEntries(
      Object.entries(body).filter(([key]) => allowed.includes(key))
    );

    if (Object.keys(input).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const product = await updateProduct(id, input);
    return NextResponse.json(product);
  } catch (error) {
    console.error("PATCH /api/products/[id] failed:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  try {
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] failed:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}