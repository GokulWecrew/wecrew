import { useState, type FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  AlertCircle,
  AlertTriangle,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Database,
  FileCheck2,
  FileCode,
  FileSearch,
  FileText,
  GitBranch,
  HelpCircle,
  Layers,
  ListChecks,
  Lock,
  LockKeyhole,
  MessageSquare,
  MessagesSquare,
  MonitorDot,
  Network,
  RefreshCw,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, PageHero, SectionHeading, buttonClass } from "@/components/ui";
import { site } from "@/constants/site";
import { copilotAI } from "@/constants/products";

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WeCrew Copilot AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Kubernetes / Container Runtime",
  url: `${site.url}/products/copilot-ai`,
  description:
    "Enterprise AI assistant for IT, DevOps, and operations: RAG-based knowledge search with source-cited answers, ITSM workflows, incident management, and self-hosted Kubernetes deployment.",
  publisher: { "@type": "Organization", name: site.legalName },
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
    { "@type": "ListItem", position: 3, name: "WeCrew Copilot AI", item: `${site.url}/products/copilot-ai` },
  ],
};

const businessChallenges = [
  {
    icon: FileSearch,
    title: "Knowledge is Fragmented & Siloed",
    text: "Operational knowledge lives scattered across wikis, Notion, Jira tickets, Git repositories, and senior engineers' memories. Every lookup costs high-friction interruptions.",
  },
  {
    icon: Siren,
    title: "Incidents Outpace 40-Page Runbooks",
    text: "At 2 a.m. during a P1 outage, engineers cannot spend 20 minutes skimming dense PDF runbooks. Teams need immediate, context-aware diagnostic steps.",
  },
  {
    icon: ShieldAlert,
    title: "Generic Public AI Cannot Be Trusted",
    text: "Public consumer LLMs hallucinate CLI commands, leak confidential code to third-party trainers, and lack enterprise access controls or verifiable source citations.",
  },
  {
    icon: Users,
    title: "Tribal Knowledge Leaves with Departures",
    text: "When experienced SREs and leads transition, undocumented recovery tricks, architecture quirks, and tribal troubleshooting intuition vanish with them.",
  },
  {
    icon: Workflow,
    title: "Disconnected ITSM Systems",
    text: "Service desks, monitoring alarms, and knowledge bases live in separate tabs, forcing engineers to manually copy-paste logs, tickets, and runbook URLs.",
  },
  {
    icon: LockKeyhole,
    title: "Strict Data Sovereignty Mandates",
    text: "Regulated enterprises in banking, healthcare, and defence cannot upload proprietary infrastructure topologies and API credentials to public cloud AI vendors.",
  },
];

interface ChatScenario {
  id: string;
  title: string;
  badge: string;
  knowledgeBase: string;
  query: string;
  sources: { title: string; docId: string; page: string }[];
  steps: { action: string; command?: string; note?: string }[];
  incidentContext?: string;
}

