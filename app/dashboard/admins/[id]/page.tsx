// "/dashboard/admins/:id" - view
import { getAdminById } from '@/lib/services/adminService';

export default async function AdminDetailPage({ params }: { params: { id: string } }) {
  const admin = await getAdminById(params.id);
  return <div>{admin?.name}</div>;
}
