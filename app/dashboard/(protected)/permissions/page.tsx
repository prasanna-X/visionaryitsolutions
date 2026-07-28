import PermissionTable from "@/components/dashboard/admins/permissions/PermissionTable";
import { getAllPermissions } from "@/lib/services/permissionService";

export default async function PermissionsPage() {
  const permissions = await getAllPermissions().catch(() => []);
  return <PermissionTable permissions={permissions} />;
}
