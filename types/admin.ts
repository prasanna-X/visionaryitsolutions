export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}
