// "/dashboard/projects/:id/edit"
import ProjectForm from '@/components/dashboard/projects/ProjectForm';
import { getProjectById } from '@/lib/services/projectService';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  return <ProjectForm project={project} />;
}
