import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/services/authService';
import Sidebar from '@/components/dashboard/layout/Sidebar';
import Topbar from '@/components/dashboard/layout/Topbar';
import { C } from '@/components/tokens';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/dashboard/login');

  return (
    <div className="flex min-h-screen" style={{ background: C.bg, color: C.ink }}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar admin={admin} />
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
