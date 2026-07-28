import { supabase, supabaseAdmin } from '@/lib/supabase';

const TABLE = 'services';

export async function getAllServices() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('sort_order', { ascending: true }); // was 'display_order'

  if (error) throw error;
  return data ?? [];
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getServiceById(id: string) {
  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createService(data: {
  slug: string;
  title: string;
  description: string;
  icon: string;        // NOT NULL in schema, no default — required
  sort_order?: number;  // was 'summary' (doesn't exist)
}) {
  const { data: service, error } = await supabaseAdmin.from(TABLE).insert(data).select().single();
  if (error) throw error;
  return service;
}

export async function updateService(
  id: string,
  data: Partial<{ slug: string; title: string; description: string; icon: string; sort_order: number }>
) {
  const { data: service, error } = await supabaseAdmin.from(TABLE).update(data).eq('id', id).select().single();
  if (error) throw error;
  return service;
}

export async function deleteService(id: string) {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}