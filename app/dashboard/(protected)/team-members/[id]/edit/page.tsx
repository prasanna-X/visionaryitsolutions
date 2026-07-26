// "/dashboard/team-members/:id/edit"
import TeamMemberForm from '@/components/dashboard/team-members/TeamMemberForm';
import { getTeamMemberById } from '@/lib/services/teamMemberService';

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const member = await getTeamMemberById(params.id);
  return <TeamMemberForm member={member} />;
}
