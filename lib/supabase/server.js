import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Use inside Server Components / Route Handlers. Reads and (where possible)
// refreshes the auth session using the access token + refresh token stored
// in cookies by @supabase/ssr.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll can be called from a Server Component where cookies
            // can't be written — safe to ignore, middleware handles refresh.
          }
        },
      },
    },
  );
}
