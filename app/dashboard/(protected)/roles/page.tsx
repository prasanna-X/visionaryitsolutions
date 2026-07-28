import RoleTable from "@/components/dashboard/admins/roles/RoleTable";
import { getAllRoles } from "@/lib/services/roleService";

export default async function RolesPage() {
  const roles = await getAllRoles().catch(() => []);
  return <RoleTable roles={roles} />;
}
