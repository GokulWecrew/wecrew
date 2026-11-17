import { useState, type FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Database,
  Eye,
  FileCheck2,
  FileCode,
  FileSearch,
  FileText,
  Filter,
  Fingerprint,
  Globe,
  KeyRound,
  Layers,
  Lock,
  LockKeyhole,
  Network,
  Radar,
  RefreshCw,
  ScanSearch,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube2,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, PageHero, SectionHeading, buttonClass } from "@/components/ui";
import { site } from "@/constants/site";
import { sentinel } from "@/constants/products";

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WeCrew Sentinel",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Linux / Container / Kubernetes / eBPF",
  url: `${site.url}/products/sentinel`,
  description:
    "Full life cycle API security platform — discover, test, and protect your APIs with live API discovery, continuous automated testing, and runtime protection.",
  publisher: { "@type": "Organization", name: site.legalName },
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
    { "@type": "ListItem", position: 3, name: "WeCrew Sentinel", item: `${site.url}/products/sentinel` },
  ],
};

const threatLandscape = [
  {
    icon: ScanSearch,
    title: "Shadow & Zombie APIs",
    text: "Undocumented, forgotten endpoints and abandoned staging APIs remain active in production, bypassing security audits and providing easy footholds for attackers.",
  },
  {
    icon: KeyRound,
    title: "Broken Object Level Authorization (BOLA)",
    text: "WAFs only inspect syntax, completely blind to business logic flaws where an authenticated user manipulates IDs to access records belonging to other tenants.",
  },
  {
    icon: ShieldAlert,
    title: "Broken Authentication & Token Replay",
    text: "Compromised API tokens, expired JWT acceptance, and credential-stuffing attacks exploit poorly implemented authentication flows without tripping rate limits.",
  },
  {
    icon: AlertOctagon,
    title: "Sensitive Data & PII Exposure",
    text: "Backends frequently serialize and return full database objects, inadvertently leaking customer PII, phone numbers, and financial details in response payloads.",
  },
  {
    icon: Terminal,
    title: "MCP & AI Agent Protocol Exploits",
    text: "Emerging Model Context Protocol (MCP) tool integrations and autonomous agents introduce new attack surfaces, including prompt injection and untrusted API executions.",
  },
  {
    icon: Radar,
    title: "Rate Limit Abuse & Resource Exhaustion",
    text: "Automated distributed scrapers and micro-bursting bots bypass traditional IP-based rate limiters, exhausting backend computing capacity and increasing cloud spend.",
  },
];

interface SecurityEvent {
  id: string;
  timestamp: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "INFO";
  title: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  actionTaken: string;
  actor: string;
  category: "BOLA" | "AUTH" | "PII" | "RATE_LIMIT" | "MCP";
  details: string;
  sourceIp: string;
}

const liveFeedEvents: SecurityEvent[] = [
  {
    id: "EVT-9041",
    timestamp: "12 seconds ago",
    severity: "CRITICAL",
    title: "BOLA / IDOR Violation Blocked",
    endpoint: "/api/v2/tenants/9402/billing-invoices",
    method: "GET",
    actionTaken: "Blocked & Token Quarantined",
    actor: "Actor-9912 (Malicious Fuzzer)",
    category: "BOLA",
    details:
      "Authenticated user attempting horizontal traversal across tenant records. User tenant ID (8814) mismatched requested object tenant ID (9402). In-line enforcement dropped connection immediately.",
    sourceIp: "194.26.29.112",
  },
  {
    id: "EVT-9038",
    timestamp: "45 seconds ago",
    severity: "HIGH",
    title: "Sensitive PII Masked in Response",
    endpoint: "/api/v1/customers/export-profile",
    method: "POST",
    actionTaken: "PII Auto-Masked & Alert Dispatched",
    actor: "Internal Mobile Client App",
    category: "PII",
    details:
      "Backend response contained unmasked Aadhaar / National ID and cleartext credit card tokens. Sentinel runtime filter masked payload in-memory prior to egress.",
    sourceIp: "10.244.3.41",
  },
  {
    id: "EVT-9034",
    timestamp: "2 mins ago",
    severity: "MEDIUM",
    title: "Credential Stuffing & Token Replay Spike",
    endpoint: "/auth/v1/oauth2/token",
    method: "POST",
    actionTaken: "IP Blocklisted (60 min cooldown)",
    actor: "Botnet-Cluster-Bravo",
    category: "AUTH",
    details:
      "Distributed rotation of expired refresh tokens cycling across 48 rotating proxies. Velocity threshold breached; dynamic IP range added to Sentinel active blocklist.",
    sourceIp: "45.154.255.89",
  },
  {
    id: "EVT-9029",
    timestamp: "5 mins ago",
    severity: "INFO",
    title: "Model Context Protocol (MCP) Session Validated",
    endpoint: "/internal/v1/crm/accounts/query",
    method: "POST",
    actionTaken: "Passed Policy Check",
    actor: "Copilot-Agent-Fleet-03",
    category: "MCP",
    details:
      "Autonomous agent tool invocation verified with valid Agent Passport cryptographic signature. Tool parameters adhered strictly to read-only customer query bounds.",
    sourceIp: "10.244.7.12",
  },
  {
    id: "EVT-9022",
    timestamp: "11 mins ago",
    severity: "CRITICAL",
    title: "Mass Assignment Exploitation Attempt",
    endpoint: "/api/v1/users/profile/update",
    method: "PUT",
    actionTaken: "Request Dropped & Session Invalidated",
    actor: "Actor-8840 (Known Scanner)",
    category: "BOLA",
    details:
      "Payload injected elevated administrative flags ('is_super_admin: true', 'role: global_owner') into standard profile edit endpoint. Blocked by schema validation engine.",
    sourceIp: "185.220.101.4",
  },
];

