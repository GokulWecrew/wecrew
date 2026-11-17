import { useState, type FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  FileCheck2,
  FileSearch,
  Fingerprint,
  Gauge,
  Lock,
  Radar,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Users,
  Workflow,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, PageHero, SectionHeading, buttonClass } from "@/components/ui";
import { site } from "@/constants/site";
import { wecrewOps } from "@/constants/products";

const opsJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WeCrew Ops",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Kubernetes / Container Runtime",
  url: `${site.url}/products/wecrew-ops`,
  description:
    "Enterprise agent operations OS for fleet visibility, agent passports, governance, live telemetry, and evidence-backed root cause analysis.",
  publisher: { "@type": "Organization", name: site.legalName },
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
    { "@type": "ListItem", position: 3, name: "WeCrew Ops", item: `${site.url}/products/wecrew-ops` },
  ],
};

const businessChallenges = [
  {
    icon: Radar,
    title: "Fragmented Agent Visibility",
    text: "AI agents deployed across heterogeneous frameworks, cloud accounts, and microservices operate as disconnected black boxes without a unified fleet overview.",
  },
  {
    icon: Fingerprint,
    title: "Lack of Centralized Identity",
    text: "Without standardized Agent Passports, organizations cannot cryptographically verify which agent triggered an action, accessed a database, or initiated an API call.",
  },
  {
    icon: Gauge,
    title: "Uncontrolled Autonomy & Spend",
    text: "Unbounded agents can enter recursive loops, deplete token budgets, or execute out-of-scope actions without operational circuit breakers or approval queues.",
  },
  {
    icon: FileSearch,
    title: "Difficult Incident Investigation",
    text: "When an agentic workflow fails or acts unexpectedly, engineering teams waste hours correlating scattered logs rather than inspecting verified event timelines.",
  },
  {
    icon: FileCheck2,
    title: "Insufficient Audit Evidence",
    text: "Compliance teams and regulators demand deterministic audit trails. Unanchored agent outputs lack the cryptographic hashes required for formal review.",
  },
  {
    icon: ShieldAlert,
    title: "Operational & Security Blast Radius",
    text: "Direct agent integrations with production databases and internal APIs risk credential leakage unless strict read-only console governance is enforced.",
  },
];

const platformModules = [
  {
    id: "command",
    title: "Global Command Centre",
    icon: Radar,
    badge: "Cross-Tenant Fleet",
    description: "Real-time command plane providing top-level fleet health, active incident counts, SLA risk indicators, security alerts, and token spend aggregation.",
    points: [
      "Unified multi-tenant agent fleet overview",
      "Dynamic agent health and status monitors",
      "SLA risk indicators and anomaly detection",
      "Operational token and compute spend tracking",
    ],
  },
  {
    id: "passports",
    title: "Agent Passports",
    icon: Fingerprint,
    badge: "Identity & Trust",
    description: "Cryptographic identities for every agent in your fleet, certifying assigned autonomy levels, approved toolsets, token budgets, and hard boundaries.",
    points: [
      "Cryptographic agent identity & version attestation",
      "Granular trust score and autonomy tiers (Levels 1–5)",
      "Strict token budgets and rate-limiting quotas",
      "Explicitly blocked actions and tool allowlists",
    ],
  },
  {
    id: "telemetry",
    title: "Live Telemetry",
    icon: Gauge,
    badge: "Real-Time Observability",
    description: "Sub-second streaming metrics for agent compute, latency, throughput, error rates, and custom threshold breach notifications.",
    points: [
      "Real-time CPU, memory, and token throughput graphs",
      "Latency distributions and API call duration percentiles",
      "Error rate spikes and unhandled exception traces",
      "Threshold breach alerts dispatched to SRE channels",
    ],
  },
  {
    id: "rca",
    title: "Evidence & RCA",
    icon: FileSearch,
    badge: "Deterministic Investigation",
    description: "Turn operational anomalies into evidence-backed answers. Generates hash-verified evidence artefacts and cited root-cause postmortem reports.",
    points: [
      "Complete chronological incident timelines",
      "Cryptographic SHA-256 evidence hashes for audit integrity",
      "Deterministic root-cause reports citing actual source events",
      "Investigation workflows without speculative remediation",
    ],
  },
  {
    id: "policy",
    title: "Policy & Approvals",
    icon: Workflow,
    badge: "Human-in-the-Loop",
    description: "Automated policy evaluation engines with review queues for high-risk operations, ensuring sensitive actions require human sign-off.",
    points: [
      "Automated evaluation against corporate agent policy",
      "Escalation queues for out-of-boundary tool calls",
      "Structured operator approvals with recorded reasoning",
      "Reviewable execution logs with non-repudiation",
    ],
  },
  {
    id: "readonly",
    title: "Read-Only Boundary",
    icon: Lock,
    badge: "Zero-Trust Console",
    description: "Engineered specifically as a read-only observability and governance console. Zero shell access, zero cluster-admin privileges, and zero secret exposure.",
    points: [
      "No shell or terminal execution from the console UI",
      "No cluster-admin or root infrastructure access",
      "No raw secret or API key reading capability",
      "No autonomous or speculative remediation from the UI",
    ],
  },
];

