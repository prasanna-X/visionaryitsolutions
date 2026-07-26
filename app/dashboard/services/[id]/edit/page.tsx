// "/dashboard/services/:id/edit"
import ServiceForm from '@/components/dashboard/services/ServiceForm';
import { getServiceById } from '@/lib/services/serviceService';

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getServiceById(params.id);
  return <ServiceForm service={service} />;
}