const threatActorsList = [
  {
    id: "TA-9912",
    label: "Automated BOLA Scanner",
    ipRange: "194.26.29.0/24",
    asn: "AS44050",
    geo: "Frankfurt, DE",
    eventsCount: 842,
    threatScore: "96 / 100",
    status: "Active Blocklist",
  },
  {
    id: "TA-8840",
    label: "Credential Stuffer Botnet",
    ipRange: "45.154.255.0/24",
    asn: "AS200019",
    geo: "Bucharest, RO",
    eventsCount: 1420,
    threatScore: "92 / 100",
    status: "Active Blocklist",
  },
  {
    id: "TA-7102",
    label: "API Schema Enumerator",
    ipRange: "185.220.101.0/24",
    asn: "AS60729",
    geo: "Amsterdam, NL",
    eventsCount: 580,
    threatScore: "88 / 100",
    status: "Active Blocklist",
  },
];

const disciplinesData = [
  {
    id: "discover",
    badge: "Discipline 01",
    title: "Live API Discovery",
    tagline: "Discover Every Endpoint Operating Across Your Estate",
    description:
      "Sentinel delivers continuous, automated API discovery across all environments. It builds a live, unified inventory of every active endpoint, illuminating shadow APIs, rogue microservices, and undocumented parameters that bypass inventory spreadsheets.",
    icon: ScanSearch,
    color: "#3D8BFF",
    metrics: "420 Endpoints Cataloged · 0 Shadow APIs Lingering",
    points: [
      "Real-time continuous passive traffic analysis mapping all endpoints",
      "Immediate detection of shadow, orphan, and deprecated API versions",
      "Automated parameter schema cataloging and drift detection",
      "Classification of sensitive data flows (PII, PCI, PHI, financial records)",
    ],
  },
  {
    id: "test",
    badge: "Discipline 02",
    title: "Continuous API Security Testing",
    tagline: "Shift-Left Automated Security Testing in CI/CD",
    description:
      "Static penetration tests capture a moment in time that quickly expires. Sentinel injects automated, context-aware API vulnerability scanning directly into your GitHub Actions, GitLab CI, and deployment pipelines to catch logic flaws before code reaches production.",
    icon: TestTube2,
    color: "#4EE0C2",
    metrics: "OWASP API Top 10 Suites · 100% Pre-Merge Verification",
    points: [
      "Comprehensive test suites for the complete OWASP API Security Top 10",
      "Context-aware synthetic attack simulation (BOLA, broken auth, mass assignment)",
      "Automated CI/CD pull request gatekeeping with actionable remediation steps",
      "Zero false-positive logic validation grounded in actual API schemas",
    ],
  },
  {
    id: "defend",
    badge: "Discipline 03",
    title: "Real-Time Runtime Protection",
    tagline: "Active Threat Mitigation with Zero Latency Impact",
    description:
      "Defend live production APIs against exploit attempts without degrading application response times. Sentinel uses high-performance eBPF sidecars and gateway plugins to inspect and block malicious traffic with sub-millisecond overhead.",
    icon: Radar,
    color: "#3D8BFF",
    metrics: "2,842 Threats Blocked · Sub-Millisecond eBPF Overhead",
    points: [
      "In-line and sidecar traffic inspection with zero latency overhead",
      "Instant IP, token, and actor blocklist enforcement across global gateways",
      "Dynamic sensitive data masking preventing egress PII leakage",
      "Behavioral anomaly detection blocking credential replay and DDoS spikes",
    ],
  },
];

