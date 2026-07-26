import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/services/authService';
import Sidebar from '@/components/dashboard/layout/Sidebar';
import Topbar from '@/components/dashboard/layout/Topbar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/dashboard/login');

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar admin={admin} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
