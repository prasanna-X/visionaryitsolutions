import { supabase, supabaseAdmin } from '@/lib/supabase';

const TABLE = 'team_members';

// Public read — used by /team (anon key, respects RLS).
export async function getAllTeamMembers() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// Admin writes — used by the dashboard CRUD (service role key, bypasses RLS).
export async function getTeamMemberById(id: string) {
  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createTeamMember(data: { name: string; role: string; bio?: string; photo_url?: string; linkedin?: string }) {
  const { data: member, error } = await supabaseAdmin.from(TABLE).insert(data).select().single();
  if (error) throw error;
  return member;
}

export async function updateTeamMember(
  id: string,
  data: Partial<{ name: string; role: string; bio: string; photo_url: string; linkedin: string }>
) {
  const { data: member, error } = await supabaseAdmin.from(TABLE).update(data).eq('id', id).select().single();
  if (error) throw error;
  return member;
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