const targetTeams = [
  {
    role: "Site Reliability Engineering (SRE)",
    icon: Activity,
    useCase: "Monitor fleet health, error rate spikes, latency budgets, and SLA risks across distributed agent workloads.",
  },
  {
    role: "Platform Engineering",
    icon: Server,
    useCase: "Standardize agent runtime environments, deploy Passports, and govern containerized Kubernetes infrastructure.",
  },
  {
    role: "Security Operations (SecOps)",
    icon: ShieldCheck,
    useCase: "Detect anomalous tool calls, verify agent identity attestation, and enforce zero secret reading policies.",
  },
  {
    role: "Agent Governance & Compliance",
    icon: FileCheck2,
    useCase: "Enforce autonomy tier boundaries, audit approval queues, and archive hash-verified investigation artefacts.",
  },
  {
    role: "Incident Response",
    icon: AlertTriangle,
    useCase: "Accelerate postmortem analysis using chronological event timelines backed by cryptographic evidence.",
  },
  {
    role: "FinOps & Leadership",
    icon: Gauge,
    useCase: "Track token consumption, compute costs, model provider spend, and operational ROI across agent fleets.",
  },
];

const roleMatrix = [
  {
    role: "Viewer",
    description: "Inspect dashboards, view live telemetry graphs, review Agent Passports, and read published RCA investigation reports.",
    scope: "Read-only access to monitoring views",
  },
  {
    role: "Operator",
    description: "Manage approval queues, initiate incident investigation workflows, export evidence artefacts, and annotate findings.",
    scope: "Investigation initiation & approval workflows",
  },
  {
    role: "Admin",
    description: "Register new agent fleets, configure autonomy policies, set token budgets, and audit user access histories.",
    scope: "Policy & fleet lifecycle management",
  },
  {
    role: "Owner",
    description: "Full tenant administration, private cluster integration, credential rotation, and organization-wide governance controls.",
    scope: "Tenant root configuration & security boundary",
  },
];

