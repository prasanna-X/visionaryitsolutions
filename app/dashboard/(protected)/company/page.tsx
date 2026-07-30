import { getCompanyDetailsAdmin } from "@/lib/services/companyService";
import CompanyDashboard from "@/components/dashboard/company/CompanyDashbaord";

export default async function CompanyPage() {
    const company = await getCompanyDetailsAdmin();
    return <CompanyDashboard initialCompany={company} />;
}