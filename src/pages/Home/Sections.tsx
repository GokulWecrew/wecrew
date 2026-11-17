import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  Code2,
  Compass,
  Cpu,
  Factory,
  Gem,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  Layers,
  Lock,
  Radar,
  Server,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Truck,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { CheckItem, SectionHeading, buttonClass } from "@/components/ui";
import { services, type Service } from "@/constants/services";
import { industries, type Industry } from "@/constants/industries";
import { site } from "@/constants/site";

const serviceIcons = {
  code: Code2,
  layers: Layers,
  brain: BrainCircuit,
  server: Server,
} as const;

/* ------------------------------------------------------------------ */
/* Company introduction                                                */
/* ------------------------------------------------------------------ */

const introPillars = [
  {
    icon: Compass,
    title: "Business-First Engineering",
    text: "Every engagement starts with your workflows, metrics and constraints — not a technology wish list.",
  },
  {
    icon: Layers,
    title: "Enterprise-Ready Architecture",
    text: "Systems designed for scale, auditability and security from the first commit.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Automation",
    text: "AI applied where it measurably helps — grounded in your data, governed for enterprise use.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    text: "We support and evolve what we build, year after year.",
  },
];

export function IntroSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-accent">Who we are</p>
            <h2 className="display-2 mt-3 text-ink">
              Your Technology Partner for{" "}
              <span className="text-gradient">What&apos;s Next</span>
            </h2>
            <p className="body-lg mt-6">
              WeCrew Technologies combines software engineering, AI
              capabilities, automation and infrastructure expertise to solve
              real business challenges — from enterprise applications that
              replace spreadsheet operations, to AI assistants that make
              institutional knowledge instantly accessible.
            </p>
            <p className="body-lg mt-4">
              We build the way enterprise software should be built: business
              goals first, architecture second, technology last. And we stay
              after launch — monitoring, maintaining and evolving what we ship.
            </p>
            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-strong"
            >
              Learn more about WeCrew
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {introPillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-cyan-600 text-white shadow-[0_6px_16px_rgb(22_104_216/0.28)]">
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured products                                                   */
/* ------------------------------------------------------------------ */

const copilotCapabilities = [
  "AI-powered enterprise knowledge assistant",
  "Internal documentation & SOP search",
  "Source-cited answers your team can verify",
  "Integrated ITSM workflows & incident management",
  "Root cause analysis assistance",
  "Intelligent observability integrations",
  "AI agents and automation",
  "Enterprise access control & audit logging",
];

function CopilotCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
      <div
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(79,205,247,0.6), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-brand-600 text-white">
              <BrainCircuit className="h-5.5 w-5.5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-white">
                WeCrew Copilot AI
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-400">
                Enterprise AI Assistant
              </p>
            </div>
          </div>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-white/75">
            The enterprise AI assistant for IT, DevOps &amp; business
            operations — a knowledge copilot grounded in your documentation,
            tickets and runbooks, with retrieval-augmented generation,
            integrated ITSM workflows and self-hosted Kubernetes deployment
            that keeps your data in your control.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {copilotCapabilities.slice(0, 6).map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-white/65">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-cyan-400" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products/copilot-ai" className={buttonClass("primary", "md")}>
              Explore Copilot AI
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.products.copilot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              Open product portal
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        {/* Product visual: chat/answer mock rendered in code (actual product is login-gated) */}
        <div className="relative hidden lg:block">
          <div className="animate-float rounded-xl border border-white/10 bg-hero/80 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
              <span className="ml-2 text-[0.7rem] text-white/40">copilot.wecrew.in</span>
            </div>
            <div className="mt-4 space-y-3.5 text-[0.8rem] leading-relaxed">
              <p className="w-fit rounded-lg rounded-br-sm bg-white/[0.07] px-3.5 py-2.5 text-white/80">
                Why did the payment service error spike last night?
              </p>
              <div className="rounded-lg rounded-bl-sm border border-cyan-500/20 bg-cyan-500/[0.06] px-3.5 py-2.5 text-white/70">
                <p>
                  Deploy <span className="font-mono text-cyan-300">v2.14.3</span> at
                  22:41 changed the retry policy — connection pool exhaustion
                  followed. Rollback in runbook RB-117.
                </p>
                <p className="mt-2 text-[0.72rem] text-white/40">
                  Sources: deploy-log #4821 · postmortem-draft.md · RB-117
                </p>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/10 px-3.5 py-2.5 text-white/40">
                <span>Ask Copilot…</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SentinelCard() {
  const capabilities = ["Live API discovery", "Continuous API testing", "Runtime protection", "Full life cycle coverage"];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-base-raised shadow-card">
      <div
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(61,139,255,0.35), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="flex items-center gap-3">
            {/* Sentinel brand mark: shield, per the product's own identity */}
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, #3D8BFF, #4EE0C2)" }}
              aria-hidden="true"
            >
              <ShieldCheck className="h-5.5 w-5.5 text-white" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                WeCrew Sentinel
              </p>
              <p
                className="text-xs uppercase tracking-[0.16em]"
                style={{ color: "#3D8BFF" }}
              >
                API Security Platform
              </p>
            </div>
          </div>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-body">
            Sentinel is WeCrew&apos;s full life cycle API security platform —{" "}
            <strong className="font-semibold text-ink">
              Discover, Test, and Protect
            </strong>{" "}
            your APIs. Built around the principle{" "}
            <em>&ldquo;Evidence before action. Protection before breach.&rdquo;</em>{" "}
            Sentinel provides live API discovery, testing, and runtime
            protection across the entire API life cycle.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-ink-body">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#4EE0C2]" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products/sentinel" className={buttonClass("dark", "md")}>
              Explore Sentinel
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.products.sentinel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-faint transition-colors hover:text-ink"
            >
              Open product portal
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        {/* Discovery · Test · Defend visual */}
        <div className="relative hidden lg:flex flex-col justify-center gap-4">
          {[
            { label: "Discover", desc: "Every API in your estate, found live", color: "#3D8BFF" },
            { label: "Test", desc: "Continuous security validation", color: "#4EE0C2" },
            { label: "Defend", desc: "Runtime protection in production", color: "#3D8BFF" },
          ].map((step, i) => (
            <div
              key={step.label}
              className="animate-float flex items-center gap-4 rounded-xl border border-line bg-base-soft p-4"
              style={{ animationDelay: `${i * 1.1}s`, marginLeft: i * 16 }}
            >
              <span
                className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg font-display text-sm font-bold text-white"
                style={{ background: step.color }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-ink">{step.label}</p>
                <p className="text-xs text-ink-faint">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const opsCapabilities = [
  "Global Command Centre: Cross-tenant agent fleet visibility, health & spend",
  "Agent Passports: Trust scores, autonomy levels, token budgets & identity",
  "Live Telemetry: CPU, latency, error rates, throughput & threshold alerts",
  "Evidence & RCA: Hash-verified evidence artefacts & source-backed reports",
  "Policy & Approvals: Evaluation queues, escalation flows & reviewable ops",
  "Read-Only Operations: Zero shell access, no cluster-admin, no secret reads",
  "Enterprise Deployment: Container-based, customer-managed private infrastructure",
];

function WecrewOpsCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-base-raised shadow-card">
      <div
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(224,93,68,0.35), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#E05D44] to-[#F27A59] text-white shadow-md"
              aria-hidden="true"
            >
              <Radar className="h-5.5 w-5.5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                WeCrew Ops
              </p>
              <p
                className="text-xs uppercase tracking-[0.16em] font-semibold"
                style={{ color: "#E05D44" }}
              >
                Enterprise Agent Operations Platform
              </p>
            </div>
          </div>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-body">
            <strong className="font-semibold text-ink">
              Your agent estate. One intelligent command plane.
            </strong>{" "}
            Bring agent fleets, identities, incidents, telemetry, governance, and
            evidence-backed investigations together through one secure enterprise
            operations platform deployed on your own infrastructure.
          </p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {opsCapabilities.slice(0, 6).map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-ink-body">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-[#E05D44]" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products/wecrew-ops" className={buttonClass("primary", "md")}>
              Explore WeCrew Ops
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.products.ops}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-faint transition-colors hover:text-ink"
            >
              Live portal
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.products.opsDocs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-faint transition-colors hover:text-ink"
            >
              Docs
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Console Command Plane Visual */}
        <div className="relative hidden lg:block">
          <div className="animate-float rounded-xl border border-line bg-base-soft/90 p-5 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E05D44]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold text-ink">sovereign.ops.wecrew.in</span>
              </div>
              <span className="rounded bg-[#E05D44]/10 px-2 py-0.5 text-[0.68rem] font-semibold text-[#E05D44]">
                READ-ONLY CONSOLE
              </span>
            </div>
            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between rounded-lg border border-line bg-base p-2.5">
                <span className="text-ink-faint">Fleet Status</span>
                <span className="font-semibold text-brand-green-500">24 AGENTS ONLINE</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-line bg-base p-2.5">
                <span className="text-ink-faint">Agent Passports</span>
                <span className="font-semibold text-accent">100% VALIDATED</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-line bg-base p-2.5">
                <span className="text-ink-faint">Investigation RCA</span>
                <span className="text-[#E05D44] font-semibold">HASH-VERIFIED EVIDENCE</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-line bg-base p-2.5">
                <span className="text-ink-faint">Boundary Security</span>
                <span className="text-ink font-semibold">ZERO SHELL / ZERO SECRET READS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsSection() {
  return (
    <section className="bg-base-soft py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Our products"
            title={
              <>
                Intelligent Products.{" "}
                <span className="text-gradient">Engineered for Enterprise.</span>
              </>
            }
            description="WeCrew builds intelligent enterprise products that simplify operations, strengthen governance, and accelerate business transformation."
          />
        </Reveal>
        <div className="mt-14 space-y-8">
          <Reveal>
            <CopilotCard />
          </Reveal>
          <Reveal>
            <SentinelCard />
          </Reveal>
          <Reveal>
            <WecrewOpsCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services overview                                                   */
/* ------------------------------------------------------------------ */

export function ServicesSection() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Four practices. One{" "}
                <span className="text-gradient">accountable team</span>
              </>
            }
            description="From the first discovery call to the platform running your business, one team designs, builds and operates — no handoffs between vendors."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const Icon = serviceIcons[service.icon];
  return (
    <Reveal delay={delay}>
      <Link
        to={`/services/${service.slug}`}
        className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
      >
        <div className="flex items-start justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-cyan-400 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="font-display text-sm font-semibold text-ink-faint transition-colors group-hover:text-brand-300">
            0{services.indexOf(service) + 1}
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          {service.name}
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-body">
          {service.short}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          View service
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Why WeCrew                                                          */
/* ------------------------------------------------------------------ */

const differentiators = [
  {
    icon: Compass,
    title: "Business-First Approach",
    text: "We measure success in your business outcomes — faster operations, lower error rates, better decisions — not in features delivered.",
  },
  {
    icon: Gem,
    title: "Custom Engineering",
    text: "No forced platform lock-in. We design around your processes and your data, and you own what we build.",
  },
  {
    icon: Layers,
    title: "Enterprise-Ready Architecture",
    text: "Scalable data models, clean integration boundaries, audit trails and deployment discipline from day one.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Driven Innovation",
    text: "We build and run our own AI products, so our AI practice is grounded in production reality, not slideware.",
  },
  {
    icon: Lock,
    title: "Security-Focused Development",
    text: "Security reviews, least-privilege access and hardened infrastructure are part of the delivery process, not an afterthought.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    text: "Architecture that grows with transaction volume, team size and ambition — without rewrites.",
  },
  {
    icon: Workflow,
    title: "Transparent Delivery",
    text: "Incremental releases, working software you can evaluate, and honest communication about progress and trade-offs.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    text: "We operate and evolve what we build. Most of our client relationships are measured in years, not projects.",
  },
];

export function WhyWeCrew() {
  return (
    <section className="relative overflow-hidden bg-hero py-24 text-white sm:py-28">
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -bottom-40 left-[15%] h-[380px] w-[560px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(34,184,240,0.55), transparent)" }}
        aria-hidden="true"
      />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Why WeCrew"
            title={
              <>
                Built for businesses that need{" "}
                <span className="text-gradient">engineering they can trust</span>
              </>
            }
            description="Eight commitments that shape how we design, deliver and operate every engagement."
          />
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-base-raised/10 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={(i % 4) * 80} className="h-full">
              <div className="group h-full bg-navy-900/80 p-7 backdrop-blur transition-colors duration-300 hover:bg-navy-800">
                <d.icon
                  className="h-6 w-6 text-cyan-400 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-[1.02rem] font-semibold text-white">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {d.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

const industryIconMap: Record<Industry["icon"], React.ComponentType<{ className?: string }>> = {
  bank: Landmark,
  heart: HeartPulse,
  graduation: GraduationCap,
  factory: Factory,
  cart: ShoppingCart,
  chip: Cpu,
  truck: Truck,
  briefcase: Briefcase,
};

export function IndustriesSection() {
  return (
    <section className="bg-base-soft py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Industries"
            title={
              <>
                Domain context, engineered{" "}
                <span className="text-gradient">into the software</span>
              </>
            }
            description="Every industry runs on different workflows, compliance pressures and systems of record. We bring engineering depth to each."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => {
            const Icon = industryIconMap[industry.icon];
            return (
              <Reveal key={industry.slug} delay={(i % 4) * 80}>
                <Link
                  to={`/industries#${industry.slug}`}
                  className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-accent transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-500/10 dark:text-accent dark:group-hover:bg-brand-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.02rem] font-semibold text-ink">
                    {industry.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-faint">
                    {industry.solutions[0]}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/industries" className={buttonClass("secondary", "md")}>
            Explore industries in detail
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Engagement process                                                  */
/* ------------------------------------------------------------------ */

const processSteps = [
  { n: "01", title: "Discovery & Consultation", text: "A structured conversation about your business, systems and goals — before any proposal." },
  { n: "02", title: "Business Requirement Analysis", text: "Workflows, users, data and constraints documented into clear, testable requirements." },
  { n: "03", title: "Solution Architecture", text: "Data models, system design, integration plan and security reviewed before code." },
  { n: "04", title: "UI/UX & Prototyping", text: "Interactive prototypes validate the experience with real users early." },
  { n: "05", title: "Development & Integration", text: "Incremental delivery of working software, integrated with your existing systems." },
  { n: "06", title: "Testing & Quality Assurance", text: "Automated tests, security review and performance validation at every milestone." },
  { n: "07", title: "Deployment & Launch", text: "Staged rollout with monitoring, rollback plans and zero-surprise cutover." },
  { n: "08", title: "Maintenance & Improvement", text: "Ongoing support, measurement and a roadmap that compounds value." },
];

export function ProcessSection() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="How we engage"
            title={
              <>
                A disciplined path from{" "}
                <span className="text-gradient">idea to operation</span>
              </>
            }
            description="Eight stages, each with a clear deliverable — so you always know what is happening, what comes next, and what it will produce."
          />
        </Reveal>
        <div className="relative mt-16">
          {/* Spine */}
          <div
            className="absolute left-[1.35rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand-500 via-cyan-500 to-brand-green-500 sm:left-1/2"
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={60} as="li">
                <div
                  className={`relative flex gap-6 sm:w-1/2 ${
                    i % 2 === 0
                      ? "sm:pr-14"
                      : "sm:ml-auto sm:flex-row-reverse sm:pl-14 sm:text-right"
                  }`}
                >
                  <span
                    className={`relative z-10 inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border-2 border-brand-500 bg-base-raised font-display text-sm font-bold text-accent shadow-card ${
                      i % 2 === 0 ? "" : "sm:order-2"
                    }`}
                  >
                    {step.n}
                  </span>
                  <div className={`pt-1.5 ${i % 2 === 0 ? "" : "sm:order-1 sm:mr-auto"}`}>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-body sm:inline-block">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-hero py-24 text-white sm:py-28">
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(43,125,233,0.6), rgba(63,201,78,0.2), transparent)" }}
        aria-hidden="true"
      />
      <div className="container-x relative text-center">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Let's build"
            title={
              <>
                Have a Business Challenge?{" "}
                <span className="text-gradient">Let&apos;s Engineer the Solution.</span>
              </>
            }
            description="From enterprise applications to intelligent AI platforms, our team can help transform your ideas into scalable technology solutions."
            className="mx-auto"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact#consultation" className={buttonClass("primary", "lg")}>
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className={buttonClass("outline-light", "lg")}>
              Contact Our Team
            </Link>
          </div>
          <div className="mt-14 grid gap-3 text-sm text-white/60 sm:grid-cols-3">
            <div className="dark-card flex items-center justify-center gap-2.5 px-5 py-4">
              <CheckItem tone="dark">We reply to every inquiry</CheckItem>
            </div>
            <div className="dark-card flex items-center justify-center gap-2.5 px-5 py-4">
              <CheckItem tone="dark">No-pressure discovery calls</CheckItem>
            </div>
            <div className="dark-card flex items-center justify-center gap-2.5 px-5 py-4">
              <CheckItem tone="dark">NDA on request</CheckItem>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
