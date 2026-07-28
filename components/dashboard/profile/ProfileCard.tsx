import Link from "next/link";
import type { Admin } from "@/types/admin";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(value?: string) {
  if (!value) return "Unknown";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "Unknown" : d.toLocaleDateString();
}

export default function ProfileCard({ admin }: { admin: Admin }) {
  return (
    <Link
      href={`/dashboard/admins/${admin.id}/edit`}
      className="group flex items-center gap-4 rounded-xl border border-neutral-200 p-4 transition hover:border-neutral-300 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
    >
      {admin.avatar_url ? (
        <img
          src={admin.avatar_url}
          alt={admin.name}
          className="h-24 w-24 shrink-0 rounded-full object-cover bg-neutral-100"
        />
      ) : (
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
          {initials(admin.name)}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-neutral-500 group-hover:underline">
            {admin.name}
          </p>
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${admin.is_active ? "bg-green-500" : "bg-neutral-300"
              }`}
            title={admin.is_active ? "Active" : "Inactive"}
          />
        </div>
        <p className="truncate text-sm text-neutral-500">Status: {admin.is_active ? "Active" : "Inactive"}</p>

        <p className="truncate text-sm text-neutral-500">Email: {admin.email}</p>
        {admin.phone ? (
          <p className="truncate text-sm text-neutral-500">Phone: {admin.phone}</p>
        ) : null}
        <p className="truncate text-sm text-red-400">(Click to update details)</p>

      </div>

      <div className="shrink-0 text-right">
        <span className="inline-block rounded-full bg-neutral-100 px-2.5 py-1 mb-1 text-xs font-medium capitalize text-neutral-700">
          {admin.role}
        </span>
        <p className="mt-1 text-xs text-neutral-400">
          Joined {formatDate(admin.created_at)}
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          Update At {formatDate(admin.updated_at)}
        </p>
      </div>
    </Link>
  );
}