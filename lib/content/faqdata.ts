// FAQ & answers dataset for Vivaan IT Solutions.
// This is the single source of truth for the chat assistant's replies —
// no external AI call is made. Edit/add entries here to change what the
// assistant knows and says.
//
// `keywords` are extra terms (synonyms, abbreviations, phrasing variants)
// that should also match this entry even if they don't appear in
// `question` verbatim. Keep them lowercase.

export interface FaqEntry {
    id: string;
    question: string;
    keywords?: string[];
    answer: string;
}

export const FAQ_DATA: FaqEntry[] = [
    {
        id: "about-company",
        question: "What is Vivaan IT Solutions?",
        keywords: ["who are you", "about company", "what do you do", "company info"],
        answer:
            "Vivaan IT Solutions is an IT services company that helps businesses design, build, and maintain software — including websites, mobile apps, custom software, and cloud/IT infrastructure. We work with startups and established businesses to turn ideas into reliable, scalable products.",
    },
    {
        id: "services-offered",
        question: "What services do you offer?",
        keywords: ["services", "what can you build", "offerings", "solutions"],
        answer:
            "We offer:\n- Web development (websites & web apps)\n- Mobile app development (iOS & Android)\n- Custom software development\n- Cloud & DevOps services\n- UI/UX design\n- IT consulting\n- Ongoing maintenance & support\n\nLet us know what you're looking for and we can point you to the right service.",
    },
    {
        id: "web-development",
        question: "Do you build websites?",
        keywords: ["website development", "web app", "landing page", "e-commerce site"],
        answer:
            "Yes — we design and build websites and web applications, from marketing sites and landing pages to full e-commerce platforms and custom web apps, built to be fast, responsive, and easy for you to manage.",
    },
    {
        id: "mobile-app-development",
        question: "Do you build mobile apps?",
        keywords: ["ios app", "android app", "app development", "mobile development"],
        answer:
            "Yes — we build native and cross-platform mobile apps for iOS and Android, covering everything from initial design to launch and post-launch support.",
    },
    {
        id: "custom-software",
        question: "Can you build custom software for my business?",
        keywords: ["custom software", "bespoke software", "internal tools", "saas development"],
        answer:
            "Absolutely. We build custom software tailored to your workflows — internal tools, SaaS products, automation systems, and integrations with the tools you already use.",
    },
    {
        id: "pricing",
        question: "How much do your services cost?",
        keywords: ["pricing", "cost", "price", "rates", "budget", "how much"],
        answer:
            "Pricing depends on project scope, complexity, and timeline, so we don't have a fixed number to quote here. The best next step is to reach out via our Contact page or WhatsApp button with a bit about your project, and our team will get you an accurate estimate.",
    },
    {
        id: "timeline",
        question: "How long does a project take?",
        keywords: ["timeline", "how long", "delivery time", "turnaround"],
        answer:
            "Timelines vary by project size and scope — a simple website might take a couple of weeks, while a full custom application can take a few months. Share your project details via the Contact page and we'll give you a realistic timeline.",
    },
    {
        id: "process",
        question: "What does your project process look like?",
        keywords: ["how do you work", "process", "workflow", "methodology"],
        answer:
            "Our typical process is: 1) Discovery call to understand your goals, 2) Proposal with scope, timeline, and cost, 3) Design & development in regular iterations with your feedback, 4) Testing & launch, 5) Ongoing support if needed. We keep you in the loop at every stage.",
    },
    {
        id: "support-maintenance",
        question: "Do you offer support after launch?",
        keywords: ["maintenance", "support", "after launch", "bug fixes", "warranty"],
        answer:
            "Yes — we offer ongoing maintenance and support packages after launch, covering bug fixes, updates, and monitoring, so your product keeps running smoothly.",
    },
    {
        id: "technologies",
        question: "What technologies do you use?",
        keywords: ["tech stack", "technologies", "programming languages", "frameworks"],
        answer:
            "We choose the right tech stack for each project rather than a one-size-fits-all approach — commonly modern frameworks for web and mobile, and cloud platforms for hosting and scaling. Happy to discuss specifics for your project on a call.",
    },
    {
        id: "contact",
        question: "How can I contact you?",
        keywords: ["contact", "reach you", "email", "phone", "whatsapp", "get in touch"],
        answer:
            "You can reach our team through the Contact page or the WhatsApp button on the site, and we'll get back to you as soon as possible.",
    },
    {
        id: "location",
        question: "Where are you located?",
        keywords: ["location", "office", "based in", "address"],
        answer:
            "For our current office location and contact details, please check the Contact page on our site — I don't have live location data to share here.",
    },
];

// Generic fallback used when nothing in FAQ_DATA matches well enough.
export const FAQ_FALLBACK_ANSWER =
    "I don't have a specific answer for that yet. For anything outside our FAQ, please reach out via the Contact page or the WhatsApp button on the site and our team will help you directly.";