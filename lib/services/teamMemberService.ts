import { db } from '@/lib/db';

export async function getAllTeamMembers() {
  return db.teamMember.findMany({ orderBy: { order: 'asc' } });
}

export async function getTeamMemberById(id: string) {
  return db.teamMember.findUnique({ where: { id } });
}

export async function createTeamMember(data: { name: string; role: string; bio?: string }) {
  return db.teamMember.create({ data });
}

export async function updateTeamMember(id: string, data: Partial<{ name: string; role: string; bio: string }>) {
  return db.teamMember.update({ where: { id }, data });
}

export async function deleteTeamMember(id: string) {
  return db.teamMember.delete({ where: { id } });
}
