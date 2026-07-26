'use client';

export default function Topbar({ admin }: { admin: { name: string; avatarUrl?: string } }) {
  return (
    <header>
      <span>{admin.name}</span>
      <button>Logout</button>
    </header>
  );
}
