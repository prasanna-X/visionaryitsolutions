// "/team" - public team members list
import { getAllTeamMembers } from '@/lib/services/teamMemberService';

export default async function TeamPage() {
  const members = await getAllTeamMembers();
  return <main>Team Page</main>;
}
