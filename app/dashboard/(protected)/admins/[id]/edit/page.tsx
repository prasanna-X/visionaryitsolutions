// "/dashboard/admins/:id/edit"
import AdminForm from '@/components/dashboard/admins/AdminForm';
import { getAdminById } from '@/lib/services/adminService';

export default async function EditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await getAdminById(id);
  return <AdminForm admin={admin} />;
}
