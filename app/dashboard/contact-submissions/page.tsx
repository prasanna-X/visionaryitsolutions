import { createClient } from "@/lib/supabase/server";
import NotificationSetup from "@/components/admin/NotificationSetup";
import { C, display, mono } from "@/components/tokens";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const { data: submissions, error } = await supabase
    .from("contact_submissions")
    .select("id, name, phone, email, message, status, created_at")
    .order("created_at", { ascending: false });
 
  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 style={{ fontFamily: display, fontWeight: 700 }} className="text-2xl">
          Contact messages
        </h1>
        <NotificationSetup />
      </div>

      {error && (
        <p style={{ color: "#E1897E" }}>Couldn&apos;t load submissions: {error.message}</p>
      )}

      {!error && submissions?.length === 0 && (
        <p style={{ color: C.inkDim }}>No messages yet — they&apos;ll show up here as soon as someone submits the contact form.</p>
      )}

      <div className="flex flex-col gap-4">
        {submissions?.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-2xl"
            style={{ background: C.panel, border: `1px solid ${C.line}` }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <span style={{ fontFamily: display, fontWeight: 600 }}>{s.name}</span>
              <span style={{ fontFamily: mono, fontSize: 11.5, color: C.accentSoft, textTransform: "uppercase" }}>
                {s.status}
              </span>
            </div>
            <p style={{ color: C.inkDim, fontSize: 14.5, lineHeight: 1.6 }} className="mb-3">
              {s.message}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1" style={{ fontFamily: mono, fontSize: 12, color: C.inkFaint }}>
              {s.phone && <span>{s.phone}</span>}
              {s.email && <span>{s.email}</span>}
              <span>{new Date(s.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