export const WecrewOpsPage: FC = () => {
  const [activeTab, setActiveTab] = useState(platformModules[0].id);

  const pageTitle = `WeCrew Ops | Enterprise Agent Operations Platform — ${site.name} Technologies`;
  const pageDescription =
    "WeCrew Ops: Enterprise agent operations platform for fleet visibility, agent passports, governance, live telemetry, and evidence-backed root cause analysis.";
  const canonicalUrl = `${site.url}/products/wecrew-ops`;

  const selectedModule = platformModules.find((m) => m.id === activeTab) || platformModules[0];

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(opsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* SECTION 01 — HERO */}
      <section className="relative overflow-hidden bg-hero pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
        {/* Glow backdrop */}
        <div
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(224,93,68,0.55), transparent)" }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E05D44]/40 bg-[#E05D44]/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#F27A59]">
              <Radar className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Enterprise Agent Operations Platform</span>
            </div>

            <h1 className="display-1 mt-6 text-white font-display">
              Your Agent Estate.{" "}
              <span className="text-gradient">One Intelligent Command Plane.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-white/75">
              A secure enterprise agent operations OS for fleet visibility, agent identity,
              governance, live telemetry, incident investigation, and evidence-backed operations —
              deployed on your own infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={wecrewOps.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E05D44] to-[#F27A59] px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Explore WeCrew Ops</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={wecrewOps.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>Read Documentation</span>
                <ArrowRight className="h-4 w-4 text-[#F27A59]" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/55 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-green-400" />
                Runs on your cluster
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-green-400" />
                Read-only by design
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-green-400" />
                Hash-verified evidence
              </span>
            </div>
          </div>

          {/* Interactive Command Centre Console Simulation */}
          <div className="mt-14 rounded-2xl border border-white/15 bg-navy-950/90 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-xs text-white/70">
                  sovereign.ops.wecrew.in/command
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[#E05D44]/20 border border-[#E05D44]/40 px-2.5 py-1 text-xs font-mono font-semibold text-[#F27A59]">
                  READ-ONLY SECURE PLANE
                </span>
                <span className="text-xs text-white/40 font-mono">cluster: eu-west-prod-01</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/50">Active Fleets</p>
                <p className="mt-1 text-2xl font-bold text-white">4 Fleets</p>
                <p className="mt-2 text-xs text-brand-green-400">● 24 Agents Healthy</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/50">Agent Passports</p>
                <p className="mt-1 text-2xl font-bold text-white">100% Valid</p>
                <p className="mt-2 text-xs text-cyan-400">0 Boundary Breaches</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/50">Investigation RCA</p>
                <p className="mt-1 text-2xl font-bold text-[#F27A59]">SHA-256 Verified</p>
                <p className="mt-2 text-xs text-white/60">Source Citing Enabled</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/50">Safety Envelope</p>
                <p className="mt-1 text-2xl font-bold text-white">Strict Lock</p>
                <p className="mt-2 text-xs text-white/60">Zero Shell / Zero Secrets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "WeCrew Ops" },
        ]}
      />

      {/* SECTION 02 — THE BUSINESS PROBLEM */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Operational Reality"
              title={
                <>
                  AI Agents Need More Than Deployment.{" "}
                  <span className="text-gradient">They Need Governance.</span>
                </>
              }
              description="Enterprises are deploying agentic workflows faster than traditional observability tools can adapt. Operating autonomous systems at scale creates fundamental security, reliability, and auditability challenges."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessChallenges.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#E05D44]/10 text-[#E05D44]">
                    <item.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — PRODUCT OVERVIEW (INTERACTIVE TABS) */}
      <section className="bg-base-soft py-20 sm:py-24 border-y border-line">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Architecture & Modules"
              title={
                <>
                  One Platform.{" "}
                  <span className="text-gradient">Complete Agent Operations Visibility.</span>
                </>
              }
              description="WeCrew Ops provides six integrated modules designed to give SRE, SecOps, and platform teams absolute transparency over their agentic estate without introducing security compromises."
            />
          </Reveal>

          {/* Module Selector */}
          <div className="mt-12 flex flex-wrap gap-2 justify-center">
            {platformModules.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveTab(mod.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === mod.id
                    ? "bg-[#E05D44] text-white shadow-md"
                    : "bg-base-raised text-ink-body hover:bg-base hover:text-ink border border-line"
                }`}
              >
                <mod.icon className="h-4 w-4" aria-hidden="true" />
                <span>{mod.title}</span>
              </button>
            ))}
          </div>

          {/* Active Module Display */}
          <Reveal className="mt-8 min-w-0">
            <div className="card min-w-0 overflow-hidden p-5 sm:p-10 border border-line bg-base-raised shadow-card">
              <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E05D44]/10 px-3 py-1 text-xs font-semibold text-[#E05D44]">
                    <selectedModule.icon className="h-3.5 w-3.5" />
                    {selectedModule.badge}
                  </span>

                  <h3 className="display-2 mt-4 break-words text-ink font-display">
                    {selectedModule.title}
                  </h3>

                  <p className="mt-3 text-[1.05rem] text-ink-body leading-relaxed">
                    {selectedModule.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {selectedModule.points.map((pt) => (
                      <li key={pt} className="flex min-w-0 items-start gap-2.5 text-sm text-ink-body">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E05D44] mt-0.5" />
                      <span className="min-w-0 break-words">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex min-w-0 flex-wrap items-center gap-4">
                    <a
                      href={wecrewOps.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-0 flex-wrap items-center gap-1.5 break-words text-sm font-semibold text-[#E05D44] hover:text-[#c44a33] transition-colors"
                    >
                      <span>Explore this module in live console</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Module Code/Data Preview */}
                <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-navy-950 p-4 sm:p-5 font-mono text-xs text-white/80 shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-white/50">
                    <span className="break-all">module::{selectedModule.id}.spec</span>
                    <span className="break-all text-[#F27A59]">verified-schema</span>
                  </div>
                  <pre className="mt-4 max-w-full overflow-x-auto text-[0.82rem] leading-relaxed text-cyan-300">
                    {JSON.stringify(
                      {
                        module: selectedModule.title,
                        status: "active",
                        telemetry: "live_stream",
                        accessControl: "read_only",
                        verification: "sha256_hash_chained",
                        boundary: "customer_cluster",
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 04 & 05 — COMMAND CENTRE & AGENT PASSPORTS */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          {/* Section 04: Command Centre */}
          <Reveal>
            <div className="card h-full p-8 sm:p-10 border border-line bg-base-raised flex flex-col justify-between">
              <div>
                <p className="eyebrow text-[#E05D44]">Global Fleet View</p>
                <h3 className="display-2 mt-3 text-ink">See Your Entire Agent Estate</h3>
                <p className="mt-4 text-ink-body leading-relaxed">
                  Consolidate cross-tenant agent health, active incidents, SLA risks, and security
                  signals into one high-density command interface. Never lose track of which agents
                  are operating, what tools they call, or how much compute they consume.
                </p>
                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-faint">Fleet Health Monitoring</span>
                    <span className="text-brand-green-500 font-semibold">Continuous Heartbeat</span>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-faint">Cross-Tenant Isolation</span>
                    <span className="text-ink font-semibold">Strict Namespacing</span>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-faint">Compute & Token Spend</span>
                    <span className="text-accent font-semibold">Real-Time Aggregated</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 05: Agent Passports */}
          <Reveal delay={120}>
            <div className="card h-full p-8 sm:p-10 border border-line bg-base-raised flex flex-col justify-between">
              <div>
                <p className="eyebrow text-[#E05D44]">Attestation & Boundaries</p>
                <h3 className="display-2 mt-3 text-ink">Know Every Agent. Understand Every Permission.</h3>
                <p className="mt-4 text-ink-body leading-relaxed">
                  Every agent in WeCrew Ops is issued a cryptographic Agent Passport. Passports declare
                  the agent's verified identity, runtime version, trust score, assigned autonomy tier,
                  strict token budgets, and explicitly blocked operations.
                </p>
                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-faint">Autonomy Tiering</span>
                    <span className="text-accent font-semibold">Level 1 (Advisor) → Level 4 (Exec)</span>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-faint">Trust Score Engine</span>
                    <span className="text-brand-green-500 font-semibold">Algorithmic Reliability Index</span>
                  </div>
                  <div className="flex justify-between border-b border-line pb-2">
                    <span className="text-ink-faint">Tool Whitelisting</span>
                    <span className="text-ink font-semibold">Hard Parameter Constraints</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 06 — INVESTIGATION & RCA */}
      <section className="bg-navy-950 text-white py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow text-[#F27A59]">Deterministic Analysis</span>
              <h2 className="display-2 mt-3 text-white font-display">
                Turn Operational Signals Into Evidence-Backed Answers
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                When complex multi-agent workflows encounter unexpected states, WeCrew Ops reconstructs
                the deterministic chain of events. Incident timelines cite exact prompt payloads,
                tool parameters, and output hashes — without speculative hallucinations or unverified
                autonomous remediation.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 font-mono">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <FileCheck2 className="h-6 w-6 text-[#F27A59]" />
              <h4 className="mt-4 text-sm font-semibold text-white">SHA-256 Artefacts</h4>
              <p className="mt-2 text-xs text-white/60 leading-relaxed">
                Evidence payloads are cryptographically hashed at receipt, preserving evidence integrity for forensic and compliance review.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <Workflow className="h-6 w-6 text-cyan-400" />
              <h4 className="mt-4 text-sm font-semibold text-white">Causal Event Chains</h4>
              <p className="mt-2 text-xs text-white/60 leading-relaxed">
                Chronological visualization connecting trigger events to agent evaluations, tool calls, and external system returns.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <Shield className="h-6 w-6 text-brand-green-400" />
              <h4 className="mt-4 text-sm font-semibold text-white">No Guesswork</h4>
              <p className="mt-2 text-xs text-white/60 leading-relaxed">
                RCA reports cite verified operational logs. WeCrew Ops does not attempt unreviewed autonomous remediation from the console UI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — SECURITY & GOVERNANCE ROLE MODEL */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Zero-Trust Access"
              title={
                <>
                  Enterprise Agent Operations{" "}
                  <span className="text-gradient">Without Compromising Control.</span>
                </>
              }
              description="WeCrew Ops is engineered with an uncompromising read-only security posture. The console never reads production secrets, never requests cluster-admin permissions, and never executes arbitrary shell commands."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roleMatrix.map((item) => (
              <Reveal key={item.role}>
                <div className="card h-full p-6 border border-line bg-base-raised flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-base-soft px-2.5 py-1 text-xs font-mono font-bold text-accent">
                      {item.role}
                    </span>
                    <p className="mt-4 text-sm text-ink-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-line pt-3 text-xs font-mono text-ink-faint">
                    {item.scope}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 08 — DEPLOYMENT */}
      <section className="bg-base-soft py-20 sm:py-24 border-y border-line">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <span className="eyebrow text-[#E05D44]">Private Sovereign Boundary</span>
                <h2 className="display-2 mt-3 text-ink">
                  Your Infrastructure. Your Operational Boundary.
                </h2>
                <p className="body-lg mt-4 text-ink-body">
                  Deploy WeCrew Ops entirely inside your customer-managed Kubernetes cluster or container
                  runtime. Your agent prompts, corporate knowledge, telemetry, and evidence artefacts
                  never leave your private security perimeter.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-ink-body">
                    <CheckCircle2 className="h-4 w-4 text-[#E05D44] shrink-0" />
                    <span>Customer-managed Kubernetes & container deployment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink-body">
                    <CheckCircle2 className="h-4 w-4 text-[#E05D44] shrink-0" />
                    <span>Scoped credentials with least-privilege telemetry ingestion</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink-body">
                    <CheckCircle2 className="h-4 w-4 text-[#E05D44] shrink-0" />
                    <span>Data, telemetry, and evidence artefacts remain in your VPC</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-base-raised p-6 sm:p-8 shadow-card">
                <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  Deployment Specs
                </p>
                <div className="mt-4 space-y-4 font-mono text-xs">
                  <div className="rounded-lg bg-base-soft p-3">
                    <span className="text-ink-faint">Runtime:</span>{" "}
                    <span className="font-semibold text-ink">OCI Container / Kubernetes Helm Chart</span>
                  </div>
                  <div className="rounded-lg bg-base-soft p-3">
                    <span className="text-ink-faint">Telemetry Ingress:</span>{" "}
                    <span className="font-semibold text-ink">gRPC / OTLP OpenTelemetry Native</span>
                  </div>
                  <div className="rounded-lg bg-base-soft p-3">
                    <span className="text-ink-faint">Storage Backend:</span>{" "}
                    <span className="font-semibold text-ink">Customer-Managed PostgreSQL / Timescale / S3</span>
                  </div>
                  <div className="rounded-lg bg-base-soft p-3">
                    <span className="text-ink-faint">Auth Integration:</span>{" "}
                    <span className="font-semibold text-ink">OIDC, SAML 2.0 & Enterprise SSO</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 09 — WHO IT IS FOR */}
      <section className="py-20 sm:py-24 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Target Teams"
              title={
                <>
                  Built for the Engineers{" "}
                  <span className="text-gradient">Operating Enterprise Systems.</span>
                </>
              }
              description="Whether triaging incident escalations, establishing agent identity standards, or managing corporate token budgets, WeCrew Ops unifies the operational stakeholders."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {targetTeams.map((team) => (
              <Reveal key={team.role}>
                <div className="card h-full p-6 border border-line bg-base-raised">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E05D44]/10 text-[#E05D44]">
                    <team.icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-display text-base font-semibold text-ink">
                    {team.role}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-ink-body">
                    {team.useCase}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="bg-hero text-white py-24 sm:py-28 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(224,93,68,0.45) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10 text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="display-1 text-white font-display">
              Make Your Agent Estate Operable.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              Bring visibility, governance, and evidence-backed investigation into one secure operations platform.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={wecrewOps.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E05D44] to-[#F27A59] px-7 py-3.5 text-sm font-semibold text-white shadow-xl hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Explore WeCrew Ops</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/contact#consultation"
                className={buttonClass("dark", "md")}
              >
                <span>Contact WeCrew</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default WecrewOpsPage;
