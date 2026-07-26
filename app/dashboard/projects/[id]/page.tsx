// "/dashboard/projects/:id"
import { getProjectById } from '@/lib/services/projectService';

export default async function DashboardProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  return <div>{project?.title}</div>;
}
