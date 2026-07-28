// types/contact.ts

export type ContactStatus = "new" | "contacted" | "closed";

export interface ContactSubmission {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    message: string;
    status: ContactStatus;
    created_at: string;
    organization: string | null;
    it_solutions: string | null;
}

// Shape accepted when a visitor submits the public contact form.
// (email exists in the DB/table but isn't currently collected by the form —
// included here as optional in case you add it to the UI later.)
export interface ContactSubmissionInput {
    name: string;
    phone: string;
    email?: string | null;
    organization?: string | null;
    it_solutions: string;
    message: string;
}