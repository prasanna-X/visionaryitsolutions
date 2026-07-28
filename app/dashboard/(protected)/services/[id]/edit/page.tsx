// "/dashboard/services/:id/edit"
import ServiceForm from '@/components/dashboard/services/ServiceForm';
import { getServiceById } from '@/lib/services/serviceService';

export default async function EditServicePage({ params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);
  return <ServiceForm service={service} />;
}