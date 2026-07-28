import PermissionForm from "@/components/dashboard/admins/permissions/PermissionForm";
import { getPermissionById } from "@/lib/services/permissionService";
import { notFound } from "next/navigation";

export default async function EditPermissionPage({ params }: { params: { id: string } }) {
  const permission = await getPermissionById(params.id);
  if (!permission) notFound();
  return <PermissionForm permission={permission} />;
}
