export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  logo?: string | null;
  icon: string;
  tagline?: string | null;
  website_url?: string | null;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  display_order: number;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Shape accepted when creating/updating a product from the dashboard.
export type ProductInput = Omit<Product, 'id' | 'created_at' | 'updated_at'>;