const roleMatrix = [
  {
    role: "Chief Information Security Officers (CISO)",
    badge: "Governance & Posture",
    points: [
      "Quantified Security Posture Score (88/100) benchmarked across all endpoints",
      "Elimination of shadow API blind spots across multi-cloud infrastructure",
      "Comprehensive compliance mapping for SOC 2 Type II, ISO 27001, and GDPR",
      "Defensible audit trails demonstrating proactive runtime threat mitigation",
    ],
  },
  {
    role: "Application Security (AppSec) Engineers",
    badge: "Logic Flaws & Testing",
    points: [
      "Automated detection of business logic flaws (BOLA/IDOR) that WAFs miss",
      "CI/CD testing pipeline integration providing developer-ready fix instructions",
      "Synthetic attack simulations verifying endpoints prior to production rollout",
      "Deep forensic event timelines with full request and header traces",
    ],
  },
  {
    role: "Platform, SRE & DevOps Teams",
    badge: "Zero Latency & Integration",
    points: [
      "Sub-millisecond overhead via eBPF kernel inspection and lightweight sidecars",
      "Drop-in plugins for Kong, Envoy, NGINX, AWS API Gateway, and Kubernetes Ingress",
      "Automated API cataloging eliminating manual OpenAPI / Swagger updates",
      "Zero disruption to developer release cadence or production SLAs",
    ],
  },
  {
    role: "AI & Agent Infrastructure Leads",
    badge: "MCP & Agent Security",
    points: [
      "Model Context Protocol (MCP) server inspection and tool-call validation",
      "Prevention of agent prompt injection leading to unauthorized internal API calls",
      "Agent identity verification with scoped token and autonomy boundaries",
      "Hard egress perimeter protection preventing LLM data exfiltration",
    ],
  },
];

