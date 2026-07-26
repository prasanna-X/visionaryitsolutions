// "/dashboard/projects"
import { getAllProjects } from '@/lib/services/projectService';
import ProjectTable from '@/components/dashboard/projects/ProjectTable';

export default async function DashboardProjectsPage() {
  const projects = await getAllProjects();
  return <ProjectTable projects={projects} />;
}
