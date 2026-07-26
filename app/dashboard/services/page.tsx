// "/dashboard/services"
import { getAllServices } from '@/lib/services/serviceService';
import ServiceTable from '@/components/dashboard/services/ServiceTable';

export default async function DashboardServicesPage() {
  const services = await getAllServices();
  return <ServiceTable services={services} />;
}
