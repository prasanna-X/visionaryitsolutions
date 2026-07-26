export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon?: string;
  featured: boolean;
  order: number;
}
