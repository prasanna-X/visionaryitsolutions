import { supabase, supabaseAdmin } from '@/lib/supabase';
import type { ContactSubmission, ContactSubmissionInput, ContactStatus } from '@/types/contact';

const TABLE = 'contact_submissions';

export async function createContactSubmission(
    input: ContactSubmissionInput
): Promise<ContactSubmission> {
    const payload = {
        name: input.name.trim(),
        phone: input.phone.trim(),
        email: input.email?.trim() || null,
        organization: input.organization?.trim() || null,
        it_solutions: input.it_solutions.trim(),
        message: input.message.trim(),
        status: 'new' as ContactStatus,
    };

    const { data, error } = await supabaseAdmin
        .from(TABLE)
        .insert(payload)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Admin read — used by the dashboard (service role key, bypasses RLS).
export async function getAllContactSubmissionsAdmin(): Promise<ContactSubmission[]> {
    const { data, error } = await supabaseAdmin
        .from(TABLE)
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
}

export async function getContactSubmissionById(id: string): Promise<ContactSubmission | null> {
    const { data, error } = await supabaseAdmin
        .from(TABLE)
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) throw error;
    return data;
}

export async function updateContactSubmissionStatus(
    id: string,
    status: ContactStatus
): Promise<ContactSubmission> {
    const { data, error } = await supabaseAdmin
        .from(TABLE)
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteContactSubmission(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', id);
    if (error) throw error;
}