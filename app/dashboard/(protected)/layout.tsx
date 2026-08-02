import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/services/authService';
import Sidebar from '@/components/dashboard/layout/Sidebar';
import Topbar from '@/components/dashboard/layout/Topbar';
import { SidebarProvider } from '@/components/dashboard/layout/SidebarContext';
import { C } from '@/components/tokens';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/dashboard/login');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen" style={{ background: C.bg, color: C.ink }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar admin={admin} />
          <main className="p-8 flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}