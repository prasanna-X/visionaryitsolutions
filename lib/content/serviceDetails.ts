/**
 * Enrichment content for the /services/[slug] detail pages.
 *
 * The `services` table only stores one long-form field (`description`),
 * so it can't hold a tagline, micro-service breakdown, pricing, delivery
 * process, tech stack, or comparison data on its own. This file supplies
 * that whole presentation layer, keyed by slug, and is merged with
 * whatever comes back from the database in the detail page.
 *
 * Also doubles as the offline/no-DB fallback (same role FALLBACK_SERVICES
 * plays on the /services index) so every known service still renders a
 * full page if the API call fails or a service hasn't been added to the
 * database yet.
 *
 * All prices are NPR starting ranges for scoping conversations, not fixed
 * quotes — actual cost depends on scope, integrations, and timeline.
 * Ranges reflect typical Nepal market rates for equivalent work, not a
 * flat currency conversion from USD.
 */

export interface MicroService {
  name: string;
  description: string;
  priceRange: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface TechGroup {
  category: string;
  items: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ServiceDetailContent {
  slug: string;
  title: string;
  icon: string;
  tagline: string;
  description: string; // used when the DB has no row for this slug
  highlights: string[];
  microServices: MicroService[];
  process: ProcessStep[];
  techStack: TechGroup[];
  pricingTiers: PricingTier[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetailContent> = {
  "web-app-development": {
    slug: "web-app-development",
    title: "Web & App Development",
    icon: "code2",
    tagline: "Software built around how your team actually works.",
    description:
      "We design and build custom websites and applications from first sketch through to production — not a template with your logo dropped in. Every screen is shaped around the workflows your team already has, so the software fits the job instead of the other way around.\n\nWe work in short, visible cycles: wireframes and a clickable prototype first, then a build-out you can watch take shape, then a launch with a plan for what comes after. You get a partner who understands both the code and the business it's serving.",
    highlights: [
      "Custom web apps, internal tools, and customer-facing sites",
      "Mobile-friendly builds that work well on any device",
      "Clickable prototypes before a line of production code is written",
      "Clean handoff: documentation, and training for your team",
      "Ongoing support after launch, not a one-and-done delivery",
    ],
    microServices: [
      {
        name: "Marketing / Business Website",
        description: "A fast, responsive site that explains what you do and gets people to contact you.",
        priceRange: "NPR 50,000 – 150,000",
      },
      {
        name: "Custom Web Application",
        description: "Purpose-built software for a specific workflow — dashboards, portals, booking systems.",
        priceRange: "NPR 200,000 – 800,000+",
      },
      {
        name: "E-commerce Store",
        description: "A storefront with product catalog, cart, checkout, and order management.",
        priceRange: "NPR 150,000 – 500,000",
      },
      {
        name: "Mobile App (iOS & Android)",
        description: "A native-feel app for phones and tablets, built once and shipped to both stores.",
        priceRange: "NPR 350,000 – 1,000,000+",
      },
      {
        name: "API & Backend Development",
        description: "The server, database, and endpoints that power your app or connect it to other tools.",
        priceRange: "NPR 100,000 – 350,000",
      },
      {
        name: "Website Care & Maintenance",
        description: "Updates, security patches, backups, and small changes handled for you.",
        priceRange: "NPR 5,000 – 25,000 / mo",
      },
    ],
    process: [
      { title: "Discovery & Scoping", description: "We map out goals, users, and must-have features, and agree on a fixed scope before any design starts." },
      { title: "Wireframes & Design", description: "Low-fidelity layouts first, then a clickable visual prototype you can react to before we write code." },
      { title: "Development Sprints", description: "We build in short cycles with regular check-ins, so you're watching progress, not waiting for a reveal." },
      { title: "QA & Testing", description: "Cross-device and cross-browser testing, plus a walkthrough of every feature against the original scope." },
      { title: "Launch", description: "Deployment to production, domain and hosting setup, and a final pre-launch checklist." },
      { title: "Post-launch Support", description: "A support window to fix anything that surfaces under real traffic, plus an option to continue on retainer." },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Python (FastAPI / Django)"] },
      { category: "Database", items: ["PostgreSQL", "Supabase", "MongoDB"] },
      { category: "Mobile", items: ["React Native", "Flutter"] },
      { category: "Infrastructure", items: ["Docker", "Vercel", "AWS"] },
    ],
    pricingTiers: [
      {
        name: "Starter",
        price: "NPR 60,000",
        billing: "one-time",
        description: "A clean, professional site for a small business or new venture.",
        features: ["Up to 5 pages", "Responsive design", "Basic SEO setup", "Contact form", "30 days of support"],
      },
      {
        name: "Growth",
        price: "NPR 300,000",
        billing: "one-time",
        description: "A custom web application with the features that make it actually useful.",
        features: [
          "Custom design",
          "CMS / admin panel",
          "Up to 10 pages or screens",
          "1–2 third-party integrations",
          "90 days of support",
          "Priority bug fixes",
        ],
        popular: true,
      },
      {
        name: "Scale",
        price: "Custom quote",
        billing: "project-based",
        description: "A complex platform with multiple integrations and a longer runway.",
        features: [
          "Everything in Growth",
          "Multiple integrations & workflows",
          "Dedicated project manager",
          "SLA-backed support",
          "Ongoing development retainer",
        ],
      },
    ],
  },

  "cloud-infrastructure": {
    slug: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    icon: "cloud",
    tagline: "Infrastructure that stays online and costs less to run.",
    description:
      "We set up servers, storage, and deployments that stay online, scale with demand, and cost less to run month to month. That means right-sizing what you actually need instead of over-provisioning out of caution, and building in the monitoring and backups that catch problems before your customers do.\n\nWhether you're migrating an existing setup to the cloud or building fresh, we handle the architecture, the migration, and the handover — with clear documentation so your team isn't locked into needing us for every change.",
    highlights: [
      "Cloud migration planning and execution with minimal downtime",
      "Auto-scaling setups that flex with real demand, not guesswork",
      "Cost audits to cut wasted spend on over-provisioned resources",
      "Automated backups, monitoring, and alerting",
      "Infrastructure-as-code so environments are reproducible and documented",
    ],
    microServices: [
      {
        name: "Cloud Migration",
        description: "Moving existing systems onto AWS, GCP, or Azure with minimal downtime.",
        priceRange: "NPR 100,000 – 450,000",
      },
      {
        name: "Server Setup & Configuration",
        description: "Provisioning, hardening, and configuring servers for a new environment.",
        priceRange: "NPR 35,000 – 150,000",
      },
      {
        name: "Auto-scaling & Load Balancing",
        description: "Infrastructure that adds capacity automatically when traffic spikes, and scales back down.",
        priceRange: "NPR 60,000 – 250,000",
      },
      {
        name: "Backup & Disaster Recovery",
        description: "Automated backups and a tested recovery plan for when something goes wrong.",
        priceRange: "NPR 30,000 – 110,000",
      },
      {
        name: "Monitoring & Alerting Setup",
        description: "Dashboards and alerts that flag issues before they become outages.",
        priceRange: "NPR 25,000 – 85,000",
      },
      {
        name: "Managed Cloud Support",
        description: "Ongoing hands-on management of your infrastructure.",
        priceRange: "NPR 18,000 – 75,000 / mo",
      },
    ],
    process: [
      { title: "Infrastructure Audit", description: "We review your current setup, costs, and pain points to see what's actually needed." },
      { title: "Architecture Design", description: "A right-sized architecture proposal — no over-engineering, no hidden bottlenecks." },
      { title: "Migration or Setup", description: "We build or migrate the environment in staged steps, with rollback points along the way." },
      { title: "Testing & Load Validation", description: "Load and failover testing before anything customer-facing depends on it." },
      { title: "Go-live", description: "Cutover during a low-traffic window, with the old environment kept warm as a fallback." },
      { title: "Ongoing Monitoring", description: "Alerting, patching, and monthly cost reviews so the setup stays efficient over time." },
    ],
    techStack: [
      { category: "Cloud Platforms", items: ["AWS", "Google Cloud", "Azure", "DigitalOcean"] },
      { category: "Containers & Orchestration", items: ["Docker", "Kubernetes"] },
      { category: "Infrastructure as Code", items: ["Terraform", "Ansible"] },
      { category: "Networking & CDN", items: ["Nginx", "Cloudflare"] },
      { category: "Monitoring", items: ["Prometheus", "Grafana", "Datadog"] },
    ],
    pricingTiers: [
      {
        name: "Essential",
        price: "NPR 50,000",
        billing: "per month",
        description: "Reliable management for a single-server setup.",
        features: ["Single server management", "Automated backups", "Basic monitoring", "Business-hours support"],
      },
      {
        name: "Growth",
        price: "NPR 110,000",
        billing: "per month",
        description: "For growing apps that need to scale without babysitting.",
        features: [
          "Multi-server / auto-scaling setup",
          "24/7 monitoring & alerting",
          "Monthly cost optimization review",
          "Priority support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom quote",
        billing: "per month",
        description: "Dedicated infrastructure engineering for demanding environments.",
        features: [
          "Everything in Growth",
          "Dedicated infrastructure engineer",
          "Multi-region setup",
          "Compliance support",
          "Uptime SLA",
        ],
      },
    ],
  },

  "it-consulting-support": {
    slug: "it-consulting-support",
    title: "IT Consulting & Support",
    icon: "wrench",
    tagline: "Straight advice and hands-on help when you need it.",
    description:
      "Hands-on, ongoing support and straight technical advice, so the decision-making doesn't fall entirely on you. We act as the technical judgment your business can lean on — whether that's picking the right tool for a job, untangling a system that's grown messy over time, or being on call when something breaks.\n\nWe keep recommendations grounded in your budget and your team's actual capacity, not in whatever's trendiest. The goal is fewer surprises and a team that knows who to call.",
    highlights: [
      "On-demand technical support and troubleshooting",
      "Vendor and tool selection guidance, free of sales pressure",
      "System audits to flag risk before it becomes downtime",
      "IT roadmap and budget planning",
      "A single point of contact instead of a rotating cast of contractors",
    ],
    microServices: [
      {
        name: "IT Health Check / Audit",
        description: "A full review of your current systems, risks, and quick wins.",
        priceRange: "NPR 35,000 – 100,000",
      },
      {
        name: "Help Desk & Troubleshooting",
        description: "Day-to-day technical support for your team, on call when things go wrong.",
        priceRange: "NPR 18,000 – 60,000 / mo",
      },
      {
        name: "Vendor & Tool Selection",
        description: "Independent guidance comparing software or providers for a specific need.",
        priceRange: "NPR 25,000 – 75,000",
      },
      {
        name: "IT Roadmap & Budget Planning",
        description: "A 12-month plan for what to fix, upgrade, or invest in and when.",
        priceRange: "NPR 50,000 – 150,000",
      },
      {
        name: "Emergency On-call Support",
        description: "Fast response when something critical breaks outside normal hours.",
        priceRange: "NPR 7,000 – 15,000 / hr",
      },
      {
        name: "Staff IT Training",
        description: "Hands-on sessions to get your team comfortable with new tools or best practices.",
        priceRange: "NPR 30,000 – 85,000",
      },
    ],
    process: [
      { title: "Initial Consultation", description: "A conversation about what's working, what isn't, and what's actually urgent." },
      { title: "Systems Audit", description: "We look under the hood — tools, access, backups, and workflows — and document what we find." },
      { title: "Recommendations & Roadmap", description: "A prioritized plan with rough costs, sequenced by risk and impact rather than by what's trendy." },
      { title: "Implementation Support", description: "We help execute the plan directly, or guide your team through it — your call." },
      { title: "Ongoing Support Retainer", description: "A standing relationship for questions, troubleshooting, and the next round of decisions." },
    ],
    techStack: [
      { category: "Help Desk & Ticketing", items: ["Freshdesk", "Zendesk"] },
      { category: "Remote Support", items: ["TeamViewer", "AnyDesk"] },
      { category: "Monitoring & Management", items: ["NinjaOne", "Datto RMM"] },
      { category: "Productivity Suites", items: ["Microsoft 365", "Google Workspace"] },
    ],
    pricingTiers: [
      {
        name: "Basic",
        price: "NPR 25,000",
        billing: "per month",
        description: "Light-touch support for a small, stable setup.",
        features: ["Email & chat support (business hours)", "Monthly check-in call", "Basic issue troubleshooting"],
      },
      {
        name: "Standard",
        price: "NPR 55,000",
        billing: "per month",
        description: "The right fit for a growing team leaning on us regularly.",
        features: [
          "Unlimited support tickets",
          "Quarterly IT audit",
          "Vendor & tool negotiation help",
          "Priority response time",
        ],
        popular: true,
      },
      {
        name: "Priority",
        price: "NPR 110,000",
        billing: "per month",
        description: "A dedicated point of contact and fast response when it counts.",
        features: [
          "Everything in Standard",
          "Dedicated support contact",
          "On-call emergency response",
          "Same-day remote or onsite help",
        ],
      },
    ],
  },

  "ai-automation": {
    slug: "ai-automation",
    title: "AI Automation",
    icon: "bot",
    tagline: "Take repetitive work off your team's plate.",
    description:
      "AI-driven workflows and integrations that take repetitive work off your team's plate and speed up daily operations. We start by mapping where time is actually going — the manual data entry, the copy-pasting between tools, the reports assembled by hand — and automate the parts that don't need a human judgment call.\n\nWe build with off-the-shelf models where they're the right fit and custom pipelines where they're not, always with a clear view of what it costs to run and what it saves.",
    highlights: [
      "Workflow automation across the tools you already use",
      "AI-assisted data entry, tagging, and document processing",
      "Chatbots and internal assistants trained on your own content",
      "Integrations that connect previously disconnected systems",
      "Clear reporting on time and cost saved, not just novelty",
    ],
    microServices: [
      {
        name: "Workflow Automation Setup",
        description: "Connecting the tools you already use so data moves without manual re-entry.",
        priceRange: "NPR 60,000 – 250,000",
      },
      {
        name: "Custom Chatbot / Assistant",
        description: "A chat assistant trained on your own docs, FAQs, or processes.",
        priceRange: "NPR 100,000 – 375,000",
      },
      {
        name: "Document & Data Processing",
        description: "Automated extraction, tagging, or summarizing from documents and forms.",
        priceRange: "NPR 75,000 – 300,000",
      },
      {
        name: "Tool Integrations (CRM, ERP, etc.)",
        description: "Wiring your CRM, ERP, or spreadsheets together so they stay in sync.",
        priceRange: "NPR 50,000 – 225,000",
      },
      {
        name: "Custom AI Pipeline",
        description: "A purpose-built model pipeline for a problem off-the-shelf tools can't solve.",
        priceRange: "NPR 200,000 – 800,000+",
      },
      {
        name: "Automation Maintenance",
        description: "Monitoring and adjusting automations as your tools and processes change.",
        priceRange: "NPR 18,000 – 60,000 / mo",
      },
    ],
    process: [
      { title: "Process Mapping", description: "We walk through your current workflow to find where time and accuracy are actually being lost." },
      { title: "Feasibility & Tool Selection", description: "We decide what's worth automating and pick the right approach — off-the-shelf or custom." },
      { title: "Build & Integrate", description: "We build the automation and connect it to your existing tools and data." },
      { title: "Testing & Refinement", description: "Real-world test runs, with edge cases fixed before it touches live data." },
      { title: "Launch", description: "The automation goes live, with a rollback plan if anything needs adjusting." },
      { title: "Monitor & Improve", description: "We track performance and refine the automation as your processes evolve." },
    ],
    techStack: [
      { category: "AI Models & APIs", items: ["Claude API", "OpenAI API"] },
      { category: "Orchestration", items: ["LangChain", "n8n", "Zapier / Make"] },
      { category: "Languages", items: ["Python", "TypeScript"] },
      { category: "Data & Search", items: ["Vector databases (Pinecone, pgvector)", "PostgreSQL"] },
    ],
    pricingTiers: [
      {
        name: "Starter",
        price: "NPR 75,000",
        billing: "one-time",
        description: "A single well-defined workflow, automated end to end.",
        features: ["One automated workflow", "One tool integration", "30 days of support"],
      },
      {
        name: "Business",
        price: "NPR 275,000",
        billing: "one-time",
        description: "Multiple automations working together, plus an assistant if you need one.",
        features: [
          "Multi-step automation",
          "Chatbot or internal assistant",
          "2–3 tool integrations",
          "60 days of support",
        ],
        popular: true,
      },
      {
        name: "Advanced",
        price: "Custom quote",
        billing: "project-based",
        description: "A custom AI pipeline with ongoing tuning as things scale.",
        features: [
          "Everything in Business",
          "Custom AI pipeline",
          "Multiple system integrations",
          "Ongoing optimization retainer",
        ],
      },
    ],
  },

  cybersecurity: {
    slug: "cybersecurity",
    title: "Cybersecurity",
    icon: "shieldcheck",
    tagline: "Protection sized to your business, not bolted on.",
    description:
      "Practical protection for your data, network, and customers, sized to your business rather than bolted on. We start with an honest assessment of where you're exposed, then close the gaps that matter most first — not a checklist sold at the same price to every client regardless of size.\n\nThat covers everything from day-to-day account and access hygiene to incident response planning, so if something does go wrong, your team already knows the next step.",
    highlights: [
      "Security audits and vulnerability assessments",
      "Access control, authentication, and account hygiene reviews",
      "Data protection and backup strategy aligned to real risk",
      "Employee security awareness training",
      "Incident response planning, so a breach isn't the first time it's discussed",
    ],
    microServices: [
      {
        name: "Security Audit & Vulnerability Scan",
        description: "A structured review of your network, apps, and accounts for weak points.",
        priceRange: "NPR 50,000 – 190,000",
      },
      {
        name: "Penetration Testing",
        description: "Simulated attacks against your systems to find what a real one would exploit.",
        priceRange: "NPR 100,000 – 375,000",
      },
      {
        name: "Access Control & Identity Setup",
        description: "MFA, single sign-on, and least-privilege access across your accounts.",
        priceRange: "NPR 35,000 – 125,000",
      },
      {
        name: "Backup & Recovery Planning",
        description: "A tested plan for restoring data and operations after an incident.",
        priceRange: "NPR 30,000 – 110,000",
      },
      {
        name: "Employee Security Training",
        description: "Practical training so phishing and social engineering attempts get caught.",
        priceRange: "NPR 25,000 – 75,000",
      },
      {
        name: "Managed Security Monitoring",
        description: "Ongoing monitoring for suspicious activity across your systems.",
        priceRange: "NPR 25,000 – 85,000 / mo",
      },
    ],
    process: [
      { title: "Risk Assessment", description: "We identify what you're actually protecting and what a realistic threat looks like." },
      { title: "Vulnerability Testing", description: "Scans and, where warranted, penetration testing against your live environment." },
      { title: "Remediation Plan", description: "A prioritized list of fixes, ranked by risk and effort rather than alphabetically." },
      { title: "Implementation", description: "We close the gaps directly, or work alongside your team as they do." },
      { title: "Staff Training", description: "Practical sessions so your team becomes a defense layer, not the weak point." },
      { title: "Ongoing Monitoring", description: "Continuous monitoring and a tested incident response plan for whatever comes next." },
    ],
    techStack: [
      { category: "Network Security", items: ["pfSense", "Fortinet"] },
      { category: "Identity & Access", items: ["Okta", "Microsoft Entra ID (Azure AD)"] },
      { category: "Monitoring", items: ["SIEM tooling", "Endpoint detection & response"] },
      { category: "Data Protection", items: ["Encryption at rest & in transit", "Automated backups"] },
    ],
    pricingTiers: [
      {
        name: "Foundation",
        price: "NPR 45,000",
        billing: "per month",
        description: "Baseline protection and visibility for a small business.",
        features: ["Basic monitoring", "Quarterly vulnerability scan", "Security best-practices checklist"],
      },
      {
        name: "Shield",
        price: "NPR 95,000",
        billing: "per month",
        description: "Active protection with training and a response plan behind it.",
        features: [
          "24/7 monitoring",
          "Monthly vulnerability scans",
          "Incident response plan",
          "Employee training included",
        ],
        popular: true,
      },
      {
        name: "Fortress",
        price: "Custom quote",
        billing: "per month",
        description: "For businesses with compliance requirements or a higher risk profile.",
        features: [
          "Everything in Shield",
          "Full penetration testing program",
          "Dedicated security engineer",
          "Compliance support (SOC 2, ISO 27001)",
        ],
      },
    ],
  },

  "digital-transformation": {
    slug: "digital-transformation",
    title: "Digital Transformation",
    icon: "linechart",
    tagline: "Systems that scale as the business grows around them.",
    description:
      "Moving paper trails and spreadsheets onto systems that actually scale as the business grows around them. We look at how information actually moves through your organization today — the handoffs, the workarounds, the spreadsheet that's quietly become mission-critical — and replace the weak points with tools your team will actually use.\n\nChange only sticks if people adopt it, so every rollout comes with training and a rollout plan, not just a new login page.",
    highlights: [
      "Process mapping to find where manual work is costing the most",
      "Migrating spreadsheets and paper workflows into proper systems",
      "Tool consolidation to cut down on app and license sprawl",
      "Change management and staff training for a smooth rollout",
      "Reporting and dashboards built on your real, current data",
    ],
    microServices: [
      {
        name: "Process Mapping & Analysis",
        description: "Documenting how work actually flows today, and where it breaks down.",
        priceRange: "NPR 50,000 – 150,000",
      },
      {
        name: "Legacy System Migration",
        description: "Moving data and workflows off outdated or unsupported systems.",
        priceRange: "NPR 125,000 – 500,000",
      },
      {
        name: "Tool Consolidation & Integration",
        description: "Cutting down on overlapping software and connecting what's left.",
        priceRange: "NPR 75,000 – 275,000",
      },
      {
        name: "Custom Dashboards & Reporting",
        description: "Live reporting built on your actual data instead of manual spreadsheets.",
        priceRange: "NPR 60,000 – 225,000",
      },
      {
        name: "Change Management & Training",
        description: "Getting your team to actually adopt the new systems, not just log into them once.",
        priceRange: "NPR 35,000 – 110,000",
      },
      {
        name: "Ongoing Transformation Support",
        description: "Continued support as new processes bed in and get refined.",
        priceRange: "NPR 25,000 – 75,000 / mo",
      },
    ],
    process: [
      { title: "Current-State Assessment", description: "We map existing processes, tools, and data to see where the real friction is." },
      { title: "Roadmap Design", description: "A sequenced plan for what to digitize or consolidate first, and what can wait." },
      { title: "System Selection & Build", description: "We choose or build the right tools for each process — no forced one-size-fits-all platform." },
      { title: "Migration & Integration", description: "Data and workflows move over in stages, checked against the old system as we go." },
      { title: "Training & Rollout", description: "Hands-on training so the team adopts the new systems instead of working around them." },
      { title: "Post-launch Optimization", description: "We monitor real usage and refine the system based on how people are actually using it." },
    ],
    techStack: [
      { category: "Workspace & No-code", items: ["Airtable", "Notion"] },
      { category: "Reporting & BI", items: ["Power BI", "Looker Studio"] },
      { category: "Automation", items: ["Zapier / Make", "n8n"] },
      { category: "Business Platforms", items: ["Odoo", "HubSpot"] },
      { category: "Custom Builds", items: ["Next.js", "PostgreSQL"] },
    ],
    pricingTiers: [
      {
        name: "Kickstart",
        price: "NPR 110,000",
        billing: "one-time",
        description: "Digitize a single process that's currently manual or on paper.",
        features: ["One process digitized", "One tool migration", "Basic staff walkthrough"],
      },
      {
        name: "Transform",
        price: "NPR 375,000",
        billing: "one-time",
        description: "A broader overhaul across several processes, with reporting built in.",
        features: [
          "Multi-process overhaul",
          "Custom dashboard setup",
          "Staff training included",
          "90 days of support",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "Custom quote",
        billing: "project-based",
        description: "A full, phased rollout across the organization.",
        features: [
          "Everything in Transform",
          "Org-wide phased rollout",
          "Dedicated project team",
          "Change management program",
        ],
      },
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS);

export function getServiceDetailContent(slug: string): ServiceDetailContent | null {
  return SERVICE_DETAILS[slug] ?? null;
}

/**
 * Builds a feature-comparison matrix from a service's pricing tiers:
 * every feature that appears on any tier becomes a row, in first-seen
 * order, with a check/cross per tier for whether that tier includes it.
 * Powers the comparison table under the pricing cards.
 */
export function buildComparisonMatrix(tiers: PricingTier[]) {
  const byName = new Map(tiers.map((t) => [t.name, t]));

  // Resolve "Everything in X" into the full, flattened feature list for
  // that tier (recursively, in case of multi-level inheritance).
  function resolve(tier: PricingTier, visited = new Set<string>()): string[] {
    if (visited.has(tier.name)) return [];
    visited.add(tier.name);
    const resolved: string[] = [];
    for (const feature of tier.features) {
      const match = feature.match(/^Everything in (.+)$/);
      if (match) {
        const parent = byName.get(match[1]);
        if (parent) resolved.push(...resolve(parent, visited));
      } else {
        resolved.push(feature);
      }
    }
    return resolved;
  }

  const resolvedByTier = tiers.map((tier) => new Set(resolve(tier)));

  const featureOrder: string[] = [];
  const seen = new Set<string>();
  for (const set of resolvedByTier) {
    for (const feature of set) {
      if (!seen.has(feature)) {
        seen.add(feature);
        featureOrder.push(feature);
      }
    }
  }

  return featureOrder.map((feature) => ({
    feature,
    included: resolvedByTier.map((set) => set.has(feature)),
  }));
}