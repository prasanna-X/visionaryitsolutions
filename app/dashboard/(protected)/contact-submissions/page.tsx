// "/dashboard/contact-submissions"
import { getAllContactSubmissionsAdmin } from '@/lib/services/contactService';
import ContactSubmissionTable from '@/components/dashboard/contact/ContactSubmissionTable';

export default async function DashboardContactSubmissionsPage() {
    const submissions = await getAllContactSubmissionsAdmin();
    return <ContactSubmissionTable submissions={submissions} />;
}