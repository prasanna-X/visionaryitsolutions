import { supabaseAdmin } from '@/lib/supabase';

const TABLE = 'admin_permissions';

export async function getAllPermissions() {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select('id, code, description, created_at')
    .order('code', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getPermissionById(id: string) {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select('id, code, description, created_at')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createPermission(data: { code: string; description?: string }) {
  const { data: permission, error } = await supabaseAdmin
    .from(TABLE)
    .insert({ code: data.code, description: data.description ?? null })
    .select('id, code, description, created_at')
    .single();

  if (error) throw error;
  return permission;
}

export async function updatePermission(
  id: string,
  data: Partial<{ code: string; description: string }>
) {
  const { data: permission, error } = await supabaseAdmin
    .from(TABLE)
    .update(data)
    .eq('id', id)
    .select('id, code, description, created_at')
    .single();

  if (error) throw error;
  return permission;
}

export async function deletePermission(id: string) {
  // Clear junction rows first — admin_role_permissions has no ON DELETE
  // CASCADE in the schema, so this FK would otherwise block the delete.
  const { error: junctionError } = await supabaseAdmin
    .from('admin_role_permissions')
    .delete()
    .eq('permission_id', id);
  if (junctionError) throw junctionError;

  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
