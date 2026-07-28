// "/dashboard/contact-submissions/:id"
import { notFound } from 'next/navigation';
import { getContactSubmissionById } from '@/lib/services/contactService';
import ContactSubmissionDetail from '@/components/dashboard/contact/ContactSubmissionDetail';

export default async function DashboardContactSubmissionDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const submission = await getContactSubmissionById(id);

    if (!submission) {
        notFound();
    }

    return <ContactSubmissionDetail submission={submission} />;
}