const chatScenarios: ChatScenario[] = [
  {
    id: "api-503",
    title: "API 503 Ingress Troubleshooting",
    badge: "SRE / Production",
    knowledgeBase: "Kubernetes SOPs & Ingress Runbook v4.2",
    query: "How do I troubleshoot API 503 Service Unavailable errors on the ingress gateway?",
    sources: [
      { title: "K8s Ingress Controller Architecture SOP", docId: "SOP-K8S-042", page: "Section 3.2" },
      { title: "Post-Mortem: Gateway Connection Pool Starvation", docId: "INC-8821", page: "Root Cause Appendix" },
    ],
    incidentContext: "Correlated with active alert: Ingress Gateway Error Rate > 4.5%",
    steps: [
      {
        action: "1. Inspect upstream endpoint availability to confirm backend pod reachability",
        command: "kubectl get endpoints -n production -l app.kubernetes.io/name=api-gateway",
        note: "If endpoints show 0/0 ready, verify backend deployment readiness probes.",
      },
      {
        action: "2. Check NGINX ingress controller active worker connection limits and saturation",
        command: "kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail=100 | grep '503'",
        note: "Look for 'upstream timed out (110: Connection timed out)' or 'no live upstreams'.",
      },
      {
        action: "3. Verify PostgreSQL connection pool limits if backend services are stalling",
        command: "kubectl exec -it deployment/api-gateway -n production -- env | grep POOL_MAX",
        note: "Default pool limit is 25 connections per replica. Scale if pool saturation is >90%.",
      },
    ],
  },
  {
    id: "k8s-upgrade",
    title: "Zero-Downtime Node Upgrade",
    badge: "Platform / DevOps",
    knowledgeBase: "Cluster Maintenance & Worker Drainage Standards",
    query: "What is the procedure for zero-downtime Kubernetes cluster node upgrades?",
    sources: [
      { title: "EKS / Self-Hosted Node Pool Maintenance Policy", docId: "SOP-INFRA-109", page: "Page 8" },
      { title: "Pod Disruption Budget (PDB) Enactment Guide", docId: "ARCH-K8S-014", page: "Section 2" },
    ],
    incidentContext: "Automated pre-flight checks: PDBs verified across 18 critical deployments",
    steps: [
      {
        action: "1. Cordon the target worker node to prevent new pod scheduling",
        command: "kubectl cordon node-prod-worker-04b.internal",
        note: "Ensures no new pods land on the maintenance target during eviction.",
      },
      {
        action: "2. Gracefully drain workloads respecting PodDisruptionBudgets",
        command: "kubectl drain node-prod-worker-04b.internal --ignore-daemonsets --delete-emptydir-data",
        note: "Drain respects minAvailable and maxUnavailable limits automatically.",
      },
      {
        action: "3. Verify evacuated pods reach Running state on alternate workers before updating AMI",
        command: "kubectl get pods -A --field-selector spec.nodeName!=node-prod-worker-04b.internal",
        note: "Confirm all ingress and Redis pods remain quorum healthy.",
      },
    ],
  },
  {
    id: "db-pool",
    title: "DB Connection Pool Saturation",
    badge: "Database / DBA",
    knowledgeBase: "PostgreSQL Production Tuning & PgBouncer Ops",
    query: "Explain connection pool exhaustion in the primary database and recommended pool size.",
    sources: [
      { title: "Enterprise Database Concurrency Guide", docId: "DB-SOP-204", page: "Section 4.1" },
      { title: "PgBouncer Sizing Benchmark", docId: "PERF-DB-077", page: "Table 3" },
    ],
    incidentContext: "Active metric: Primary DB client connections reached 192 / 200 limit",
    steps: [
      {
        action: "1. Query active client connections grouped by state and application name",
        command: "SELECT application_name, state, count(*) FROM pg_stat_activity GROUP BY 1, 2 ORDER BY 3 DESC;",
        note: "Identify idle-in-transaction connections blocking worker slots.",
      },
      {
        action: "2. Verify PgBouncer pooling mode (Transaction Pooling vs Session Pooling)",
        command: "SHOW POOLS;",
        note: "Transaction pooling reduces client overhead by up to 85% for short web transactions.",
      },
      {
        action: "3. Recommended sizing formula based on CPU core count",
        note: "Optimal pool size = ((Core_Count * 2) + Effective_Spindle_Count). For 16 vCPU nodes, set max_client_conn = 1000 with default_pool_size = 40.",
      },
    ],
  },
  {
    id: "onboarding-iam",
    title: "Client Onboarding IAM Review",
    badge: "Security / Identity",
    knowledgeBase: "Multi-Tenant Enterprise IAM & RBAC Guidelines",
    query: "Review client onboarding runbook and required IAM role mappings.",
    sources: [
      { title: "Customer Workspace Provisioning Runbook", docId: "SEC-ONBOARD-01", page: "Page 4" },
      { title: "OIDC & SAML 2.0 Identity Federation Standard", docId: "SEC-IDP-088", page: "Section 1.4" },
    ],
    incidentContext: "Compliance scope: SOC 2 Type II least privilege enforcement",
    steps: [
      {
        action: "1. Validate tenant directory creation in the enterprise partition",
        command: "copilot-ctl tenant verify --tenant-id acme-corp-prod",
        note: "Ensures cryptographic isolation of tenant vector namespace and documents.",
      },
      {
        action: "2. Map enterprise Okta / Azure AD security groups to internal RBAC roles",
        note: "Groups: 'DevOps-Admins' -> Operator Role; 'DevOps-Viewers' -> Viewer Role; 'Auditors' -> Audit Role.",
      },
      {
        action: "3. Provision scoped API tokens with 90-day automatic rotation",
        note: "Tokens must have read-only permissions for production monitoring endpoints.",
      },
    ],
  },
];

