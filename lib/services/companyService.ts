import { supabase, supabaseAdmin } from '@/lib/supabase';
import type { CompanyDetails, CompanyDetailsInput } from '@/types/company';

const TABLE = 'company_details';

// Public read — used across the live site (footer, contact page, etc.)
export async function getCompanyDetails(): Promise<CompanyDetails | null> {
    const { data, error } = await supabase.from(TABLE).select('*').maybeSingle();
    if (error) throw error;
    return data;
}

// Admin read — used by the dashboard (service role key, bypasses RLS)
export async function getCompanyDetailsAdmin(): Promise<CompanyDetails | null> {
    const { data, error } = await supabaseAdmin.from(TABLE).select('*').maybeSingle();
    if (error) throw error;
    return data;
}

// Upsert — table is a singleton (unique index in the DB), so we update the
// existing row if one exists, or insert the first one if the table is empty.
export async function saveCompanyDetails(input: CompanyDetailsInput): Promise<CompanyDetails> {
    const existing = await getCompanyDetailsAdmin();

    if (existing) {
        const { data, error } = await supabaseAdmin
            .from(TABLE)
            .update(input)
            .eq('id', existing.id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    const { data, error } = await supabaseAdmin
        .from(TABLE)
        .insert(input)
        .select()
        .single();
    if (error) throw error;
    return data;
}