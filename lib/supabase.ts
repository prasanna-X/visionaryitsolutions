import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const anonKey = process.env.SUPABASE_ANON_KEY as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl) {
  console.warn('SUPABASE_URL is not set — the app has no database until this is configured in .env.local.');
}

// Read-only client, safe to use in Server Components and API routes for
// public reads (uses the anon key, respects Row Level Security policies).
export const supabase: SupabaseClient = createClient(supabaseUrl, anonKey, {
  auth: { persistSession: false },
});

// Elevated client for server-side writes (dashboard CRUD). Uses the
// service role key, which bypasses RLS — NEVER import this file into a
// "use client" component or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
export const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, serviceRoleKey || anonKey, {
  auth: { persistSession: false },
});