export const SentinelPage: FC = () => {
  const [activeDiscipline, setActiveDiscipline] = useState<string>("discover");
  const [activeFeedFilter, setActiveFeedFilter] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent>(liveFeedEvents[0]);

  const filteredEvents = liveFeedEvents.filter((ev) => {
    if (activeFeedFilter === "blocked") return ev.actionTaken.toLowerCase().includes("blocked") || ev.actionTaken.toLowerCase().includes("dropped");
    if (activeFeedFilter === "critical") return ev.severity === "CRITICAL";
    if (activeFeedFilter === "resolved") return ev.actionTaken.toLowerCase().includes("passed") || ev.actionTaken.toLowerCase().includes("masked");
    return true;
  });

  const pageTitle = `WeCrew Sentinel — Full Life Cycle API Security Platform — ${site.name} Technologies`;
  const pageDescription =
    "WeCrew Sentinel is a full life cycle API security platform: live API discovery, continuous automated testing, and runtime protection. Evidence before action, protection before breach.";
  const canonicalUrl = `${site.url}/products/sentinel`;

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
        {/* Ambient Cybersecurity Glow (Teal & Blue) */}
        <div
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(78,224,194,0.4), transparent)" }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4EE0C2]/30 bg-[#4EE0C2]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#4EE0C2]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#4EE0C2]" aria-hidden="true" />
              <span>Full Life Cycle API Security Platform</span>
            </div>

            <h1 className="display-1 mt-6 text-white font-display">
              Discover. Test. Defend.{" "}
              <span
                className="text-gradient"
                style={{
                  backgroundImage: "linear-gradient(100deg, #3D8BFF, #4EE0C2 60%, #3D8BFF)",
                }}
              >
                Full Life Cycle API Security.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl">
              See threats clearly. Strengthen your security posture. Continuous API discovery,
              automated security testing, and real-time runtime protection for modern enterprise
              APIs, microservices, and AI agents.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-mono text-white/80">
              <span className="text-[#4EE0C2]">CORE PRINCIPLE:</span>
              <span>&ldquo;Evidence before action. Protection before breach.&rdquo;</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={sentinel.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3D8BFF] to-[#4EE0C2] px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-lg shadow-[#3D8BFF]/20 hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Open Sentinel Portal</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <Link
                to="/contact#consultation"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>Schedule Threat Assessment</span>
                <ArrowRight className="h-4 w-4 text-[#4EE0C2]" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/60 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4EE0C2]" />
                Continuous Discovery
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4EE0C2]" />
                OWASP API Top 10 Testing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4EE0C2]" />
                Zero Latency Runtime Defense
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4EE0C2]" />
                MCP &amp; Agent Security Ready
              </span>
            </div>
          </div>

          {/* REALISTIC SENTINEL SECURITY DASHBOARD CONSOLE (SCREENSHOT 03 INSPIRED) */}
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
                  sentinel.wecrew.in/dashboard
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[#4EE0C2]/20 border border-[#4EE0C2]/40 px-2.5 py-1 text-xs font-mono font-semibold text-[#4EE0C2]">
                  LIVE MONITORING: ACTIVE
                </span>
                <span className="text-xs text-white/40 font-mono hidden sm:inline">
                  Org: Enterprise Core (Prod)
                </span>
              </div>
            </div>

            {/* Dashboard Modules / Navigation Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 text-xs font-medium text-white/70 overflow-x-auto">
              <span className="rounded-md bg-[#3D8BFF]/20 text-[#3D8BFF] px-3 py-1.5 font-semibold">
                Overview
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Live Feed
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Alerts &amp; Incidents
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                API Discovery (420)
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Security Testing
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Runtime Protection
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Active Blocklist
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Compliance Reports
              </span>
              <span className="rounded-md hover:bg-white/5 px-3 py-1.5 transition-colors cursor-pointer">
                Threat Actors
              </span>
            </div>

            {/* Top Key Metrics / KPIs Grid (Matches Screenshot 03) */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Security Posture Score</span>
                  <ShieldCheck className="h-4 w-4 text-[#4EE0C2]" />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">88 / 100</p>
                  <span className="text-xs text-[#4EE0C2] font-semibold">Grade A</span>
                </div>
                <p className="mt-1.5 text-xs text-brand-green-400">● 420 Endpoints Hardened</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Blocked Events</span>
                  <ShieldAlert className="h-4 w-4 text-red-400" />
                </div>
                <p className="mt-1 text-2xl font-bold text-white">2,842</p>
                <p className="mt-1.5 text-xs text-red-400">Automated Threats Dropped</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Critical Events</span>
                  <AlertOctagon className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">14</p>
                  <span className="text-xs text-white/50">(14 Investigated)</span>
                </div>
                <p className="mt-1.5 text-xs text-brand-green-400">0 Active Exploitations</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>Inspected Events</span>
                  <Activity className="h-4 w-4 text-[#3D8BFF]" />
                </div>
                <p className="mt-1 text-2xl font-bold text-white">48.2M</p>
                <p className="mt-1.5 text-xs text-[#4EE0C2]">Sub-Millisecond Overhead</p>
              </div>
            </div>

            {/* Additional Secondary KPI Bar */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs border-t border-white/10 pt-4">
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2.5">
                <span className="text-white/50">Monitored Endpoints:</span>
                <p className="font-bold text-white mt-0.5">420 Discovered</p>
              </div>
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2.5">
                <span className="text-white/50">Resolved Events:</span>
                <p className="font-bold text-brand-green-400 mt-0.5">1,420 Closed</p>
              </div>
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2.5">
                <span className="text-white/50">Open Security Issues:</span>
                <p className="font-bold text-amber-300 mt-0.5">8 (0 Critical · 2 Med)</p>
              </div>
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-2.5">
                <span className="text-white/50">MCP Tool Sessions:</span>
                <p className="font-bold text-[#4EE0C2] mt-0.5">38 Active Verified</p>
              </div>
            </div>

            {/* Two-Column Body: Detection Mix Breakdown & Threat Actors */}
            <div className="mt-6 grid gap-6 lg:grid-cols-12 font-sans">
              {/* Left Column: Detection Mix Breakdown */}
              <div className="lg:col-span-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="text-sm font-semibold text-white">Detection Mix Breakdown</h4>
                  <span className="text-xs text-white/50 font-mono">Last 30 Days</span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>BOLA / IDOR Logic Flaws</span>
                      <span className="text-cyan-300 font-bold">34%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: "34%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>Broken Authentication &amp; Token Replay</span>
                      <span className="text-[#3D8BFF] font-bold">26%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#3D8BFF] rounded-full" style={{ width: "26%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>Sensitive Data &amp; PII Egress Exposure</span>
                      <span className="text-[#4EE0C2] font-bold">18%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#4EE0C2] rounded-full" style={{ width: "18%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>Rate Limit Abuse &amp; Resource Exhaustion</span>
                      <span className="text-amber-400 font-bold">14%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: "14%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>MCP / AI Agent Tool Exploitation</span>
                      <span className="text-purple-400 font-bold">8%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: "8%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Active Threat Actors Overview */}
              <div className="lg:col-span-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="text-sm font-semibold text-white">Top Flagged Threat Actors</h4>
                  <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-mono text-red-300">
                    Live Blocklist Active
                  </span>
                </div>

                <div className="mt-4 space-y-2.5 font-mono text-xs">
                  {threatActorsList.map((actor) => (
                    <div
                      key={actor.id}
                      className="rounded-lg border border-white/5 bg-white/[0.03] p-3 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{actor.id}</span>
                          <span className="text-[11px] text-white/50">({actor.label})</span>
                        </div>
                        <p className="text-[11px] text-white/40 mt-0.5">
                          IP: {actor.ipRange} · {actor.geo}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-red-400 font-bold">{actor.threatScore}</span>
                        <p className="text-[10px] text-brand-green-400">Blocked</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>Auto-Quarantine: 60-day persistent block</span>
                  <a
                    href={sentinel.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4EE0C2] hover:underline flex items-center gap-1"
                  >
                    <span>View All Actors</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
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
          { label: "WeCrew Sentinel" },
        ]}
      />

      {/* SECTION 02 — THE API THREAT LANDSCAPE */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="The Attack Surface"
              title={
                <>
                  Your Business Runs on APIs.{" "}
                  <span className="text-gradient">Who is Protecting Them?</span>
                </>
              }
              description="Modern applications expose critical business logic and customer data through APIs. Traditional firewalls and generic WAFs are blind to API business logic flaws, leaving endpoints vulnerable to breach."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {threatLandscape.map((threat, i) => (
              <Reveal key={threat.title} delay={i * 70}>
                <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift border-t-4 border-t-[#3D8BFF]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#3D8BFF]/10 text-[#3D8BFF] dark:text-[#4EE0C2]">
                    <threat.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-semibold text-ink">
                    {threat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">{threat.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — THE THREE DISCIPLINES: DISCOVER · TEST · DEFEND */}
      <section className="relative overflow-hidden bg-hero py-20 text-white sm:py-28">
        <div className="container-x relative z-10">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Discover · Test · Defend"
              title={
                <>
                  Three Disciplines.{" "}
                  <span style={{ color: "#4EE0C2" }}>One Unified Platform.</span>
                </>
              }
              description="Sentinel treats API security as a continuous, full life cycle engineering practice rather than a periodic point-in-time penetration test."
            />
          </Reveal>

          {/* Interactive Discipline Selector */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {disciplinesData.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDiscipline(d.id)}
                className={`rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2.5 border ${
                  activeDiscipline === d.id
                    ? "border-[#4EE0C2] bg-[#4EE0C2]/20 text-white shadow-lg shadow-[#4EE0C2]/15"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <d.icon className="h-4 w-4" style={{ color: d.color }} />
                <span>{d.title}</span>
              </button>
            ))}
          </div>

          {/* Discipline Deep Dive View */}
          {(() => {
            const current = disciplinesData.find((d) => d.id === activeDiscipline) || disciplinesData[0];
            return (
              <div className="mt-10 rounded-2xl border border-white/15 bg-navy-950/90 p-4 sm:p-10 shadow-2xl backdrop-blur-md">
                <div className="grid min-w-0 gap-10 lg:grid-cols-12 items-center">
                  <div className="min-w-0 lg:col-span-7">
                    <div className="flex w-fit max-w-full flex-col items-start gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-[#4EE0C2] sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:py-1">
                      <span className="shrink-0">{current.badge}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="min-w-0 break-words">{current.metrics}</span>
                    </div>

                    <h3 className="display-2 mt-4 text-white font-display">{current.title}</h3>
                    <p className="mt-2 text-sm text-[#4EE0C2] font-mono">{current.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                      {current.description}
                    </p>

                    <div className="mt-6 space-y-3 font-sans">
                      {current.points.map((pt) => (
                        <div key={pt} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#4EE0C2]" />
                          <span className="text-sm text-white/80">{pt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={sentinel.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2 rounded-xl bg-[#4EE0C2] px-6 py-3 text-sm font-semibold text-navy-950 shadow-md hover:brightness-110 transition-all cursor-pointer"
                      >
                        <span>Open in Sentinel Portal</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <Link
                        to="/contact#consultation"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <span>Request Architecture Walkthrough</span>
                      </Link>
                    </div>
                  </div>

                  <div className="min-w-0 lg:col-span-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-white/50 uppercase tracking-wider">
                        Operational Telemetry
                      </span>
                      <current.icon className="h-4 w-4 text-[#4EE0C2]" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-3 border-b border-white/5 pb-2">
                        <span className="min-w-0 break-words text-white/60">Execution Plane:</span>
                        <span className="min-w-0 break-words text-left font-semibold text-white">eBPF / Gateway Plugin</span>
                      </div>
                      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-3 border-b border-white/5 pb-2">
                        <span className="min-w-0 break-words text-white/60">Inspection Incurred Latency:</span>
                        <span className="min-w-0 break-words text-left font-semibold text-brand-green-400">&lt; 0.4 ms</span>
                      </div>
                      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-3 border-b border-white/5 pb-2">
                        <span className="min-w-0 break-words text-white/60">False-Positive Rate:</span>
                        <span className="min-w-0 break-words text-left font-semibold text-white">&lt; 0.01%</span>
                      </div>
                      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-3 border-b border-white/5 pb-2">
                        <span className="min-w-0 break-words text-white/60">OWASP Coverage:</span>
                        <span className="min-w-0 break-words text-left font-semibold text-[#4EE0C2]">10 / 10 Categories</span>
                      </div>
                      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-3">
                        <span className="min-w-0 break-words text-white/60">Evidence Cryptography:</span>
                        <span className="min-w-0 break-words text-left font-semibold text-white">SHA-256 Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Three Discipline Summary Cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {disciplinesData.map((d, i) => (
              <Reveal key={d.id} delay={i * 80}>
                <div
                  onClick={() => setActiveDiscipline(d.id)}
                  className={`dark-card h-full p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                    activeDiscipline === d.id ? "ring-2 ring-[#4EE0C2]" : ""
                  }`}
                  style={{ borderTop: `3px solid ${d.color}` }}
                >
                  <div className="flex items-center justify-between">
                    <d.icon className="h-6 w-6" style={{ color: d.color }} aria-hidden="true" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40">
                      {d.badge}
                    </span>
                  </div>
                  <h4 className="mt-4 font-display text-lg font-semibold text-white">{d.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/60 line-clamp-3">
                    {d.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#4EE0C2]">
                    <span>Inspect discipline</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 — INTERACTIVE LIVE FEED & THREAT INVESTIGATION */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Interactive Investigation"
              title={
                <>
                  Live Security Feed.{" "}
                  <span className="text-gradient">Real-Time Threat Forensics.</span>
                </>
              }
              description="Inspect live security events intercepted by Sentinel across enterprise API gateways. Filter events, analyze attack vectors, and review automated defensive actions."
            />
          </Reveal>

          {/* Interactive Feed Container */}
          <div className="mt-14 rounded-2xl border border-line bg-base-raised shadow-card overflow-hidden">
            {/* Filter Tabs Bar */}
            <div className="flex flex-col items-start gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 bg-base-soft">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-ink-faint" />
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint font-mono">
                  Event Stream Filter:
                </span>
              </div>

              <div className="grid w-full grid-cols-1 gap-2 text-xs sm:w-auto sm:flex sm:flex-wrap">
                {[
                  { id: "all", label: "All Intercepts" },
                  { id: "blocked", label: "Blocked & Quarantined" },
                  { id: "critical", label: "Critical Severity" },
                  { id: "resolved", label: "Resolved & Masked" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFeedFilter(f.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left font-medium transition-all cursor-pointer sm:w-auto sm:py-1.5 ${
                      activeFeedFilter === f.id
                        ? "bg-accent text-white shadow-sm"
                        : "bg-base text-ink-body hover:bg-base-soft"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split layout: Event List on Left / Forensic Detail on Right */}
            <div className="grid min-w-0 grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line">
              {/* Event List */}
              <div className="min-w-0 lg:col-span-5 p-3 sm:p-5 space-y-3 max-h-[500px] overflow-y-auto">
                {filteredEvents.map((ev) => {
                  const isSelected = selectedEvent.id === ev.id;
                  return (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`min-w-0 rounded-xl border p-3.5 transition-all cursor-pointer text-xs ${
                        isSelected
                          ? "border-accent bg-accent/10 shadow-sm"
                          : "border-line bg-base hover:bg-base-soft"
                      }`}
                    >
                      <div className="flex min-w-0 items-center justify-between gap-3">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                            ev.severity === "CRITICAL"
                              ? "bg-red-500/20 text-red-600 dark:text-red-400"
                              : ev.severity === "HIGH"
                              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                              : ev.severity === "MEDIUM"
                              ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                              : "bg-green-500/20 text-green-600 dark:text-green-400"
                          }`}
                        >
                          {ev.severity}
                        </span>
                        <span className="shrink-0 text-[11px] text-ink-faint font-mono">{ev.timestamp}</span>
                      </div>

                      <h5 className="mt-2 break-words font-semibold text-ink text-sm">{ev.title}</h5>

                      <div className="mt-1.5 flex min-w-0 items-center gap-2 font-mono text-[11px] text-ink-faint">
                        <span className="font-bold text-accent">{ev.method}</span>
                        <span className="min-w-0 flex-1 truncate">{ev.endpoint}</span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] text-ink-body border-t border-line/60 pt-2">
                        <span className="min-w-0 flex-1 break-words">Action: {ev.actionTaken}</span>
                        <span className="break-all font-mono text-ink-faint">{ev.sourceIp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Forensic Details Pane */}
              <div className="min-w-0 lg:col-span-7 p-4 sm:p-8 flex flex-col justify-between bg-base-soft/40">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-accent">
                          {selectedEvent.id}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 text-xs font-mono font-semibold ${
                            selectedEvent.severity === "CRITICAL"
                              ? "bg-red-500/20 text-red-600 dark:text-red-400"
                              : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {selectedEvent.severity}
                        </span>
                      </div>
                      <h4 className="mt-1 font-display text-lg font-bold text-ink">
                        {selectedEvent.title}
                      </h4>
                    </div>
                    <span className="text-xs text-ink-faint font-mono">
                      Intercepted {selectedEvent.timestamp}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4 text-xs font-mono">
                    <div className="min-w-0 rounded-xl border border-line bg-base p-4">
                      <span className="text-ink-faint uppercase tracking-wider text-[10px]">
                        Target Endpoint &amp; Method
                      </span>
                      <p className="mt-1 min-w-0 break-all text-sm font-bold text-ink">
                        <span className="mr-2 inline-block text-accent">{selectedEvent.method}</span>
                        <span className="break-all">{selectedEvent.endpoint}</span>
                      </p>
                    </div>

                    <div className="min-w-0 rounded-xl border border-line bg-base p-4">
                      <span className="text-ink-faint uppercase tracking-wider text-[10px]">
                        Forensic Explanation &amp; Attack Context
                      </span>
                      <p className="mt-1 break-words text-sm font-sans text-ink-body leading-relaxed">
                        {selectedEvent.details}
                      </p>
                    </div>

                    <div className="grid min-w-0 grid-cols-2 gap-3">
                      <div className="min-w-0 rounded-xl border border-line bg-base p-3">
                        <span className="text-ink-faint uppercase tracking-wider text-[10px]">
                          Threat Actor Profile
                        </span>
                        <p className="mt-0.5 break-words text-xs font-semibold text-ink">
                          {selectedEvent.actor}
                        </p>
                        <p className="text-[11px] text-ink-faint mt-0.5">
                          IP: {selectedEvent.sourceIp}
                        </p>
                      </div>

                      <div className="min-w-0 rounded-xl border border-line bg-base p-3">
                        <span className="text-ink-faint uppercase tracking-wider text-[10px]">
                          Enforced Action
                        </span>
                        <p className="mt-0.5 break-words text-xs font-bold text-brand-green-500">
                          {selectedEvent.actionTaken}
                        </p>
                        <p className="text-[11px] text-ink-faint mt-0.5">
                          Status: Threat Neutralized
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs">
                  <span className="text-ink-faint font-mono">
                    Audit Fingerprint: SHA-256 Signed Evidence Artefact
                  </span>
                  <a
                    href={sentinel.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-strong"
                  >
                    <span>View In Live Portal</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — ADVANCED AI & MCP PROTOCOL PROTECTION */}
      <section className="py-20 sm:py-24 bg-base-soft">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Agentic Security</span>
            </div>
            <h2 className="display-2 mt-4 text-ink font-display">
              Securing APIs in the Era of{" "}
              <span className="text-gradient">AI Agents &amp; MCP</span>
            </h2>
            <p className="mt-5 body-lg text-ink-body leading-relaxed">
              Autonomous AI agents interact with internal microservices using Model Context
              Protocol (MCP) tools. While powerful, rogue agents and prompt injections can turn
              legitimate tool connections into catastrophic data exfiltration pipelines.
            </p>
            <p className="mt-4 body-lg text-ink-body leading-relaxed">
              Sentinel inspects MCP agent sessions in real time, validating cryptographic agent
              passports, enforcing strict tool-call boundaries, and scrubbing unauthorized parameters
              before requests ever touch backend databases.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={sentinel.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary", "md")}
              >
                Explore MCP Security in Sentinel
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link to="/contact#consultation" className={buttonClass("outline", "md")}>
                Request Agent Security Brief
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-4">
              {[
                {
                  title: "Cryptographic Agent Identity Attestation",
                  desc: "Verifies agent passports, trust scores, and caller origin before allowing tool execution.",
                },
                {
                  title: "Prompt Injection & Payload Sanitization",
                  desc: "Filters indirect prompt injections embedded in external data feeds and API parameters.",
                },
                {
                  title: "Hard Egress Boundaries & Data Masking",
                  desc: "Prevents autonomous LLM tools from retrieving and exfiltrating bulk PII or credentials.",
                },
                {
                  title: "Rate Limiting & Token Budget Controls",
                  desc: "Eliminates recursive agent looping and unexpected API usage cost spikes.",
                },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl border border-line bg-base-raised p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold font-mono">
                      0{idx + 1}
                    </span>
                    <h4 className="font-display text-sm font-semibold text-ink dark:text-slate-100 sm:text-base">
                      {item.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-body pl-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 06 — ARCHITECTURE & DEPLOYMENT MODES */}
      <section className="relative overflow-hidden bg-hero py-20 text-white sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Zero Latency Architecture"
              title={
                <>
                  Flexible Deployment Modes.{" "}
                  <span style={{ color: "#4EE0C2" }}>Zero Operational Friction.</span>
                </>
              }
              description="Deploy Sentinel according to your infrastructure preferences without re-architecting your backend services or compromising latency."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "eBPF Linux Kernel Sidecar",
                badge: "Microsecond Latency",
                icon: Cpu,
                text: "Inspects API traffic directly within the Linux kernel socket layer. Incurs sub-millisecond overhead and requires zero code modifications to running containers.",
                specs: ["Linux Kernel 5.4+ support", "Zero proxy hop overhead", "Native Kubernetes DaemonSet"],
              },
              {
                title: "API Gateway Plugins",
                badge: "Native Ecosystem",
                icon: Network,
                text: "Drop-in plugins and filters for Kong, Envoy, NGINX, AWS API Gateway, and Traefik. Intercepts and blocks malicious tokens directly at your ingress perimeter.",
                specs: ["Kong / Envoy / NGINX certified", "Instant IP / Token blocklist sync", "Multi-region gateway support"],
              },
              {
                title: "Out-of-Band Traffic Mirroring",
                badge: "Zero Incurred Latency",
                icon: Layers,
                text: "Mirror production traffic asynchronously to a dedicated Sentinel sensor node. Conduct continuous discovery and threat analysis with absolutely zero latency impact.",
                specs: ["AWS VPC Traffic Mirroring", "GCP Packet Mirroring", "100% Non-blocking deployment"],
              },
            ].map((mode, i) => (
              <Reveal key={mode.title} delay={i * 90}>
                <div className="dark-card h-full p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <mode.icon className="h-7 w-7 text-[#4EE0C2]" />
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/50">
                        {mode.badge}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">
                      {mode.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/70">{mode.text}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-white/60">
                    {mode.specs.map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#4EE0C2]" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 07 — VALUE ACROSS ROLES */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Enterprise Roles"
              title={
                <>
                  Value Delivered to Every Stakeholder{" "}
                  <span className="text-gradient">Across the Organization</span>
                </>
              }
              description="From executive security reporting to developer shift-left testing, Sentinel provides tailored operational outcomes for every engineering function."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roleMatrix.map((r, i) => (
              <Reveal key={r.role} delay={i * 70}>
                <div className="card h-full p-6 flex flex-col justify-between border-t-4 border-t-[#3D8BFF]">
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
                      {r.badge}
                    </span>
                    <h3 className="mt-2 font-display text-[1.05rem] font-semibold text-ink">
                      {r.role}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {r.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-ink-body">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Compliance & Certification Assurance Card */}
          <div className="mt-14 rounded-2xl bg-base-soft p-6 sm:p-8 border border-line flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Regulatory &amp; Compliance Assurance
              </span>
              <h4 className="display-2 mt-2 text-ink font-display">
                Audit-Ready Security Evidence
              </h4>
              <p className="mt-2 text-sm text-ink-body max-w-2xl">
                Sentinel automates continuous compliance verification across SOC 2 Type II, ISO
                27001, PCI-DSS 4.0, HIPAA, and GDPR. Generate audit-ready cryptographic evidence
                reports demonstrating full API discovery and runtime protection.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-ink-faint">
              <span className="rounded-lg bg-base-raised border border-line px-3 py-1.5 font-semibold text-ink">
                SOC 2 Type II
              </span>
              <span className="rounded-lg bg-base-raised border border-line px-3 py-1.5 font-semibold text-ink">
                ISO 27001
              </span>
              <span className="rounded-lg bg-base-raised border border-line px-3 py-1.5 font-semibold text-ink">
                PCI-DSS 4.0
              </span>
              <span className="rounded-lg bg-base-raised border border-line px-3 py-1.5 font-semibold text-ink">
                HIPAA / GDPR
              </span>
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
              "radial-gradient(ellipse at center, rgba(61,139,255,0.4), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4EE0C2]/30 bg-[#4EE0C2]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#4EE0C2]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#4EE0C2]" />
            <span>Protect Before Breach</span>
          </div>

          <h2 className="display-1 mt-6 text-white font-display">
            Know Your API Attack Surface.{" "}
            <span
              className="text-gradient"
              style={{
                backgroundImage: "linear-gradient(100deg, #3D8BFF, #4EE0C2 60%, #3D8BFF)",
              }}
            >
              Protect It at Runtime.
            </span>
          </h2>

          <p className="mt-6 text-lg text-white/75 leading-relaxed">
            Talk to our security architects about evaluating WeCrew Sentinel across your staging and
            production API estates. Continuous discovery, automated testing, and zero-latency
            defense.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={sentinel.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3D8BFF] to-[#4EE0C2] px-7 py-4 text-sm font-semibold text-navy-950 shadow-xl shadow-[#3D8BFF]/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Visit sentinel.wecrew.in</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              to="/contact#consultation"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>Schedule API Threat Assessment</span>
              <ArrowRight className="h-4 w-4 text-[#4EE0C2]" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/50 font-mono">
            Direct portal URL:{" "}
            <a
              href={sentinel.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4EE0C2] underline hover:text-[#3D8BFF]"
            >
              sentinel.wecrew.in
            </a>{" "}
            · Restricted operator access. Guided evaluations scheduled via security consultations.
          </p>
        </div>
      </section>
    </>
  );
};

export default SentinelPage;
