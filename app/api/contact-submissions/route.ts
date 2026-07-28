// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/services/contactService";
import { supabaseAdmin } from "@/lib/supabase";
import type { ContactSubmissionInput } from "@/types/contact";

export async function POST(request: Request) {
  let body: Partial<ContactSubmissionInput>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const organization = body.organization?.trim() || null;
  const it_solutions = (body.it_solutions ?? "").trim();
  const message = (body.message ?? "").trim();
  const email = body.email?.trim() || null;

  // Mirror the DB check constraints so bad input is rejected before it ever
  // hits Supabase, and the person gets a clear reason back.
  if (!name || name.length > 200) {
    return NextResponse.json(
      { error: "Name is required and must be 200 characters or fewer." },
      { status: 400 }
    );
  }
  if (!phone || phone.length > 30) {
    return NextResponse.json(
      { error: "Phone is required and must be 30 characters or fewer." },
      { status: 400 }
    );
  }
  if (!it_solutions || it_solutions.length > 100) {
    return NextResponse.json(
      { error: "Please select an IT solution." },
      { status: 400 }
    );
  }
  if (!message || message.length > 4000) {
    return NextResponse.json(
      { error: "Message is required and must be 4000 characters or fewer." },
      { status: 400 }
    );
  }
  if (organization && organization.length > 200) {
    return NextResponse.json(
      { error: "Organization must be 200 characters or fewer." },
      { status: 400 }
    );
  }
  if (email && email.length > 320) {
    return NextResponse.json(
      { error: "Email must be 320 characters or fewer." },
      { status: 400 }
    );
  }

  try {
    const submission = await createContactSubmission({
      name,
      phone,
      organization,
      it_solutions,
      message,
      email,
    });

    // Best-effort admin notification — a failure here shouldn't fail the
    // person's form submission, so it's isolated in its own try/catch.
    try {
      await supabaseAdmin.from("notifications").insert({
        type: "contact_submission",
        title: `New inquiry from ${submission.name}`,
        body: submission.message,
        data: { contact_submission_id: submission.id },
      });
    } catch (notifyError) {
      console.error("Failed to create admin notification:", notifyError);
    }

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create contact submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

