import Link from 'next/link';

const navItems = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'My Profile', href: '/dashboard/profile' },
  { label: 'Admins', href: '/dashboard/admins' },
  { label: 'Services', href: '/dashboard/services' },
  { label: 'Projects', href: '/dashboard/projects' },
  { label: 'Team Members', href: '/dashboard/team-members' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  return (
    <aside>
      <ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
