import { NextResponse } from 'next/server';
import { getCompanyDetailsAdmin, saveCompanyDetails } from '@/lib/services/companyService';

export async function GET() {
  try {
    const company = await getCompanyDetailsAdmin();
    return NextResponse.json(company);
  } catch (error) {
    console.error("GET /api/company failed:", error);
    return NextResponse.json({ error: "Failed to fetch company details" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const company = await saveCompanyDetails(body);
    return NextResponse.json(company);
  } catch (error) {
    console.error("PUT /api/company failed:", error);
    return NextResponse.json({ error: "Failed to save company details" }, { status: 500 });
  }
}

// Alias — some clients prefer PATCH semantics for a partial update; both do the same thing here.
export const PATCH = PUT;