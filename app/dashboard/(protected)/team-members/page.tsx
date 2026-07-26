// "/dashboard/team-members"
import { getAllTeamMembers } from '@/lib/services/teamMemberService';
import TeamMemberTable from '@/components/dashboard/team-members/TeamMemberTable';

export default async function DashboardTeamMembersPage() {
  const members = await getAllTeamMembers();
  return <TeamMemberTable members={members} />;
}
