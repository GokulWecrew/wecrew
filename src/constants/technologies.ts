export interface TechnologyItem {
  name: string;
  category: "frontend" | "backend" | "database" | "devops";
  description: string;
  badge?: string;
  highlight?: string;
}

export interface TechnologyCategory {
  id: "frontend" | "backend" | "database" | "devops";
  label: string;
  shortDescription: string;
  items: TechnologyItem[];
}

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    shortDescription: "Modern, responsive, accessible interfaces engineered with performance and clean architecture.",
    items: [
      {
        name: "React",
        category: "frontend",
        description: "Declarative component-driven UI library for building scalable, high-performance web applications.",
        highlight: "Primary UI Foundation",
      },
      {
        name: "Vite",
        category: "frontend",
        description: "Next-generation frontend tooling providing lightning-fast HMR and optimized production bundling.",
        highlight: "Modern Build Engine",
      },
      {
        name: "Create React App",
        category: "frontend",
        description: "Stable, established toolchain maintained for supporting and modernizing existing enterprise React codebases.",
        highlight: "Legacy & Stable Apps",
      },
      {
        name: "Bootstrap",
        category: "frontend",
        description: "Responsive CSS framework utilized for rapid enterprise prototyping, administrative panels, and corporate layouts.",
        highlight: "Responsive Grid & Forms",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    shortDescription: "Robust, secure, and maintainable server-side architectures engineered for business logic and high concurrency.",
    items: [
      {
        name: "Python",
        category: "backend",
        description: "Versatile, clean programming language powering enterprise backend services, data processing, and AI integrations.",
        highlight: "Core Engineering Language",
      },
      {
        name: "Django",
        category: "backend",
        description: "High-level Python web framework providing rapid development, robust ORM security, and clean administrative interfaces.",
        highlight: "Enterprise Web Framework",
      },
      {
        name: "Java",
        category: "backend",
        description: "Strongly typed, mature runtime built for mission-critical enterprise systems, banking workflows, and large-scale services.",
        highlight: "Enterprise Core Systems",
      },
      {
        name: "Node.js",
        category: "backend",
        description: "High-throughput asynchronous JavaScript runtime optimized for microservices, real-time gateways, and RESTful APIs.",
        highlight: "Event-Driven APIs",
      },
    ],
  },
  {
    id: "database",
    label: "Database & Caching",
    shortDescription: "Structured, relational, document, and in-memory data platforms chosen for ACID guarantees and speed.",
    items: [
      {
        name: "PostgreSQL",
        category: "database",
        description: "Advanced open-source object-relational database renowned for ACID compliance, reliability, and complex queries.",
        highlight: "Primary Relational DB",
      },
      {
        name: "MySQL",
        category: "database",
        description: "Proven, reliable relational database system widely deployed for high-throughput transactional and e-commerce platforms.",
        highlight: "Transactional Reliability",
      },
      {
        name: "MongoDB",
        category: "database",
        description: "Flexible, scalable document-based NoSQL database built for semi-structured data, catalogues, and audit logs.",
        highlight: "Document Store",
      },
      {
        name: "Redis",
        category: "database",
        description: "Ultra-fast in-memory key-value data store used for distributed caching, session storage, and rate-limiting queues.",
        highlight: "In-Memory Speed",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Infrastructure",
    shortDescription: "Container platforms, orchestration, automated pipelines, and private infrastructure operations.",
    items: [
      {
        name: "Docker",
        category: "devops",
        description: "Containerization platform delivering uniform application packaging and seamless staging-to-production parity.",
        highlight: "Container Standard",
      },
      {
        name: "Kubernetes",
        category: "devops",
        description: "Production-grade container orchestration system providing automated scaling, rolling updates, and self-healing.",
        highlight: "Platform Orchestration",
      },
      {
        name: "Linux",
        category: "devops",
        description: "Rock-solid, hardened operating system foundation underlying cloud servers, containers, and edge clusters.",
        highlight: "Server Foundation",
      },
      {
        name: "CI/CD Automation",
        category: "devops",
        description: "Continuous integration and delivery pipelines automating linting, security scans, test execution, and deployments.",
        highlight: "Release Engineering",
      },
      {
        name: "Cloud Infrastructure",
        category: "devops",
        description: "Multi-cloud, VPS, on-premises, and hybrid architectures engineered with cost-efficiency, security, and uptime in mind.",
        highlight: "Hybrid & Cloud Ops",
      },
    ],
  },
];
