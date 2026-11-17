export type Industry = {
  slug: string;
  name: string;
  icon: "bank" | "heart" | "graduation" | "factory" | "cart" | "chip" | "truck" | "briefcase";
  intro: string;
  solutions: string[];
};

export const industries: Industry[] = [
  {
    slug: "banking-financial-services",
    name: "Banking & Financial Services",
    icon: "bank",
    intro:
      "Financial operations demand precision, auditability and uptime. We engineer software for lending workflows, transaction-heavy back offices and customer-facing portals with security and audit trails treated as first-class requirements.",
    solutions: [
      "Loan origination and credit workflow systems",
      "Billing, reconciliation and financial reporting platforms",
      "Customer and agent portals",
      "Document-centric process automation",
      "Secure API platforms for partner integration",
      "AI assistants for internal policy and procedure search",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "heart",
    intro:
      "Healthcare software carries human consequences. We build patient-facing portals, clinical operations tools and workflow systems with careful attention to privacy, reliability and the realities of clinical work.",
    solutions: [
      "Patient portals and appointment systems",
      "Clinical and administrative workflow applications",
      "Inventory and pharmacy management systems",
      "Billing and claims processing platforms",
      "AI-assisted knowledge search for clinical teams",
      "Integration with existing hospital information systems",
    ],
  },
  {
    slug: "education-edtech",
    name: "Education & EdTech",
    icon: "graduation",
    intro:
      "Educational institutions run on processes — admissions, academics, fees, communication. We build platforms that reduce administrative load and improve the experience for students, parents and staff.",
    solutions: [
      "Student information and academic management systems",
      "Admissions and enrollment platforms",
      "Fee management and payment systems",
      "Learning portals and content platforms",
      "Parent, teacher and admin communication portals",
      "AI assistants for institutional knowledge and student support",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    intro:
      "Manufacturing efficiency lives in the details — materials, machines, maintenance and movement. We build systems that make plant operations visible, measurable and automated.",
    solutions: [
      "Production planning and shop-floor tracking systems",
      "Inventory and material management",
      "Maintenance and asset management systems",
      "Quality and compliance documentation platforms",
      "Vendor and procurement portals",
      "IoT and sensor data integration for line monitoring",
    ],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    icon: "cart",
    intro:
      "Retail is an operations game wearing a storefront. We build e-commerce platforms, omnichannel inventory systems and the back-office software that keeps promises to customers.",
    solutions: [
      "E-commerce platforms and storefronts",
      "Inventory and order management systems",
      "POS and store operations integration",
      "Customer loyalty and engagement platforms",
      "Warehouse and fulfillment workflow tools",
      "AI-assisted product search and customer support",
    ],
  },
  {
    slug: "it-technology",
    name: "IT & Technology",
    icon: "chip",
    intro:
      "Technology companies feel infrastructure pain first. We help IT teams and software companies ship faster and run more reliably — from DevOps platforms to product engineering support.",
    solutions: [
      "Kubernetes and container platform engineering",
      "CI/CD and release automation",
      "DevOps consulting and internal tooling",
      "Product engineering partnership for SaaS companies",
      "API platforms and integration engineering",
      "Observability, monitoring and incident tooling",
    ],
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    icon: "truck",
    intro:
      "Logistics runs on coordination under pressure. We build the systems that track vehicles, warehouses, shipments and documents — and automate the handoffs between them.",
    solutions: [
      "Fleet and shipment tracking systems",
      "Warehouse management applications",
      "Route and dispatch workflow tools",
      "Consignment, documentation and billing systems",
      "Customer tracking portals and notifications",
      "Data integration across carriers and partners",
    ],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "briefcase",
    intro:
      "Consultancies, agencies and service firms sell time and expertise. We build the systems that manage engagements, people and profitability — and the automation that removes administrative drag.",
    solutions: [
      "CRM and client engagement platforms",
      "Project, task and resource management systems",
      "Time tracking and billing systems",
      "Proposal and document automation",
      "Client portals and reporting dashboards",
      "AI assistants for internal knowledge and proposals",
    ],
  },
];
