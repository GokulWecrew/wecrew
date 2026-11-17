export const site = {
  name: "WeCrew",
  legalName: "WeCrew Technologies Private Limited",
  tagline: "Engineering Intelligent Solutions. Empowering Business Growth.",
  url: "https://wecrew.in",
  email: "support@wecrew.in",
  description:
    "WeCrew Technologies helps businesses accelerate innovation through enterprise software, AI-powered solutions, intelligent automation, and scalable digital infrastructure.",
  products: {
    copilot: "https://kt.copilot.wecrew.in",
    sentinel: "https://sentinel.wecrew.in/",
    ops: "https://sovereign.ops.wecrew.in/",
    opsDocs: "https://sovereign.ops.wecrew.in/docs",
  },
} as const;

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "WeCrew Copilot AI",
        href: "/products/copilot-ai",
        description: "Enterprise AI assistant for IT, DevOps & business operations",
      },
      {
        label: "WeCrew Sentinel",
        href: "/products/sentinel",
        description: "Full life cycle API security platform",
      },
      {
        label: "WeCrew Ops",
        href: "/products/wecrew-ops",
        description: "Enterprise agent operations OS for fleet visibility, passports & governance",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Custom Software Development",
        href: "/services/custom-software-development",
        description: "Enterprise applications, ERP/CRM, billing, workflows",
      },
      {
        label: "Web & Mobile Development",
        href: "/services/web-mobile-development",
        description: "Web apps, portals, e-commerce, Android & iOS",
      },
      {
        label: "AI & Automation",
        href: "/services/ai-automation",
        description: "Enterprise AI assistants, RAG, AI agents, analytics",
      },
      {
        label: "DevOps & Infrastructure",
        href: "/services/devops-infrastructure",
        description: "Cloud & on-prem, Kubernetes, CI/CD, observability",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
];

export const serviceOptions = [
  { value: "Custom Software Development", label: "Custom Software" },
  { value: "Web & Mobile Application Development", label: "Web & Mobile Apps" },
  { value: "Artificial Intelligence & Automation", label: "AI & Automation" },
  { value: "IT Infrastructure, DevOps & Support", label: "IT, DevOps & Support" },
  { value: "Product / Platform Engagement (Copilot AI or Sentinel)", label: "Copilot AI / Sentinel" },
  { value: "Other / Not sure yet", label: "Other / Not sure yet" },
];

export const budgetOptions = [
  "Under ₹5 lakh",
  "₹5–25 lakh",
  "₹25 lakh–1 crore",
  "Above ₹1 crore",
  "Prefer not to say",
];
