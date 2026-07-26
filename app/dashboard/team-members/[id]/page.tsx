// "/dashboard/team-members/:id"
import { getTeamMemberById } from '@/lib/services/teamMemberService';

export default async function TeamMemberDetailPage({ params }: { params: { id: string } }) {
  const member = await getTeamMemberById(params.id);
  return <div>{member?.name}</div>;
}
