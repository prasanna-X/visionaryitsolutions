import { supabaseAdmin } from '@/lib/supabase';

const TABLE = 'admin_roles';

export async function getAllRoles() {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select('id, name, description, created_at')
    .order('name', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getRoleById(id: string) {
  const { data: role, error } = await supabaseAdmin
    .from(TABLE)
    .select('id, name, description, created_at')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!role) return null;

  const { data: links, error: linkError } = await supabaseAdmin
    .from('admin_role_permissions')
    .select('permission_id')
    .eq('role_id', id);

  if (linkError) throw linkError;

  return { ...role, permission_ids: (links ?? []).map((l) => l.permission_id) };
}

export async function createRole(data: {
  name: string;
  description?: string;
  permission_ids?: string[];
}) {
  const { data: role, error } = await supabaseAdmin
    .from(TABLE)
    .insert({ name: data.name, description: data.description ?? null })
    .select('id, name, description, created_at')
    .single();

  if (error) throw error;

  if (data.permission_ids?.length) {
    await setRolePermissions(role.id, data.permission_ids);
  }

  return role;
}

export async function updateRole(
  id: string,
  data: Partial<{ name: string; description: string; permission_ids: string[] }>
) {
  const { name, description, permission_ids } = data;
  const patch: Record<string, unknown> = {};
  if (name !== undefined) patch.name = name;
  if (description !== undefined) patch.description = description;

  if (Object.keys(patch).length) {
    const { error } = await supabaseAdmin.from(TABLE).update(patch).eq('id', id);
    if (error) throw error;
  }

  if (permission_ids !== undefined) {
    await setRolePermissions(id, permission_ids);
  }

  const { data: role, error: fetchError } = await supabaseAdmin
    .from(TABLE)
    .select('id, name, description, created_at')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;
  return role;
}

export async function deleteRole(id: string) {
  const { error: assignmentError } = await supabaseAdmin
    .from('admin_role_assignments')
    .delete()
    .eq('role_id', id);
  if (assignmentError) throw assignmentError;

  const { error: junctionError } = await supabaseAdmin
    .from('admin_role_permissions')
    .delete()
    .eq('role_id', id);
  if (junctionError) throw junctionError;

  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

// Replaces a role's full permission set with the given list.
async function setRolePermissions(roleId: string, permissionIds: string[]) {
  const { error: deleteError } = await supabaseAdmin
    .from('admin_role_permissions')
    .delete()
    .eq('role_id', roleId);
  if (deleteError) throw deleteError;

  if (!permissionIds.length) return;

  const { error: insertError } = await supabaseAdmin
    .from('admin_role_permissions')
    .insert(permissionIds.map((permission_id) => ({ role_id: roleId, permission_id })));
  if (insertError) throw insertError;
}
