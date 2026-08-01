import { supabase, supabaseAdmin } from '@/lib/supabase';

const TABLE = 'services';

export async function getAllServices() {
  console.log('[services] getAllServices: fetching all services');

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('sort_order', { ascending: true }); // was 'display_order'

  if (error) {
    console.log('[services] getAllServices: error', error);
    throw error;
  }

  console.log('[services] getAllServices: success, count =', data?.length ?? 0);
  return data ?? [];
}

export async function getServiceBySlug(slug: string) {
  console.log('[services] getServiceBySlug: slug =', slug);

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.log('[services] getServiceBySlug: error', error);
    throw error;
  }

  console.log('[services] getServiceBySlug: result =', data);
  return data;
}

export async function getServiceById(id: string) {
  console.log('[services] getServiceById: id =', id);

  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle();

  if (error) {
    console.log('[services] getServiceById: error', error);
    throw error;
  }

  console.log('[services] getServiceById: result =', data);
  return data;
}

export async function createService(data: {
  slug: string;
  title: string;
  description: string;
  icon: string;        // NOT NULL in schema, no default — required
  sort_order?: number;  // was 'summary' (doesn't exist)
}) {
  console.log('[services] createService: payload =', data);

  const { data: service, error } = await supabaseAdmin.from(TABLE).insert(data).select().single();

  if (error) {
    console.log('[services] createService: error', error);
    throw error;
  }

  console.log('[services] createService: created =', service);
  return service;
}

export async function updateService(
  id: string,
  data: Partial<{ slug: string; title: string; description: string; icon: string; sort_order: number }>
) {
  console.log('[services] updateService: id =', id, 'payload =', data);

  const { data: service, error } = await supabaseAdmin.from(TABLE).update(data).eq('id', id).select().single();

  if (error) {
    console.log('[services] updateService: error', error);
    throw error;
  }

  console.log('[services] updateService: updated =', service);
  return service;
}

export async function deleteService(id: string) {
  console.log('[services] deleteService: id =', id);

  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);

  if (error) {
    console.log('[services] deleteService: error', error);
    throw error;
  }

  console.log('[services] deleteService: deleted successfully');
}