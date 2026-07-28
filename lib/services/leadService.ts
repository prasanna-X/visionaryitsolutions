import { supabaseAdmin } from '@/lib/supabase';

const TABLE = 'leads';

// Leads are never publicly readable — RLS is enabled on this table with
// no anon policies at all (see supabase/schema.sql). The public contact
// form hits /api/contact, which runs server-side and uses this service
// role client to insert, so no anon INSERT policy is needed either.
export async function getAllLeads() {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getLeadById(id: string) {
  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createLead(data: { name: string; phone?: string; message: string }) {
  const { data: lead, error } = await supabaseAdmin.from(TABLE).insert(data).select().single();
  if (error) throw error;
  return lead;
}

export async function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed') {
  const { data: lead, error } = await supabaseAdmin.from(TABLE).update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return lead;
}

export async function deleteLead(id: string) {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
