import RoleForm from "@/components/dashboard/admins/roles/RoleForm";
import { getAllPermissions } from "@/lib/services/permissionService";

export default async function NewRolePage() {
  const allPermissions = await getAllPermissions().catch(() => []);
  return <RoleForm allPermissions={allPermissions} />;
}
