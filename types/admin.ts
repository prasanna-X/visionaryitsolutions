export interface Admin {
  id: string;
  name: string;
  phone?: string | number | null;
  email: string;
  role: string;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
