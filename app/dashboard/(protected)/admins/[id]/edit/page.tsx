// "/dashboard/admins/:id/edit"
import AdminForm from '@/components/dashboard/admins/AdminForm';
import { getAdminById } from '@/lib/services/adminService';

export default async function EditAdminPage({ params }: { params: { id: string } }) {
  const admin = await getAdminById(params.id);
  return <AdminForm admin={admin} />;
}
