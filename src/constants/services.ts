export type Service = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  short: string;
  icon: "code" | "layers" | "brain" | "server";
  intro: string;
  problem: string;
  solution: string;
  capabilities: string[];
  businessApplications: string[];
  deliverables: string[];
  ctaText: string;
  expertise: { label: string; items: string[] }[];
  methodology: { step: string; detail: string }[];
  outcomes: string[];
  engagementModels: { name: string; detail: string }[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    category: "Enterprise Software Engineering",
    headline: "Software Built Around the Way Your Business Works.",
    short:
      "We design and develop customized business applications that simplify operations, improve productivity, and support your organization's growth.",
    icon: "code",
    intro:
      "Off-the-shelf software forces your business to adapt to its limitations. We engineer software that adapts to your business — applications built around your processes, your data, and your growth plans.",
    problem:
      "Growing organizations accumulate process debt: spreadsheets acting as systems of record, disconnected tools that don't share data, and legacy applications nobody wants to touch. The cost is invisible but constant — duplicated work, delayed decisions, errors that need human patching, and reporting that always arrives too late. Buying another SaaS subscription rarely fixes this, because the underlying workflows are yours alone.",
    solution:
      "We design and build custom software that becomes the backbone of your operations — not another silo. Our engineers start from your business workflows, model them into clean data structures, and deliver applications that your teams actually adopt. Every system we build is documented, testable, and designed to evolve with you.",
    capabilities: [
      "Custom enterprise applications",
      "ERP development",
      "CRM development",
      "Billing and invoicing platforms",
      "Inventory management systems",
      "Business management applications",
      "Workflow automation",
      "Multi-tenant SaaS platforms",
      "API development and integrations",
      "Database architecture and optimization",
    ],
    businessApplications: [
      "Business process management",
      "Customer relationship management",
      "Financial and billing workflows",
      "Inventory and asset management",
      "Employee and operational portals",
      "Enterprise workflow systems",
    ],
    deliverables: [
      "Requirement analysis",
      "Technical architecture",
      "UI/UX design",
      "Application development",
      "API integrations",
      "Database implementation",
      "Testing and deployment",
      "Maintenance and enhancements",
    ],
    ctaText: "Explore Software Development",
    expertise: [
      {
        label: "Frontend",
        items: ["React", "React with Vite", "Create React App", "Bootstrap"],
      },
      {
        label: "Backend",
        items: ["Python", "Django", "Node.js", "Java"],
      },
      {
        label: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
      },
      {
        label: "Infrastructure",
        items: ["Docker", "Kubernetes", "Linux", "CI/CD", "Cloud Infrastructure"],
      },
    ],
    methodology: [
      { step: "Discovery & Consultation", detail: "We map your current workflows, systems and pain points with the people who live them daily." },
      { step: "Requirement Analysis", detail: "Define technical architecture, data model and integration boundaries before implementation." },
      { step: "Iterative Development", detail: "Working software is delivered in visible increments you can test and challenge." },
      { step: "Hardening & QA", detail: "Automated test suites, security audits and performance testing prior to release." },
      { step: "Deployment & Support", detail: "Smooth deployment into your infrastructure with documentation and long-term support." },
    ],
    outcomes: [
      "A single system of record instead of scattered spreadsheets and disconnected tools",
      "Faster, auditable operations with automation replacing error-prone manual handoffs",
      "Accurate real-time reporting that executive leadership can act on",
      "Software you own — zero per-seat licensing lock-in on your core business logic",
      "Scalable architecture that grows smoothly with transaction volume and team headcount",
    ],
    engagementModels: [
      {
        name: "Fixed-scope project delivery",
        detail: "Agreed scope, milestones and deliverables up front with clear accountability.",
      },
      {
        name: "Dedicated development team",
        detail: "An embedded engineering team working as a natural extension of your internal organization.",
      },
      {
        name: "Modernization program",
        detail: "Phased migration of legacy systems to modern React, Python, and cloud-native stacks.",
      },
    ],
  },
  {
    slug: "web-mobile-development",
    name: "Web & Mobile Application Development",
    category: "Digital Product Engineering",
    headline: "Create Powerful Digital Experiences for Every Device.",
    short:
      "We build responsive websites, modern web applications, customer portals, e-commerce platforms, and mobile applications that deliver seamless digital experiences.",
    icon: "layers",
    intro:
      "Your digital front door and daily customer interface deserve engineering quality and design craft in equal measure. We build web and mobile products that are fast, accessible, secure, and intuitive.",
    problem:
      "Slow, outdated web experiences cost real revenue: customers abandon clunky checkouts, mobile users bounce from non-responsive portals, and separate uncoordinated codebases for web, Android, and iOS drift apart with every sprint, multiplying maintenance costs and brand confusion.",
    solution:
      "We deliver high-performance web applications and mobile experiences with responsiveness and accessibility engineered in from the start. We keep your brand, APIs, and workflows in complete harmony across every screen, ensuring fast loading speeds, Core Web Vitals optimization, and high conversion.",
    capabilities: [
      "Corporate and business websites",
      "Responsive web applications",
      "Customer portals",
      "Enterprise dashboards",
      "E-commerce platforms",
      "Online marketplaces",
      "Android applications",
      "iOS applications",
      "Progressive Web Applications (PWA)",
      "UI/UX design and implementation",
      "Third-party API integrations",
    ],
    businessApplications: [
      "Customer self-service platforms",
      "Online business operations",
      "Digital commerce",
      "Recruitment portals",
      "Learning management systems",
      "Business dashboards",
      "Mobile workforce applications",
    ],
    deliverables: [
      "UI/UX design",
      "Responsive frontend",
      "Backend development",
      "API integrations",
      "Database implementation",
      "Cross-device testing",
      "Deployment and support",
    ],
    ctaText: "Explore Web & Mobile Development",
    expertise: [
      {
        label: "Frontend",
        items: ["React", "Vite", "Create React App", "Bootstrap", "Responsive UI"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Python", "Django", "Java"],
      },
      {
        label: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
      },
      {
        label: "Mobile & APIs",
        items: ["Android", "iOS", "PWAs", "REST APIs", "Web Performance"],
      },
    ],
    methodology: [
      { step: "User Journey & UX", detail: "Define customer flows, wireframes, and conversion objectives before writing code." },
      { step: "Design System & UI", detail: "Build reusable, accessible component libraries that ensure brand consistency." },
      { step: "Full-Stack Build", detail: "Responsive frontend paired with robust backend APIs and secure authentication." },
      { step: "Cross-Device Validation", detail: "Rigorous testing across actual Android, iOS, tablet, and desktop screens." },
      { step: "Launch & Analytics", detail: "Production deployment with Core Web Vitals benchmarking and event instrumentation." },
    ],
    outcomes: [
      "Fast, mobile-first experiences scoring high on Core Web Vitals and accessibility",
      "Accessible interfaces complying with modern WCAG standards across all screen sizes",
      "Measurably higher customer engagement and reduced drop-off rates",
      "Unified brand experience across web portals and mobile devices",
      "Maintainable codebase supported by clean component architecture",
    ],
    engagementModels: [
      {
        name: "Website / portal project",
        detail: "Full design-and-build engagements for corporate websites, e-commerce, and client portals.",
      },
      {
        name: "Mobile product build",
        detail: "End-to-end mobile engineering for Android and iOS, from UI prototyping to store release.",
      },
      {
        name: "Dedicated frontend sprint",
        detail: "Focused capacity to upgrade existing UI/UX, accelerate features, and optimize performance.",
      },
    ],
  },
  {
    slug: "ai-automation",
    name: "Artificial Intelligence & Automation",
    category: "Enterprise AI Solutions",
    headline: "Make Your Business Smarter with Applied AI.",
    short:
      "We develop intelligent AI applications and automation solutions that help organizations improve decision-making, reduce repetitive work, and unlock the value of their business data.",
    icon: "brain",
    intro:
      "AI creates value when it is wired into your actual workflows — your documents, your systems, your escalation paths. We build production-grade AI solutions with retrieval, governance, and human oversight designed in from day one.",
    problem:
      "Most corporate AI initiatives stall between pilot and production. Generic public chatbots hallucinate answers, risk confidential data leakage to third-party model trainers, lack access control, and cannot integrate with internal ERPs, runbooks, or service desks. Without strict grounding and governance, AI becomes a liability rather than an advantage.",
    solution:
      "We engineer AI systems around your organization's proprietary knowledge and operational processes: retrieval-augmented generation (RAG) grounded in your documentation, AI agents that act inside governed boundaries, and seamless integrations with ITSM, ticketing, and business databases. This same engineering powers our flagship enterprise products, WeCrew Copilot AI and WeCrew Ops.",
    capabilities: [
      "Enterprise AI assistants",
      "AI-powered chatbots",
      "Retrieval-Augmented Generation (RAG)",
      "AI agents and agentic workflows",
      "Enterprise knowledge management",
      "Document intelligence",
      "Intelligent workflow automation",
      "AI-powered analytics",
      "Custom AI application integration",
      "Business process automation",
      "AI API integration",
    ],
    businessApplications: [
      "Internal enterprise knowledge assistants",
      "IT operations assistance",
      "Customer support automation",
      "Document search and analysis",
      "Business intelligence",
      "Operational workflow automation",
      "Intelligent reporting",
    ],
    deliverables: [
      "AI use-case assessment",
      "Solution architecture",
      "Knowledge-source integration",
      "AI application development",
      "Workflow integration",
      "Testing and evaluation",
      "Deployment and ongoing optimization",
    ],
    ctaText: "Explore AI Solutions",
    expertise: [
      {
        label: "AI Architecture",
        items: ["RAG Pipelines", "LLM Integrations", "AI Agents", "Vector Search", "Source Citations"],
      },
      {
        label: "Backend & Data",
        items: ["Python", "Django", "Node.js", "React", "PostgreSQL", "MongoDB", "Redis"],
      },
      {
        label: "Governance",
        items: ["Role-Based Access Control", "Audit Logging", "Guardrails", "Data Sovereignty"],
      },
      {
        label: "Infrastructure",
        items: ["Self-Hosted Kubernetes", "Private VPC", "Docker", "Model Serving APIs"],
      },
    ],
    methodology: [
      { step: "Use-Case Assessment", detail: "Identify business workflows where AI delivers measurable, verifiable ROI." },
      { step: "Knowledge Structuring", detail: "Ingest and vectorize internal runbooks, SOPs, and documents with role-based access." },
      { step: "Prototype & Benchmarking", detail: "Test retrieval precision and response quality against real organizational queries." },
      { step: "Governance & Hardening", detail: "Implement audit trails, guardrails, and human-in-the-loop review controls." },
      { step: "Production Rollout", detail: "Deploy within your private infrastructure boundary with active monitoring." },
    ],
    outcomes: [
      "Accurate, source-cited answers your team can verify before taking action",
      "Up to 60% faster resolution of internal operations and customer inquiries",
      "Automation of repetitive document lookups, triage, and data extraction tasks",
      "Enterprise security: zero leakage of customer data to external training sets",
      "Flexible private hosting on your Kubernetes clusters or secure private cloud",
    ],
    engagementModels: [
      {
        name: "Custom AI solution build",
        detail: "Scoped engagement to design, build, and deploy custom RAG assistants or agent workflows.",
      },
      {
        name: "WeCrew Copilot AI rollout",
        detail: "Deployment and tailored integration of WeCrew Copilot AI for your internal IT and operations.",
      },
      {
        name: "AI readiness & audit sprint",
        detail: "Short evaluation of your data hygiene, security boundaries, and high-impact AI use cases.",
      },
    ],
  },
  {
    slug: "devops-infrastructure",
    name: "DevOps, Cloud & Infrastructure",
    category: "Infrastructure Engineering & Platform Operations",
    headline: "Build Reliable Infrastructure. Deploy with Confidence.",
    short:
      "We help businesses build, deploy, monitor, and maintain secure and scalable infrastructure through modern DevOps practices, containerization, Kubernetes, automation, and observability.",
    icon: "server",
    intro:
      "Software that is not operated reliably is software at risk. We build, harden, and run the infrastructure underneath your business systems — cloud, on-premises, or hybrid — with automation, observability, and disciplined support.",
    problem:
      "Infrastructure bottlenecks surface as frequent downtime, fragile manual deployments, slow release cycles, and spiraling cloud bills. When staging doesn't match production, bugs slip past reviews. And when server configurations are unversioned tribal knowledge, single points of human failure put the entire company at risk.",
    solution:
      "We bring platform engineering rigor to your operations: Infrastructure as Code (IaC), containerized microservices orchestrated on Kubernetes, automated CI/CD pipelines, and proactive observability that catches anomalies before customers do. Whether you operate on AWS, GCP, Azure, bare-metal Linux, or private data centers, we build for high availability, security, and developer velocity.",
    capabilities: [
      "DevOps consulting",
      "CI/CD pipeline implementation",
      "Docker containerization",
      "Kubernetes architecture and deployment",
      "Linux server administration",
      "Cloud infrastructure management",
      "On-premises infrastructure",
      "Hybrid infrastructure",
      "Infrastructure automation",
      "Monitoring and observability",
      "Application deployment",
      "Performance optimization",
      "Backup and disaster recovery planning",
      "Infrastructure security hardening",
    ],
    businessApplications: [
      "Application modernization",
      "Reliable production deployments",
      "Infrastructure migration",
      "Kubernetes platform operations",
      "Automated release management",
      "Infrastructure monitoring",
      "High-availability architecture",
    ],
    deliverables: [
      "Infrastructure assessment",
      "Architecture design",
      "Deployment automation",
      "Containerization",
      "Kubernetes implementation",
      "Monitoring configuration",
      "Operational documentation",
      "Maintenance and support",
    ],
    ctaText: "Explore DevOps Services",
    expertise: [
      {
        label: "Containerization",
        items: ["Docker", "Kubernetes", "Helm", "Container Security"],
      },
      {
        label: "Operating Systems",
        items: ["Linux (Ubuntu, Debian, RHEL)", "Server Hardening", "Kernel Tuning"],
      },
      {
        label: "CI/CD & Automation",
        items: ["Automated Pipelines", "Build & Release Workflows", "Infrastructure as Code"],
      },
      {
        label: "Cloud & Observability",
        items: ["Cloud Infrastructure", "VPS & Hybrid", "Prometheus", "Grafana", "Log Aggregation"],
      },
    ],
    methodology: [
      { step: "Infrastructure Assessment", detail: "Audit current infrastructure topology, release bottlenecks, and security gaps." },
      { step: "Architecture & Sizing", detail: "Design resilient containerized architecture with high-availability failover." },
      { step: "Pipeline Automation", detail: "Build automated CI/CD workflows for repeatable, zero-downtime deployments." },
      { step: "Observability & Alerting", detail: "Configure metrics, tracing, and alert channels for proactive incident prevention." },
      { step: "Operations & Handover", detail: "Provide operational runbooks, team training, and ongoing platform maintenance." },
    ],
    outcomes: [
      "Boring, repeatable releases with automated testing and zero unexpected downtime",
      "Predictable infrastructure costs with right-sized compute and automated scaling",
      "Full visibility into application health, latency percentiles, and resource utilization",
      "Parity between staging and production environments, eliminating release surprises",
      "Tested backup procedures and verifiable disaster recovery recovery-point objectives",
    ],
    engagementModels: [
      {
        name: "Platform architecture build",
        detail: "Greenfield design or total overhaul of cloud infrastructure, Kubernetes, and CI/CD pipelines.",
      },
      {
        name: "Managed DevOps & support",
        detail: "Continuous platform administration, security patching, and SLA-backed operational response.",
      },
      {
        name: "DevOps advisory & coaching",
        detail: "Hands-on engineering consulting to upskill internal teams on containerization and GitOps.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
