"use client";

import { useState } from "react";
import CompanyDetailsView from "./CompanyDetailsView";
import CompanyForm from "./CompanyForm";
import type { CompanyDetails } from "@/types/company";

export default function CompanyDashboard({ initialCompany }: { initialCompany: CompanyDetails | null }) {
    const [editing, setEditing] = useState(false);

    return editing ? (
        <CompanyForm company={initialCompany} onCancel={() => setEditing(false)} />
    ) : (
        <CompanyDetailsView company={initialCompany} onEdit={() => setEditing(true)} />
    );
}