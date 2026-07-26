import { supabase, supabaseAdmin } from '@/lib/supabase';
import type { Product, ProductInput } from '@/types/product';

const TABLE = 'products';

// Public read — used by the /products page (anon key, respects RLS).
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('order', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// Admin writes — used by the dashboard CRUD (service role key, bypasses RLS).
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const { data, error } = await supabaseAdmin.from(TABLE).insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<Product> {
  const { data, error } = await supabaseAdmin.from(TABLE).update(input).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
