import { supabaseAdmin } from '@/lib/supabase';

export interface DashboardStats {
    admins: { total: number; active: number };
    contactSubmissions: { total: number; new: number };
    services: { total: number };
    products: { total: number; published: number };
}

export interface RecentActivity {
    id: string;
    action: string;
    description: string | null;
    created_at: string;
    admin_name: string | null;
}

export interface RecentSubmission {
    id: string;
    name: string;
    email: string | null;
    message: string;
    status: string;
    created_at: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const [
        adminsTotal,
        adminsActive,
        submissionsTotal,
        submissionsNew,
        servicesTotal,
        productsTotal,
        productsPublished,
    ] = await Promise.all([
        supabaseAdmin.from('admins').select('id', { count: 'exact', head: true }),
        supabaseAdmin.from('admins').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabaseAdmin.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabaseAdmin.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabaseAdmin.from('services').select('id', { count: 'exact', head: true }),
        supabaseAdmin.from('products').select('id', { count: 'exact', head: true }),
        supabaseAdmin.from('products').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    ]);

    for (const [label, res] of Object.entries({
        adminsTotal, adminsActive, submissionsTotal, submissionsNew, servicesTotal, productsTotal, productsPublished,
    })) {
        if (res.error) {
            console.error(`[getDashboardStats] ${label} error:`, res.error);
            throw res.error;
        }
    }

    return {
        admins: { total: adminsTotal.count ?? 0, active: adminsActive.count ?? 0 },
        contactSubmissions: { total: submissionsTotal.count ?? 0, new: submissionsNew.count ?? 0 },
        services: { total: servicesTotal.count ?? 0 },
        products: { total: productsTotal.count ?? 0, published: productsPublished.count ?? 0 },
    };
}

export async function getRecentActivity(limit = 6): Promise<RecentActivity[]> {
    const { data, error } = await supabaseAdmin
        .from('activity_log')
        .select('id, action, description, created_at, admins(name)')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;

    return (data ?? []).map((row: any) => ({
        id: row.id,
        action: row.action,
        description: row.description,
        created_at: row.created_at,
        admin_name: row.admins?.name ?? null,
    }));
}

export async function getRecentSubmissions(limit = 5): Promise<RecentSubmission[]> {
    const { data, error } = await supabaseAdmin
        .from('contact_submissions')
        .select('id, name, email, message, status, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data ?? [];
}