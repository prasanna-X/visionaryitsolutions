import RoleForm from "@/components/dashboard/admins/roles/RoleForm";
import { getRoleById } from "@/lib/services/roleService";
import { getAllPermissions } from "@/lib/services/permissionService";
import { notFound } from "next/navigation";

export default async function EditRolePage({ params }: { params: { id: string } }) {
  const [role, allPermissions] = await Promise.all([
    getRoleById(params.id),
    getAllPermissions().catch(() => []),
  ]);
  if (!role) notFound();
  return <RoleForm role={role} allPermissions={allPermissions} />;
}
