export interface Product {
  id: string;
  slug: string;
  name: string;
  tag: string;
  description: string;
  icon?: string | null;
  url?: string | null;
  order: number;
  created_at?: string;
  updated_at?: string;
}

// Shape accepted when creating/updating a product from the dashboard.
export type ProductInput = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
