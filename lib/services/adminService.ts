import { supabaseAdmin } from '@/lib/supabase';

const TABLE = 'admins';
const SELECT_FIELDS = 'id, name, email, phone, role, avatar_url, is_active, created_at, updated_at';

export async function getAllAdmins() {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select(SELECT_FIELDS)
    .order('created_at', { ascending: false });

  console.log(`[getAllAdmins]`, JSON.stringify({ data, error }, null, 2));

  if (error) throw error;
  return data ?? [];
}

export async function getAdminById(id: string) {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select(SELECT_FIELDS)
    .eq('id', id)
    .maybeSingle();

  console.log(`[getAdminById:${id}]`, JSON.stringify({ data, error }, null, 2));
  if (error) throw error;
  return data;
}

export async function createAdmin(
  data: { name: string; email: string; password: string; role?: string; phone?: string },
  actorId?: string
) {
  // 1. Create the Supabase Auth user
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  });

  if (authError) throw authError;

  // 2. Insert the matching profile row
  const { data: admin, error } = await supabaseAdmin
    .from(TABLE)
    .insert({
      id: authData.user.id,
      name: data.name,
      email: data.email,
      role: data.role ?? 'admin',
      phone: data.phone ?? null,
    })
    .select(SELECT_FIELDS)
    .single();

  if (error) {
    // Roll back the auth user if the profile insert fails
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    throw error;
  }

  await logActivity({
    actorId,
    action: 'admin_created',
    entityId: admin.id,
    description: `Admin "${admin.name}" (${admin.email}) created`,
    metadata: { role: admin.role },
  });

  return admin;
}

export async function updateAdmin(
  id: string,
  data: Partial<{ name: string; email: string; role: string; avatar_url: string; phone: string }>,
  actorId?: string
) {
  if (data.email) {
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(id, {
      email: data.email,
    });
    if (authError) {
      console.error(`[updateAdmin:${id}] auth.updateUserById error:`, JSON.stringify(authError, null, 2));
      throw authError;
    }
  }

  const { data: admin, error } = await supabaseAdmin
    .from(TABLE)
    .update(data)
    .eq('id', id)
    .select(SELECT_FIELDS)
    .single();

  console.log(`[updateAdmin:${id}] result:`, JSON.stringify({ admin, error }, null, 2));

  if (error) throw error;

  await logActivity({
    actorId,
    action: 'admin_updated',
    entityId: id,
    description: `Admin "${admin.name}" profile updated`,
    metadata: data,
  });

  return admin;
}

export async function deleteAdmin(id: string, actorId?: string) {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
  if (error) throw error;

  // Also remove the auth.users row — otherwise you'd have a dangling auth
  // account with no admin profile, still able to authenticate.
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (authError) throw authError;

  await logActivity({
    actorId,
    action: 'admin_deleted',
    entityId: id,
    description: 'Admin account and profile deleted',
  });
}

// Best-effort audit trail. Logging failures never block the underlying
// mutation — activity_log is an observability aid, not a source of truth.
async function logActivity(entry: {
  actorId?: string;
  action: string;
  entityId: string;
  description: string;
  metadata?: Record<string, unknown>;
}) {
  const { error } = await supabaseAdmin.from('activity_log').insert({
    admin_id: entry.actorId ?? null,
    action: entry.action,
    entity_type: 'admin',
    entity_id: entry.entityId,
    description: entry.description,
    metadata: entry.metadata ?? {},
  });

  if (error) {
    console.error('activity_log insert failed:', error);
  }
}