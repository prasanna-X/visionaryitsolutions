// app/api/contact-submissions/[id]/route.ts
import { NextResponse } from "next/server";
import {
    updateContactSubmissionStatus,
    deleteContactSubmission,
} from "@/lib/services/contactService";
import type { ContactStatus } from "@/types/contact";

const VALID_STATUSES: ContactStatus[] = ["new", "contacted", "closed"];

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    let body: { status?: ContactStatus };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!body.status || !VALID_STATUSES.includes(body.status)) {
        return NextResponse.json(
            { error: `Status must be one of: ${VALID_STATUSES.join(", ")}.` },
            { status: 400 }
        );
    }

    try {
        const submission = await updateContactSubmissionStatus(id, body.status);
        return NextResponse.json({ success: true, submission });
    } catch (error) {
        console.error("Failed to update contact submission status:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await deleteContactSubmission(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete contact submission:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}