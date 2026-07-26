import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const serviceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
});

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  published: z.boolean().optional(),
});

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string().optional(),
});
