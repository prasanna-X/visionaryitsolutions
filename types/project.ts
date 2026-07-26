export interface Project {
  id: string;
  slug: string;
  title: string;
  clientName?: string;
  summary: string;
  description: string;
  coverImage?: string;
  published: boolean;
}
