export interface CompanyDetails {
    id: string;
    name: string;
    tagline: string | null;
    description: string | null;
    logo_url: string | null;
    favicon_url: string | null;
    email: string | null;
    phone: string | null;
    alt_phone: string | null;
    website_url: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    facebook_url: string | null;
    twitter_url: string | null;
    linkedin_url: string | null;
    instagram_url: string | null;
    youtube_url: string | null;
    registration_number: string | null;
    tax_id: string | null;
    founded_year: number | null;
    business_hours: Record<string, string>;
    created_at: string;
    updated_at: string;
}

export type CompanyDetailsInput = Partial<
    Omit<CompanyDetails, "id" | "created_at" | "updated_at">
>;