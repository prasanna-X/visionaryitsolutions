import { db } from '@/lib/db';

export async function getAllLeads() {
  return db.lead.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getLeadById(id: string) {
  return db.lead.findUnique({ where: { id } });
}

export async function createLead(data: { name: string; phone?: string; message: string }) {
  return db.lead.create({ data });
}

export async function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed') {
  return db.lead.update({ where: { id }, data: { status } });
}

export async function deleteLead(id: string) {
  return db.lead.delete({ where: { id } });
}
