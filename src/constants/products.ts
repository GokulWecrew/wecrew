export interface ProductCapability {
  title: string;
  description: string;
}

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  route: string;
  externalUrl: string;
  docsUrl?: string;
  category: string;
  eyebrow: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  accent: "cyan" | "blue" | "coral";
  accentHex: string;
  badge: string;
  capabilities: string[];
  keyHighlights: {
    title: string;
    description: string;
  }[];
}

export const copilotAI: ProductItem = {
  id: "copilot-ai",
  name: "WeCrew Copilot AI",
  slug: "copilot-ai",
  route: "/products/copilot-ai",
  externalUrl: "https://kt.copilot.wecrew.in",
  docsUrl: "https://kt.copilot.wecrew.in",
  category: "Enterprise AI Assistant",
  eyebrow: "Enterprise Knowledge & Operations",
  tagline: "Your Enterprise AI Assistant for IT, DevOps & Business Operations",
  shortDescription:
    "Connect organizational knowledge, technical documentation, operational workflows, and intelligent assistance through one enterprise AI platform.",
  fullDescription:
    "An enterprise knowledge copilot with retrieval-augmented generation, integrated ITSM workflows, and self-hosted Kubernetes deployment — answers your team can verify, with sources cited.",
  accent: "cyan",
  accentHex: "#00E5FF",
  badge: "Enterprise AI Assistant",
  capabilities: [
    "AI-powered enterprise knowledge assistant",
    "Internal SOP & technical documentation search",
    "Source-cited answers your team can verify",
    "Integrated ITSM workflows & incident management",
    "Root cause analysis assistance",
    "Intelligent observability integrations",
    "AI agents and automation",
    "Enterprise access control & audit logging",
  ],
  keyHighlights: [
    {
      title: "Grounded Knowledge",
      description: "Indexed across runbooks, wikis, tickets, and internal docs with source citations.",
    },
    {
      title: "ITSM Integration",
      description: "Direct action workflows for incident triaging, escalation, and postmortem drafting.",
    },
    {
      title: "Private Cluster Deployment",
      description: "Runs within your Kubernetes boundary — your enterprise data stays in your control.",
    },
  ],
};

export const sentinel: ProductItem = {
  id: "sentinel",
  name: "WeCrew Sentinel",
  slug: "sentinel",
  route: "/products/sentinel",
  externalUrl: "https://sentinel.wecrew.in/",
  docsUrl: "https://sentinel.wecrew.in/",
  category: "API Security Platform",
  eyebrow: "Full Life Cycle API Security",
  tagline: "Full Life Cycle API Security Platform — Discover, Test, Protect",
  shortDescription:
    "Discover, test, and protect your APIs with live API discovery, continuous automated testing, and runtime protection. Evidence before action, protection before breach.",
  fullDescription:
    "A full life cycle API security platform that discovers shadow and zombie APIs, validates vulnerabilities before release, and blocks attacks in production without breaking developer velocity.",
  accent: "blue",
  accentHex: "#3D8BFF",
  badge: "API Security Platform",
  capabilities: [
    "Live API discovery & inventory mapping",
    "Continuous automated security testing",
    "Runtime API protection & threat blocking",
    "Full life cycle coverage across CI/CD and production",
    "Sensitive data exposure prevention (PII/tokens)",
    "Compliance validation & audit-ready evidence",
  ],
  keyHighlights: [
    {
      title: "Live Discovery",
      description: "Every API endpoint in your estate identified dynamically, eliminating shadow APIs.",
    },
    {
      title: "Continuous Testing",
      description: "Pre-production validation against OWASP API Top 10 vulnerabilities.",
    },
    {
      title: "Runtime Defense",
      description: "Zero-latency threat mitigation in front of critical customer workloads.",
    },
  ],
};

export const wecrewOps: ProductItem = {
  id: "wecrew-ops",
  name: "WeCrew Ops",
  slug: "wecrew-ops",
  route: "/products/wecrew-ops",
  externalUrl: "https://sovereign.ops.wecrew.in/",
  docsUrl: "https://sovereign.ops.wecrew.in/docs",
  category: "Enterprise Agent Operations Platform",
  eyebrow: "Enterprise Agent Operations OS",
  tagline: "Your Agent Estate. One Intelligent Command Plane.",
  shortDescription:
    "Bring agent fleets, identities, incidents, telemetry, governance, and evidence-backed investigations together through one secure enterprise operations platform.",
  fullDescription:
    "A secure enterprise agent operations OS for fleet visibility, agent identity, governance, incident investigation, and evidence-backed operations — deployed on your own infrastructure.",
  accent: "coral",
  accentHex: "#E05D44",
  badge: "Agent Operations Platform",
  capabilities: [
    "Global Command Centre: Cross-tenant agent fleet visibility, health & spend",
    "Agent Passports: Trust scores, autonomy levels, token budgets & identity",
    "Live Telemetry: CPU, latency, error rates, throughput & threshold alerts",
    "Evidence & RCA: Hash-verified evidence artefacts & source-backed reports",
    "Policy & Approvals: Evaluation queues, escalation flows & reviewable ops",
    "Read-Only Operations: Zero shell access, no cluster-admin, no secret reads",
    "Enterprise Deployment: Container-based, customer-managed private infrastructure",
  ],
  keyHighlights: [
    {
      title: "Command Plane",
      description: "Unified visibility across multi-tenant agent fleets, SLAs, and token spend.",
    },
    {
      title: "Agent Passports",
      description: "Cryptographic identities, trust scores, and hard autonomy boundary enforcement.",
    },
    {
      title: "Hash-Verified RCA",
      description: "Audit-ready evidence artefacts citing real source events without hallucination.",
    },
    {
      title: "Read-Only by Design",
      description: "Engineered with zero shell, zero secret-reading, and zero unreviewed remediation.",
    },
  ],
};

export const allProducts: ProductItem[] = [copilotAI, sentinel, wecrewOps];

export const productComparison = [
  {
    feature: "Core Focus",
    copilot: "Enterprise knowledge & IT operations intelligence",
    sentinel: "Full life cycle API discovery, testing & protection",
    ops: "Enterprise agent fleet visibility, governance & investigation",
  },
  {
    feature: "Primary Asset Governed",
    copilot: "Organizational documentation, runbooks & ITSM tickets",
    sentinel: "API endpoints, schemas & HTTP/gRPC transactions",
    ops: "Autonomous AI agent fleets, passports & telemetry",
  },
  {
    feature: "Target Personas",
    copilot: "IT Operations, DevOps, Engineering Support, SRE",
    sentinel: "AppSec, Security Engineers, API Platform Teams",
    ops: "SRE, Platform Engineering, SecOps, Governance, Compliance",
  },
  {
    feature: "Investigation Capability",
    copilot: "RAG-driven Q&A citing internal postmortems & runbooks",
    sentinel: "Vulnerability proofs, attack traces & schema drifts",
    ops: "Hash-verified evidence artefacts & root-cause reports",
  },
  {
    feature: "Access Model",
    copilot: "Enterprise RBAC & SSO integration",
    sentinel: "Scoped security scanner & inline proxy tokens",
    ops: "Strict read-only console (Viewer, Operator, Admin, Owner)",
  },
  {
    feature: "Deployment Model",
    copilot: "Self-hosted Kubernetes deployment",
    sentinel: "Container-native proxy or sidecar deployment",
    ops: "Customer-managed container / private cluster infrastructure",
  },
];
