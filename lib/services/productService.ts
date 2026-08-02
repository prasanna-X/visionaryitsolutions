import { supabase, supabaseAdmin } from '@/lib/supabase';
import type { Product, ProductInput } from '@/types/product';

const TABLE = 'products';

// Public read — used by the /products page (anon key, respects RLS).
export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('[getAllProducts] Failed to fetch products:', err);
    throw new Error('Failed to fetch products');
  }
}

// Admin read — used by the dashboard (service role key, bypasses RLS).
export async function getAllProductsAdmin(): Promise<Product[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('[getAllProductsAdmin] Failed to fetch products:', err);
    throw new Error('Failed to fetch products (admin)');
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error(`[getProductBySlug] Failed to fetch product with slug "${slug}":`, err);
    throw new Error('Failed to fetch product');
  }
}

// Admin writes — used by the dashboard CRUD (service role key, bypasses RLS).
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error(`[getProductById] Failed to fetch product with id "${id}":`, err);
    throw new Error('Failed to fetch product');
  }
}

export async function createProduct(input: ProductInput): Promise<Product> {
  try {
    const { data, error } = await supabaseAdmin.from(TABLE).insert(input).select().single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('[createProduct] Failed to create product:', err);
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  try {
    const { data, error } = await supabaseAdmin.from(TABLE).update(input).eq('id', id).select().single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error(`[updateProduct] Failed to update product with id "${id}":`, err);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
    if (error) throw error;
  } catch (err) {
    console.error(`[deleteProduct] Failed to delete product with id "${id}":`, err);
    throw new Error('Failed to delete product');
  }
}