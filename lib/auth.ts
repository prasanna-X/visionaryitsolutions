import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Wraps Supabase's server client so route handlers/server components can
// read the current session from cookies without repeating this setup.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          ),
      },
    }
  );
}

// Returns the authenticated Supabase user for the current request, or null.
export async function getSessionUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}