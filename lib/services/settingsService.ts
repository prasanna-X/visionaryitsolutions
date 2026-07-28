import { supabase, supabaseAdmin } from '@/lib/supabase';

const TABLE = 'settings';

// Public read — the settings row (site name, contact info) is readable
// via the anon key, in case any public page wants to render it dynamically.
export async function getSettings() {
  const { data, error } = await supabase.from(TABLE).select('*').limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

// Admin write — single-row table; create it on first save, update after.
export async function updateSettings(
  data: Partial<{ site_name: string; contact_email: string; phone: string; address: string; social_links: Record<string, string> }>
) {
  const { data: existing, error: fetchError } = await supabaseAdmin.from(TABLE).select('id').limit(1).maybeSingle();
  if (fetchError) throw fetchError;

  if (!existing) {
    const { data: created, error } = await supabaseAdmin.from(TABLE).insert(data).select().single();
    if (error) throw error;
    return created;
  }

  const { data: updated, error } = await supabaseAdmin.from(TABLE).update(data).eq('id', existing.id).select().single();
  if (error) throw error;
  return updated;
}
