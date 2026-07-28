// "/dashboard" - overview/stats
import {
  Users,
  UserCheck,
  Mail,
  MailPlus,
  Wrench,
  Package,
  PackageCheck,
  Activity,
  Inbox,
  CheckCircle2,
  PhoneCall,
  CircleDot,
} from 'lucide-react';
import {
  getDashboardStats,
  getRecentActivity,
  getRecentSubmissions,
} from '@/lib/services/dashboardService';

function timeAgo(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
}: {
  label: string;
  value: number;
  sublabel?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
        <Icon className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
      </div>
      <p className="mt-2 text-3xl font-semibold text-neutral-100">{value}</p>
      {sublabel ? <p className="mt-1 text-xs text-neutral-500">{sublabel}</p> : null}
    </div>
  );
}

const submissionStatusIcon: Record<string, React.ElementType> = {
  new: MailPlus,
  contacted: PhoneCall,
  closed: CheckCircle2,
};

export default async function DashboardOverviewPage() {
  const [stats, activity, submissions] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(6),
    getRecentSubmissions(5),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Admins"
          value={stats.admins.total}
          sublabel={`${stats.admins.active} active`}
          icon={Users}
        />
        <StatCard
          label="Contact Submissions"
          value={stats.contactSubmissions.total}
          sublabel={`${stats.contactSubmissions.new} new`}
          icon={Mail}
        />
        <StatCard label="Services" value={stats.services.total} icon={Wrench} />
        <StatCard
          label="Products"
          value={stats.products.total}
          sublabel={`${stats.products.published} published`}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
          <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-neutral-400">
            <Activity className="h-4 w-4" strokeWidth={1.75} />
            Recent Activity
          </h2>
          <ul className="mt-4 space-y-4">
            {activity.length === 0 ? (
              <li className="flex items-center gap-2 text-sm text-neutral-500">
                <CircleDot className="h-4 w-4" strokeWidth={1.75} />
                No recent activity.
              </li>
            ) : (
              activity.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
                  <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" strokeWidth={1.75} />
                  <div className="min-w-0">
                    <p className="text-sm text-neutral-200">
                      {item.description ?? item.action}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {item.admin_name ?? 'System'} &middot; {timeAgo(item.created_at)}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5">
          <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-neutral-400">
            <Inbox className="h-4 w-4" strokeWidth={1.75} />
            Recent Submissions
          </h2>
          <ul className="mt-4 space-y-4">
            {submissions.length === 0 ? (
              <li className="flex items-center gap-2 text-sm text-neutral-500">
                <CircleDot className="h-4 w-4" strokeWidth={1.75} />
                No submissions yet.
              </li>
            ) : (
              submissions.map((item) => {
                const StatusIcon = submissionStatusIcon[item.status] ?? MailPlus;
                return (
                  <li key={item.id} className="border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-neutral-200">{item.name}</p>
                      <span
                        className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs capitalize ${item.status === 'new'
                            ? 'bg-green-500/10 text-green-400'
                            : item.status === 'contacted'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-neutral-500/10 text-neutral-400'
                          }`}
                      >
                        <StatusIcon className="h-3 w-3" strokeWidth={2} />
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-neutral-500">{item.message}</p>
                    <p className="mt-1 text-xs text-neutral-600">{timeAgo(item.created_at)}</p>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}