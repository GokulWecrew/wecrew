import type { FC } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Clock, Users, Wrench, Shield, BrainCircuit } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

export interface EngagementModelItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  idealFor: string;
  highlights: string[];
  icon: typeof Clock;
}

const engagementOptions: EngagementModelItem[] = [
  {
    id: "fixed-scope",
    name: "Fixed-Scope Project Delivery",
    badge: "Milestone-Based",
    description: "Clear deliverables, fixed pricing, and predictable timelines agreed upon before kickoff. Perfect for well-defined applications, portals, and MVP builds.",
    idealFor: "Startups and enterprises with documented requirements and clear boundaries.",
    highlights: [
      "Fixed milestone payments tied to validated deliveries",
      "Defined functional specifications and UI/UX prototypes",
      "Explicit completion criteria and warranty period",
    ],
    icon: Clock,
  },
  {
    id: "dedicated-team",
    name: "Dedicated Development Team",
    badge: "Embedded Capacity",
    description: "A tailored engineering team of senior developers, UI/UX designers, and QA engineers working as a direct extension of your internal product organisation.",
    idealFor: "Growing businesses requiring long-term engineering depth without hiring overhead.",
    highlights: [
      "Direct communication in your Slack/Teams and Jira",
      "Agile 2-week sprint cadences with continuous delivery",
      "Flexible scaling of team composition as requirements evolve",
    ],
    icon: Users,
  },
  {
    id: "maintenance",
    name: "Monthly Maintenance & Support",
    badge: "SLA-Backed",
    description: "Continuous operational care, monitoring, security patch management, bug fixes, performance tuning, and on-call technical assistance for live production systems.",
    idealFor: "Live systems requiring guaranteed uptime, quick incident response, and ongoing updates.",
    highlights: [
      "Defined SLA response times for P1 through P4 incidents",
      "Proactive security updates and dependency upgrades",
      "Regular health checks and disaster recovery drills",
    ],
    icon: Wrench,
  },
  {
    id: "devops-infra",
    name: "DevOps & Infrastructure Engagement",
    badge: "Platform Engineering",
    description: "Specialized engineering to containerize workloads, deploy Kubernetes clusters, build automated CI/CD pipelines, and harden cloud infrastructure.",
    idealFor: "Companies modernizing legacy servers or preparing platforms for heavy traffic.",
    highlights: [
      "Zero-downtime release pipeline implementation",
      "Infrastructure as Code (IaC) versioned in Git",
      "Full observability instrumentation with Prometheus/Grafana",
    ],
    icon: Shield,
  },
  {
    id: "ai-consulting",
    name: "AI Solution Consulting & Implementation",
    badge: "Applied AI Sprint",
    description: "Structured advisory and hands-on build sprints to evaluate business data, construct enterprise RAG assistants, and safely automate repetitive operations.",
    idealFor: "Organizations seeking to safely leverage AI with data privacy and verifiable sources.",
    highlights: [
      "Private VPC / on-premises deployment readiness",
      "Source-grounded RAG architectures with audit logging",
      "Use-case feasibility scoring and ROI validation",
    ],
    icon: BrainCircuit,
  },
];

export const EngagementModels: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {engagementOptions.map((model, idx) => (
          <Reveal key={model.id} delay={idx * 60}>
            <div className="group h-full rounded-2xl border border-line bg-base-raised p-6 sm:p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-lg">
                    {model.badge}
                  </span>
                  <model.icon className="h-5 w-5 text-ink-faint group-hover:text-accent transition-colors" />
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-ink">
                  {model.name}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-body">
                  {model.description}
                </p>

                <div className="mt-5 pt-4 border-t border-line/60">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                    Ideal For
                  </p>
                  <p className="mt-1 text-xs text-ink-body font-medium">
                    {model.idealFor}
                  </p>
                </div>

                <div className="mt-5 space-y-2">
                  {model.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-ink-body">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-cyan-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-line">
                <Link
                  to="/contact#consultation"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-strong transition-colors"
                >
                  <span>Discuss This Engagement Model</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Consultation Callout */}
        <Reveal delay={engagementOptions.length * 60}>
          <div className="h-full rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:p-7 dark:border-brand-500/20 dark:bg-brand-500/10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Tailored Engagements
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">
                Need a Hybrid or Phased Structure?
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-body">
                Many clients begin with a focused discovery sprint or MVP build, transitioning into a
                dedicated team or maintenance model after launch. We structure engagements around your
                operational rhythm.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-brand-200/60 dark:border-brand-500/20">
              <Link
                to="/contact#consultation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-strong transition-colors"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default EngagementModels;
