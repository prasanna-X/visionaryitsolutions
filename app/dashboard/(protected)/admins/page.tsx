// "/dashboard/admins" - list (super_admin only)
import { getAllAdmins } from '@/lib/services/adminService';
import AdminTable from '@/components/dashboard/admins/AdminTable';

export default async function AdminsListPage() {
  const admins = await getAllAdmins();
  return <AdminTable admins={admins} />;
}
