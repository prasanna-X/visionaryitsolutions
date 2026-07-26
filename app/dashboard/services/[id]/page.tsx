// "/dashboard/services/:id"
import { getServiceById } from '@/lib/services/serviceService';

export default async function DashboardServiceDetailPage({ params }: { params: { id: string } }) {
  const service = await getServiceById(params.id);
  return <div>{service?.title}</div>;
}