const capabilities = [
  {
    id: "ask",
    icon: MessagesSquare,
    title: "Ask Copilot — Grounded AI Assistant",
    subtitle: "RAG with Source Citations",
    description:
      "Ask natural-language questions and receive structured, step-by-step answers strictly grounded in your enterprise documentation, runbooks, and past incident histories.",
    points: [
      "Multi-document semantic search with hybrid lexical matching",
      "Exact source citations citing document ID, title, and section",
      "No speculative fabrication — states when information is missing",
      "Direct verification links to inspect underlying documentation",
    ],
  },
  {
    id: "runbooks",
    icon: ListChecks,
    title: "L2 Runbook & Operations Assistant",
    subtitle: "Interactive Diagnostic Checklists",
    description:
      "Transform static 50-page markdown or PDF runbooks into guided, interactive troubleshooting checklists with exact CLI commands and safety checks.",
    points: [
      "Step-by-step diagnostic workflows during active incidents",
      "Interactive checklists tracking completed remediation actions",
      "Contextual warnings before running high-risk commands",
      "Pre-calculated sizing formulas and configuration parameters",
    ],
  },
  {
    id: "logs",
    icon: Terminal,
    title: "Intelligent Log & Error Analysis",
    subtitle: "Context-Aware Trace Correlation",
    description:
      "Attach stack traces, NGINX access logs, or Kubernetes pod logs to immediately correlate error signatures against known issues and historical postmortems.",
    points: [
      "Automated error signature clustering and root cause classification",
      "Correlation with historical incident tickets and resolutions",
      "Streaming log parsing without sending sensitive tokens external",
      "Fast identification of connection timeouts, OOM kills, and 5xx spikes",
    ],
  },
  {
    id: "itsm",
    icon: Workflow,
    title: "Integrated ITSM Workflows",
    subtitle: "Incidents, Changes & CMDB",
    description:
      "Copilot works directly inside your IT Service Management workflows — bridging knowledge search with active Jira, ServiceNow, and internal ticket queues.",
    points: [
      "Link active incident tickets directly to recommended runbooks",
      "Draft structured postmortem reports and timeline summaries",
      "Surface risk factors for upcoming production change requests",
      "Query CMDB asset dependencies and service owners via natural language",
    ],
  },
  {
    id: "knowledge",
    icon: BookOpenCheck,
    title: "Document Ingestion & Knowledge Base",
    subtitle: "Continuous Multi-Format Sync",
    description:
      "Automatically parse, chunk, vectorize, and index documentation across markdown files, PDFs, Confluence spaces, Git repositories, and ticket archives.",
    points: [
      "Native parsers for Markdown, OpenAPI/Swagger, PDF, and HTML",
      "Hierarchical chunking preserving headers, tables, and code snippets",
      "Automated incremental re-indexing when documents update",
      "Role-scoped document access matching team enterprise permissions",
    ],
  },
  {
    id: "agents",
    icon: Network,
    title: "AI Agents & Governed Automation",
    subtitle: "Safe Execution Boundaries",
    description:
      "Empower specialized AI agents to execute routine diagnostics and read-only operational inquiries within strictly audited, customer-defined guardrails.",
    points: [
      "Zero unsupervised mutations — requires human approval for state changes",
      "Explicit tool allowlists restricting executable shell commands",
      "Tamper-proof execution audit log recording prompt and action",
      "Circuit breakers cutting off recursive loops and runaway token spend",
    ],
  },
  {
    id: "architecture",
    icon: Server,
    title: "Self-Hosted Kubernetes Deployment",
    subtitle: "Customer-Managed Infrastructure",
    description:
      "Deploy Copilot AI inside your own AWS EKS, GCP GKE, Azure AKS, or on-premises Red Hat OpenShift clusters. Your sensitive operational data never leaves your VPC.",
    points: [
      "Production-ready Helm charts with horizontal pod autoscaling",
      "Private vector store integration (pgvector, Milvus, Qdrant)",
      "Compatible with self-hosted private LLMs or enterprise cloud APIs",
      "Air-gapped and disconnected network installation ready",
    ],
  },
  {
    id: "security",
    icon: LockKeyhole,
    title: "Enterprise Access Control & Auditability",
    subtitle: "Zero Third-Party Training",
    description:
      "Enforce granular role-based access control matching enterprise identity providers (Okta, Azure AD, SAML 2.0). Answers strictly respect the user's data access rights.",
    points: [
      "Strict data isolation between departments and business units",
      "Complete cryptographic audit logging of every query and answer",
      "Zero customer data used for model training or retained externally",
      "SOC 2, ISO 27001, and HIPAA compliance governance alignment",
    ],
  },
];

const teamValue = [
  {
    role: "SRE & DevOps Engineers",
    badge: "Reliability & MTTR",
    points: [
      "Cut incident Mean Time to Resolution (MTTR) by up to 60%",
      "Eliminate 20-minute runbook searches during high-severity 2 a.m. calls",
      "Execute guided diagnostic checklists with pre-verified commands",
      "Auto-generate comprehensive incident postmortems and timelines",
    ],
  },
  {
    role: "IT Service Desk & Support",
    badge: "First-Contact Resolution",
    points: [
      "Deflect routine L1 and L2 inquiries with grounded self-service answers",
      "Onboard new support technicians 3x faster with instant SOP lookups",
      "Standardize troubleshooting procedures across distributed shifts",
      "Prevent ticket escalations caused by outdated documentation",
    ],
  },
  {
    role: "CISO & Security Architects",
    badge: "Sovereignty & Governance",
    points: [
      "100% self-hosted deployment within your private Kubernetes boundary",
      "Zero data leakage to external commercial LLM model training sets",
      "Granular RBAC ensures users only receive answers they have rights to see",
      "Complete query audit trails with source document citations",
    ],
  },
  {
    role: "Engineering & IT Leaders",
    badge: "Compounding Knowledge",
    points: [
      "Transform scattered wikis and hero culture into collective assets",
      "Protect against knowledge loss when senior engineering veterans depart",
      "Quantify knowledge base health, search patterns, and documentation gaps",
      "Single intelligent platform unifying docs, ITSM, and operational diagnostics",
    ],
  },
];

