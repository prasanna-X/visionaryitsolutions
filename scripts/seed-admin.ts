// Run with: npm run seed:admin
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error(
        "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in your environment."
    );
    process.exit(1);
}

interface AdminSeed {
    email: string;
    password: string;
    full_name: string;
    phone: string | null;
    role: string;
}

interface PermissionSeed {
    code: string;
    description: string;
}

interface RoleSeed {
    name: string;
    description: string;
    permissions: string[] | "*";
}

// Admin credentials — override via env vars or edit directly for a one-off run.
const ADMIN: AdminSeed = {
    email: process.env.SEED_ADMIN_EMAIL || "admin@visionaryitsolutions.com",
    password: process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!",
    full_name: process.env.SEED_ADMIN_NAME || "Super Admin",
    phone: process.env.SEED_ADMIN_PHONE || "9864482678",
    role: process.env.SEED_ADMIN_ROLE_COLUMN || "admin", // value written to admins.role (free-text column)
};

// Base permission set — extend as new admin features are built.
const PERMISSIONS: PermissionSeed[] = [
    { code: "manage_services", description: "Create, edit, and delete services" },
    { code: "manage_products", description: "Create, edit, and delete products" },
    { code: "manage_admins", description: "Create and manage admin accounts" },
    { code: "manage_roles", description: "Create and manage roles and permissions" },
    { code: "view_dashboard", description: "View the admin dashboard" },
];

// Roles to seed into admin_roles (RBAC tables). `permissions: "*"` grants everything above.
const ROLES: RoleSeed[] = [
    { name: "super_admin", description: "Full access to all admin features", permissions: "*" },
    {
        name: "editor",
        description: "Can manage content but not admins or roles",
        permissions: ["manage_services", "manage_products", "view_dashboard"],
    },
    {
        name: "viewer",
        description: "Read-only access to the dashboard",
        permissions: ["view_dashboard"],
    },
];

// RBAC role (admin_roles.name) to assign to the seeded admin.
const SEED_ADMIN_RBAC_ROLE = "super_admin";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function seedAdmin(): Promise<void> {
    console.log(`Seeding admin user: ${ADMIN.email}`);

    // 1. Create/find the auth.users row — this is Supabase Auth's own record,
    //    and also satisfies admins.id's FK. Passwords + sessions are both
    //    owned by Supabase Auth now (see authService.ts's signInWithPassword).
    const userId = await ensureAuthUser();

    // 2. Write the profile fields into admins (no password_hash — Supabase Auth owns that).
    await upsertAdminProfile(userId);

    console.log("\nSeeding permissions…");
    const permissionMap = await seedPermissions();

    console.log("Seeding roles…");
    const roleMap = await seedRoles();

    console.log("Linking role permissions…");
    await seedRolePermissions(roleMap, permissionMap);

    console.log(`Assigning role "${SEED_ADMIN_RBAC_ROLE}" to seeded admin…`);
    await assignRole(userId, roleMap);

    console.log("\n✅ Admin + RBAC seeded successfully:");
    console.log(`   email: ${ADMIN.email}`);
    console.log(`   password: ${ADMIN.password}`);
    console.log(`   user id: ${userId}`);
    console.log(`   admins.role: ${ADMIN.role}`);
    console.log(`   rbac role: ${SEED_ADMIN_RBAC_ROLE}`);
    console.log("\n⚠️  Change this password after first login.");
}

async function ensureAuthUser(): Promise<string> {
    const { data: userData, error: userError } =
        await supabase.auth.admin.createUser({
            email: ADMIN.email,
            password: ADMIN.password,
            email_confirm: true,
        });

    if (!userError) return userData.user.id;

    if (userError.message?.toLowerCase().includes("already been registered")) {
        console.log("Auth user already exists — looking it up…");
        const { data: list, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) throw listError;

        const existing = list.users.find((u) => u.email === ADMIN.email);
        if (!existing) throw new Error("Could not find existing user by email.");
        return existing.id;
    }

    throw userError;
}

async function upsertAdminProfile(userId: string): Promise<void> {
    const { error } = await supabase.from("admins").upsert(
        {
            id: userId,
            email: ADMIN.email,
            name: ADMIN.full_name,
            full_name: ADMIN.full_name,
            phone: ADMIN.phone,
            role: ADMIN.role,
            is_active: true,
        },
        { onConflict: "id" }
    );
    if (error) throw error;
}

async function seedPermissions(): Promise<Record<string, string>> {
    const { data, error } = await supabase
        .from("admin_permissions")
        .upsert(
            PERMISSIONS.map(({ code, description }) => ({ code, description })),
            { onConflict: "code" }
        )
        .select("id, code");

    if (error) throw error;

    return Object.fromEntries(data.map((p) => [p.code, p.id]));
}

async function seedRoles(): Promise<Record<string, string>> {
    const { data, error } = await supabase
        .from("admin_roles")
        .upsert(
            ROLES.map(({ name, description }) => ({ name, description })),
            { onConflict: "name" }
        )
        .select("id, name");

    if (error) throw error;

    return Object.fromEntries(data.map((r) => [r.name, r.id]));
}

async function seedRolePermissions(
    roleMap: Record<string, string>,
    permissionMap: Record<string, string>
): Promise<void> {
    const rows = ROLES.flatMap((role) => {
        const roleId = roleMap[role.name];
        const perms =
            role.permissions === "*" ? Object.keys(permissionMap) : role.permissions;

        return perms.map((code) => ({
            role_id: roleId,
            permission_id: permissionMap[code],
        }));
    });

    const { error } = await supabase
        .from("admin_role_permissions")
        .upsert(rows, { onConflict: "role_id,permission_id" });

    if (error) throw error;
}

async function assignRole(
    userId: string,
    roleMap: Record<string, string>
): Promise<void> {
    const roleId = roleMap[SEED_ADMIN_RBAC_ROLE];
    if (!roleId) throw new Error(`Role "${SEED_ADMIN_RBAC_ROLE}" was not seeded.`);

    const { error } = await supabase
        .from("admin_role_assignments")
        .upsert(
            { admin_id: userId, role_id: roleId },
            { onConflict: "admin_id,role_id" }
        );

    if (error) throw error;
}

seedAdmin().catch((err) => {
    console.error("❌ Failed to seed admin:", err instanceof Error ? err.message : err);
    process.exit(1);
});