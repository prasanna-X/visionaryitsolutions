export interface Settings {
  id: string;
  siteName: string;
  contactEmail: string;
  phone?: string;
  address?: string;
  socialLinks?: Record<string, string>;
}