const comparisonMatrix = [
  {
    feature: "Deployment Location",
    publicAi: "Public multi-tenant cloud vendor",
    copilotAi: "100% Self-Hosted in your private VPC / Kubernetes cluster",
  },
  {
    feature: "Data Sovereignty & Training",
    publicAi: "Inputs may be logged or used to train vendor models",
    copilotAi: "Zero external transmission. Never trained on customer data",
  },
  {
    feature: "Source Verification",
    publicAi: "Hallucinates answers without verifiable provenance",
    copilotAi: "Strict RAG citing exact Document ID, title, and section",
  },
  {
    feature: "Access Control (RBAC)",
    publicAi: "All-or-nothing access to general internet knowledge",
    copilotAi: "Enterprise SSO/SAML integration respecting user permissions",
  },
  {
    feature: "ITSM & Incident Integration",
    publicAi: "Isolated browser chat box with zero operational context",
    copilotAi: "Native integration with Incidents, Change Requests & CMDB",
  },
  {
    feature: "Diagnostic Command Safety",
    publicAi: "Suggests generic, unverified, or dangerous bash commands",
    copilotAi: "Pre-validated commands with interactive L2 runbook checklists",
  },
];

export const CopilotAIPage: FC = () => {
  const [activeScenario, setActiveScenario] = useState<ChatScenario>(chatScenarios[0]);
  const [activeTab, setActiveTab] = useState<string>("ask");
  const [activeChecklistState, setActiveChecklistState] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
  });

  const toggleChecklist = (idx: number) => {
    setActiveChecklistState((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const pageTitle = `WeCrew Copilot AI — Enterprise AI Knowledge & Operations Platform — ${site.name} Technologies`;
  const pageDescription =
    "WeCrew Copilot AI is an enterprise AI assistant for IT, DevOps, and operations: RAG-based knowledge search with source-cited answers, ITSM workflows, incident management, and self-hosted Kubernetes deployment.";
  const canonicalUrl = `${site.url}/products/copilot-ai`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* SECTION 01 — HERO */}
      <section className="relative overflow-hidden bg-hero pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
        {/* Ambient Cyan / Blue Glow */}
        <div
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(0,229,255,0.45), transparent)" }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>Enterprise AI Knowledge &amp; Operations Platform</span>
            </div>

            <h1 className="display-1 mt-6 text-white font-display">
              Your Enterprise Knowledge.{" "}
              <span className="text-gradient">One Intelligent Copilot.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl">
              Connect your documentation, runbooks, logs, and ITSM workflows into a governed AI
              assistant. Source-cited answers your team can verify, operating self-hosted on your
              private Kubernetes infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={copilotAI.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Open Live Portal</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <Link
                to="/contact#consultation"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>Request Enterprise Demo</span>
                <ArrowRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/60 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                Self-Hosted on Kubernetes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                Grounded RAG with Citations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                ITSM &amp; Runbook Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                Zero Training on Your Data
              </span>
            </div>
          </div>

          {/* REALISTIC COPILOT OPERATIONS DASHBOARD (SCREENSHOT 01 INSPIRED) */}
          <div className="mt-14 rounded-2xl border border-white/15 bg-navy-950/90 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
            {/* Window chrome header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-xs text-white/70">
                  kt.copilot.wecrew.in/operations
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-cyan-500/20 border border-cyan-400/40 px-2.5 py-1 text-xs font-mono font-semibold text-cyan-300">
                  PRODUCTION K8S CLUSTER
                </span>
                <span className="text-xs text-white/40 font-mono hidden sm:inline">
                  Role: Senior SRE / L2 Lead
                </span>
              </div>
            </div>

            {/* Dashboard Navigation Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 text-xs font-medium text-white/70 overflow-x-auto">
              <span className="rounded-md bg-cyan-500/20 text-cyan-300 px-3 py-1.5 font-semibold">
                Home Dashboard
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Ask Copilot
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Logs &amp; Traces
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Knowledge Base
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Documents
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Incident Management
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Change Management
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                CMDB
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                AI Agents
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Architecture
              </span>
            </div>

            {/* Top KPI Metrics Row */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Knowledge Base</span>
                  <BookOpenCheck className="h-4 w-4 text-cyan-400" />
                </div>
                <p className="mt-1 text-2xl font-bold text-white">1,420+ Docs</p>
                <p className="mt-1.5 text-xs text-brand-green-400">● 100% Vector Synced</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Logged Queries</span>
                  <MessagesSquare className="h-4 w-4 text-cyan-400" />
                </div>
                <p className="mt-1 text-2xl font-bold text-white">18,450+</p>
                <p className="mt-1.5 text-xs text-cyan-300">100% Source Cited</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>RAG Vector Search</span>
                  <Zap className="h-4 w-4 text-cyan-400" />
                </div>
                <p className="mt-1 text-2xl font-bold text-white">Online · 42ms</p>
                <p className="mt-1.5 text-xs text-brand-green-400">pgvector / Milvus Ready</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Cluster Health</span>
                  <Server className="h-4 w-4 text-brand-green-400" />
                </div>
                <p className="mt-1 text-2xl font-bold text-white">99.98% Uptime</p>
                <p className="mt-1.5 text-xs text-white/60">Pods: 12/12 Ready</p>
              </div>
            </div>

            {/* Dashboard Two-Column Body: Incidents & L2 Checklist + Health Matrix */}
            <div className="mt-6 grid gap-6 lg:grid-cols-12 font-sans">
              {/* Left Column: Active Incident & L2 Checklist */}
              <div className="lg:col-span-7 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-sm font-semibold text-white">
                      Active Incident: INC-4819
                    </span>
                  </div>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-mono font-medium text-amber-300">
                    P2 · HIGH INGRESS 503 SPIKE
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-white/50 font-mono">
                    IT Operations Assistant · L2 Troubleshooting Checklist
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Copilot has correlated active alert metrics with Runbook{" "}
                    <span className="text-cyan-300 font-mono">SOP-K8S-042</span>. Complete steps:
                  </p>

                  <div className="mt-3 space-y-2.5 font-mono text-xs">
                    <div
                      onClick={() => toggleChecklist(0)}
                      className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 cursor-pointer hover:bg-white/[0.08] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!activeChecklistState[0]}
                        readOnly
                        className="mt-0.5 h-4 w-4 rounded accent-cyan-400 cursor-pointer"
                      />
                      <div>
                        <p className={`font-semibold ${activeChecklistState[0] ? "text-white line-through opacity-70" : "text-white"}`}>
                          1. Verify Ingress NGINX upstream endpoints reachability
                        </p>
                        <p className="text-white/50 text-[11px] mt-0.5">
                          Status: Verified 8/8 healthy backend pods in production namespace.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => toggleChecklist(1)}
                      className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 cursor-pointer hover:bg-white/[0.08] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!activeChecklistState[1]}
                        readOnly
                        className="mt-0.5 h-4 w-4 rounded accent-cyan-400 cursor-pointer"
                      />
                      <div>
                        <p className={`font-semibold ${activeChecklistState[1] ? "text-white line-through opacity-70" : "text-white"}`}>
                          2. Inspect database connection pool exhaustion limits
                        </p>
                        <p className="text-white/50 text-[11px] mt-0.5">
                          Alert: Pool at 184/200 (92% saturation). PgBouncer burst queue active.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => toggleChecklist(2)}
                      className="flex items-start gap-3 rounded-lg border border-cyan-400/30 bg-cyan-500/10 p-3 cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!activeChecklistState[2]}
                        readOnly
                        className="mt-0.5 h-4 w-4 rounded accent-cyan-400 cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold text-cyan-200">
                          3. Trigger PgBouncer pool scale action or restart leaking worker
                        </p>
                        <p className="text-cyan-300/80 text-[11px] mt-0.5">
                          Recommended Action: Execute auto-generated runbook snippet below.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Platform Health & Quick Actions */}
              <div className="lg:col-span-5 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h4 className="text-sm font-semibold text-white">System Connectivity &amp; Health</h4>
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
                    <span className="text-white/70">API Health</span>
                    <span className="text-brand-green-400 font-semibold">● Healthy (19ms)</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
                    <span className="text-white/70">DB Connectivity</span>
                    <span className="text-cyan-300 font-semibold">● PostgreSQL Connected</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
                    <span className="text-white/70">K8s Log Streaming</span>
                    <span className="text-brand-green-400 font-semibold">● FluentBit Streaming</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
                    <span className="text-white/70">RAG Connectivity</span>
                    <span className="text-brand-green-400 font-semibold">● Vector DB Online</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs text-white/50 mb-2">Operations Quick Actions</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={copilotAI.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-cyan-500/20 border border-cyan-400/40 p-2 text-center font-semibold text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                    >
                      Ask Copilot
                    </a>
                    <Link
                      to="/contact#consultation"
                      className="rounded-lg bg-white/5 border border-white/10 p-2 text-center font-semibold text-white/80 hover:bg-white/10 transition-colors"
                    >
                      Request Demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "WeCrew Copilot AI" },
        ]}
      />

      {/* SECTION 02 — THE BUSINESS PROBLEM */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="The Operational Reality"
              title={
                <>
                  Why Answering Routine Operations Questions{" "}
                  <span className="text-gradient">Takes Hours</span>
                </>
              }
              description="Enterprise engineering and IT teams maintain hundreds of wikis, runbooks, and tickets, yet when outages strike or onboarding happens, finding the right step is painfully slow."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessChallenges.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400">
                    <item.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — INTERACTIVE COPILOT CHAT EXPERIENCE (SCREENSHOT 02 INSPIRED) */}
      <section className="relative overflow-hidden bg-hero py-20 text-white sm:py-28">
        <div className="container-x relative z-10">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Authentic Interface"
              title={
                <>
                  Ask Copilot.{" "}
                  <span className="text-cyan-400">Verifiable Answers, Not Hallucinations.</span>
                </>
              }
              description="Experience how Copilot AI synthesizes technical documentation, correlates real incident logs, and provides step-by-step diagnostic guidance citing exact sources."
            />
          </Reveal>

          {/* Interactive Chat Console Demonstration */}
          <div className="mt-14 rounded-2xl border border-white/15 bg-navy-950/95 shadow-2xl backdrop-blur-md overflow-hidden">
            {/* Header / Session bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-4 sm:px-6 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-white">Ask Copilot Assistant</span>
                    <span className="rounded bg-brand-green-500/20 px-2 py-0.5 text-[11px] font-mono text-brand-green-400">
                      RAG Active
                    </span>
                  </div>
                  <p className="text-xs text-white/50 break-words">
                    Active Knowledge Base:{" "}
                    <span className="text-cyan-300 font-mono">{activeScenario.knowledgeBase}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={copilotAI.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Launch Live Chat</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Grid layout: Left Scenarios Selector / Right Chat Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Left Column: Preset Question Scenarios */}
              <div className="min-w-0 lg:col-span-4 p-4 sm:p-5 bg-white/[0.01]">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50 font-mono mb-3">
                  Sample Enterprise Queries
                </p>
                <div className="space-y-2">
                  {chatScenarios.map((scenario) => {
                    const isSelected = activeScenario.id === scenario.id;
                    return (
                      <button
                        key={scenario.id}
                        type="button"
                        onClick={() => setActiveScenario(scenario)}
                        className={`w-full text-left rounded-xl p-3.5 transition-all text-xs border cursor-pointer ${
                          isSelected
                            ? "border-cyan-400/50 bg-cyan-500/15 text-white shadow-md shadow-cyan-500/10"
                            : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="min-w-0 font-semibold text-sm text-white">{scenario.title}</span>
                          <span className="max-w-full rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/60">
                            {scenario.badge}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[11px] text-white/60 line-clamp-2">
                          &ldquo;{scenario.query}&rdquo;
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Deterministic Source Citing</span>
                  </div>
                  <p className="text-white/60 leading-relaxed text-[11px]">
                    Every response cites verifiable document IDs. If an operational runbook does not
                    exist for a query, Copilot explicitly flags the absence rather than guessing.
                  </p>
                </div>
              </div>

              {/* Right Column: Conversational Chat Stream */}
              <div className="min-w-0 lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between min-h-[460px]">
                <div className="space-y-6">
                  {/* User Message Bubble */}
                  <div className="flex min-w-0 items-start gap-3 justify-end">
                    <div className="min-w-0 max-w-xl rounded-2xl bg-cyan-500/20 border border-cyan-400/40 p-4 text-white text-sm">
                      <p className="font-medium">{activeScenario.query}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-cyan-200/70 border-t border-cyan-400/20 pt-1.5">
                        <span>User: SRE On-Call</span>
                        <span>Just now</span>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-xs font-bold text-cyan-300 flex-none">
                      SRE
                    </div>
                  </div>

                  {/* Copilot Response Bubble */}
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-none shadow-md">
                      CP
                    </div>
                    <div className="min-w-0 w-full max-w-2xl rounded-2xl bg-white/[0.04] border border-white/15 p-4 sm:p-5 text-white text-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="font-semibold text-cyan-300">WeCrew Copilot AI</span>
                          <span className="rounded bg-brand-green-500/20 px-2 py-0.5 text-[10px] font-mono text-brand-green-300">
                            Verified Response
                          </span>
                        </div>
                        {activeScenario.incidentContext && (
                          <span className="break-words text-[11px] text-amber-300/80 font-mono">
                            {activeScenario.incidentContext}
                          </span>
                        )}
                      </div>

                      {/* Source Citation Badges */}
                      <div className="mt-3">
                        <p className="text-[11px] uppercase tracking-wider text-white/40 font-mono">
                          Sources Retrieved &amp; Cited:
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {activeScenario.sources.map((src) => (
                            <span
                              key={src.docId}
                              className="inline-flex min-w-0 max-w-full items-start gap-1.5 break-words rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-mono text-cyan-200"
                            >
                              <BookOpenCheck className="h-3 w-3 text-cyan-400" />
                              <span className="min-w-0 break-words">{src.title}</span>
                              <span className="break-all text-white/40">({src.docId})</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Diagnostic Steps List */}
                      <div className="mt-4 space-y-3">
                        <p className="text-xs text-white/80 font-medium">
                          Follow the recommended runbook sequence:
                        </p>
                        {activeScenario.steps.map((st, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-white/10 bg-navy-950/70 p-3 font-mono text-xs"
                          >
                            <p className="text-white font-semibold font-sans">{st.action}</p>
                            {st.command && (
                              <div className="mt-2 rounded bg-black/60 p-2 text-cyan-300 overflow-x-auto border border-white/5">
                                <code>{st.command}</code>
                              </div>
                            )}
                            {st.note && (
                              <p className="mt-1.5 text-white/55 text-[11px] font-sans">
                                {st.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Audit verification stamp */}
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-white/40 font-mono">
                        <span>Attribution Hash: sha256:7f4a...9b12</span>
                        <span>Execution Boundary: Read-Only Diagnostics</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Input Field Bar */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5">
                    <Search className="h-4 w-4 text-white/40" />
                    <input
                      type="text"
                      disabled
                      placeholder="Ask Copilot a question regarding your runbooks, logs, or cluster..."
                      className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
                    />
                    <a
                      href={copilotAI.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-cyan-500 px-3 py-1 text-xs font-semibold text-navy-950 hover:bg-cyan-400 transition-colors flex items-center gap-1"
                    >
                      <span>Try Live</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — CORE CAPABILITIES (THE 8 PILLARS) */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Platform Modules"
              title={
                <>
                  Eight Enterprise Capabilities.{" "}
                  <span className="text-gradient">Engineered for Reliability.</span>
                </>
              }
              description="Each module is tailored for the operational realities of SREs, DevOps engineers, support leads, and security administrators."
            />
          </Reveal>

          {/* Module Selector Tabs */}
          <div className="mt-12 flex flex-wrap gap-2 border-b border-line pb-4 overflow-x-auto">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveTab(cap.id)}
                className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === cap.id
                    ? "bg-accent text-white shadow-md shadow-accent/20 dark:bg-brand-500/20 dark:text-brand-200 dark:shadow-none dark:ring-1 dark:ring-brand-400/30"
                    : "bg-base-soft text-ink-body hover:bg-base-raised hover:text-ink"
                }`}
              >
                <cap.icon className="h-4 w-4" />
                <span>{cap.title.split("—")[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Active Module Showcase Card */}
          {(() => {
            const current = capabilities.find((c) => c.id === activeTab) || capabilities[0];
            return (
              <div className="mt-8 rounded-2xl border border-line bg-base-raised p-6 sm:p-10 shadow-card">
                <div className="grid gap-8 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      <current.icon className="h-3.5 w-3.5" />
                      <span>{current.subtitle}</span>
                    </div>
                    <h3 className="display-2 mt-4 text-ink font-display">{current.title}</h3>
                    <p className="mt-4 body-lg text-ink-body leading-relaxed">
                      {current.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {current.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-500" />
                          <span className="text-sm text-ink-body">{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={copilotAI.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClass("primary", "md")}
                      >
                        Explore in Live Portal
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <Link to="/contact#consultation" className={buttonClass("outline", "md")}>
                        Discuss with an Architect
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5 rounded-xl border border-line bg-base-soft p-6">
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <span className="font-mono text-xs font-semibold text-ink-faint uppercase tracking-wider">
                        Enterprise Architecture Note
                      </span>
                      <ShieldCheck className="h-4 w-4 text-accent" />
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-ink-body">
                      WeCrew Copilot AI is deployed as containerized microservices managed via
                      production Helm charts. All vector embeddings and retrieval indices reside
                      within customer network boundaries, ensuring compliance with ISO 27001 and
                      GDPR data sovereignty mandates.
                    </p>
                    <div className="mt-4 rounded-lg bg-base-raised p-3 border border-line text-xs font-mono text-ink-faint">
                      <span>Deployment: Helm / Kube-Prometheus / PostgreSQL pgvector</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Grid of All 8 Capabilities */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <div
                  onClick={() => setActiveTab(c.id)}
                  className={`card flex h-full flex-col p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                    activeTab === c.id ? "ring-2 ring-accent" : ""
                  }`}
                >
                  <c.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h4 className="mt-4 font-display text-[1rem] font-semibold text-ink">{c.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-ink-body line-clamp-3">
                    {c.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-accent">
                    <span>Inspect module</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05 — REALITY CHECK: PUBLIC AI VS WECREW COPILOT AI */}
      <section className="py-20 sm:py-24 bg-base-soft">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Enterprise Reality Check"
              title={
                <>
                  Why Generic AI Chatbots{" "}
                  <span className="text-gradient">Fail in Production IT</span>
                </>
              }
              description="Consumer AI models are built for open-ended conversation. Enterprise operations demands strict source grounding, access control, and private infrastructure."
            />
          </Reveal>

          <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-base-raised shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-line bg-base-soft font-mono text-xs uppercase tracking-wider text-ink-faint">
                  <tr>
                    <th scope="col" className="p-4 sm:px-6">
                      Operational Dimension
                    </th>
                    <th scope="col" className="p-4 sm:px-6 text-red-500 dark:text-red-400">
                      Public Consumer AI (ChatGPT, etc.)
                    </th>
                    <th scope="col" className="p-4 sm:px-6 text-cyan-600 dark:text-cyan-400">
                      WeCrew Copilot AI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {comparisonMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-base-soft/50 transition-colors">
                      <td className="p-4 sm:px-6 font-semibold text-ink font-display">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:px-6 text-ink-body">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 flex-none mt-0.5" />
                          <span>{row.publicAi}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:px-6 text-ink font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-500 flex-none mt-0.5" />
                          <span>{row.copilotAi}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — ARCHITECTURE & SECURITY GOVERNANCE */}
      <section className="relative overflow-hidden bg-hero py-20 text-white sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow text-cyan-400">Architecture &amp; Data Sovereignty</p>
            <h2 className="display-2 mt-3 text-white">
              Self-Hosted on Kubernetes.{" "}
              <span className="text-gradient">Under Your Complete Control.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">
              Enterprise AI adoption fails on governance more often than on technology. Copilot AI is
              architected so that security and compliance teams can evaluate it seriously — with
              self-hosting, access control, and tamper-proof auditability as foundational decisions.
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              All vector indices, runbook chunks, and logs reside strictly in your private VPC or
              on-premises data center. No third party ever sees your proprietary network topologies.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono text-white/60">
              <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
                AWS EKS / GCP GKE / Azure AKS
              </span>
              <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
                Red Hat OpenShift
              </span>
              <span className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
                Air-Gapped Private VPC
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-4">
              {[
                {
                  title: "Self-Hosted Kubernetes Deployment",
                  text: "Runs in your cloud VPC or on-premises cluster. Your customer data, runbooks, and credentials never leave your custody.",
                },
                {
                  title: "Role-Based Access Control (RBAC)",
                  text: "Integrates with Okta, Azure AD, and SAML 2.0. Users only receive answers synthesized from documents they have permissions to view.",
                },
                {
                  title: "Deterministic Source Citing",
                  text: "Every generated answer links back to exact document IDs, section numbers, and incident tickets for rapid human verification.",
                },
                {
                  title: "Cryptographic Audit Logs",
                  text: "Every query, retrieved source chunk, and diagnostic suggestion is attributable and recorded for compliance audits.",
                },
                {
                  title: "Private LLM Gateway Flexibility",
                  text: "Connect to self-hosted open-weights models (vLLM / Llama 3) or private cloud endpoints (Azure OpenAI, Vertex AI) with zero retention.",
                },
              ].map((item) => (
                <div key={item.title} className="dark-card flex items-start gap-3.5 p-4.5">
                  <LockKeyhole className="mt-0.5 h-5 w-5 flex-none text-cyan-400" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="mt-1 text-xs text-white/65 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 07 — VALUE ACROSS TEAMS (ROLE MATRIX) */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Value Delivered"
              title={
                <>
                  Engineered for Every Operational Role{" "}
                  <span className="text-gradient">Across the Enterprise</span>
                </>
              }
              description="Whether responding to high-priority outages, auditing data governance, or ramping up new service desk analysts, Copilot AI delivers measurable operational leverage."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamValue.map((t, i) => (
              <Reveal key={t.role} delay={i * 80}>
                <div className="card h-full p-6 flex flex-col justify-between border-t-4 border-t-cyan-500">
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {t.badge}
                    </span>
                    <h3 className="mt-2 font-display text-[1.1rem] font-semibold text-ink">
                      {t.role}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {t.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-ink-body">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-cyan-500" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Operational Metrics Bar */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl bg-base-soft p-6 sm:p-8 border border-line">
            <div className="text-center sm:text-left">
              <p className="display-2 font-bold text-accent font-display">60%+</p>
              <p className="mt-1 text-xs font-semibold text-ink uppercase tracking-wider">
                Reduction in MTTR
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                Faster triage during high-severity production outages
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="display-2 font-bold text-cyan-500 font-display">74%</p>
              <p className="mt-1 text-xs font-semibold text-ink uppercase tracking-wider">
                L1/L2 Ticket Deflection
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                Self-service answers grounded in internal runbooks
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="display-2 font-bold text-accent font-display">3x</p>
              <p className="mt-1 text-xs font-semibold text-ink uppercase tracking-wider">
                Faster Onboarding
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                New engineers resolve tickets independently from day one
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="display-2 font-bold text-brand-green-500 font-display">100%</p>
              <p className="mt-1 text-xs font-semibold text-ink uppercase tracking-wider">
                Attributable Citations
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                Zero hallucinated commands; verifiable audit trails
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08 — FINAL CONVERSION CTA */}
      <section className="relative overflow-hidden bg-hero py-20 text-white sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,229,255,0.4), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ready for Production IT</span>
          </div>

          <h2 className="display-1 mt-6 text-white font-display">
            Experience Your Enterprise Knowledge{" "}
            <span className="text-gradient">Answering for Itself</span>
          </h2>

          <p className="mt-6 text-lg text-white/75 leading-relaxed">
            See WeCrew Copilot AI answering queries from your own sample runbooks, integrated with
            your ITSM workflows and deployed within your Kubernetes boundary.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={copilotAI.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Open the Live Portal</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              to="/contact#consultation"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>Schedule Guided Demo</span>
              <ArrowRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/50 font-mono">
            Direct portal URL:{" "}
            <a
              href={copilotAI.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline hover:text-cyan-200"
            >
              kt.copilot.wecrew.in
            </a>{" "}
            · Enterprise evaluations supported with NDA and private VPC deployment.
          </p>
        </div>
      </section>
    </>
  );
};

export default CopilotAIPage;
