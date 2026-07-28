import { supabaseAdmin } from '@/lib/supabase';
import { createSupabaseServerClient, getSessionUser } from '@/lib/auth';

const TABLE = 'admins';

export async function login(email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error('Invalid email or password');

  const { data: admin, error: adminError } = await supabaseAdmin
    .from(TABLE)
    .select('*')
    .eq('id', data.user.id)
    .maybeSingle();

  if (adminError) throw adminError;
  if (!admin) throw new Error('Invalid email or password');

  return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}

export async function getCurrentAdmin() {
  const user = await getSessionUser();
  if (!user) return null;

  const { data: admin, error } = await supabaseAdmin
    .from(TABLE)
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error || !admin) return null;

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    is_active: admin.is_active,
    role: admin.role,
    avatar_url: admin.avatar_url,
    created_at: admin.created_at,
    updated_at: admin.updated_at,

  };
}