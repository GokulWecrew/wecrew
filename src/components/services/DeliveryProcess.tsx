import type { FC } from "react";
import {
  Compass,
  FileCheck2,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
  icon: typeof Compass;
}

const steps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Consultation",
    description: "Understand business objectives, current bottlenecks, end users, and operational requirements.",
    deliverable: "Initial Discovery Brief & Feasibility Assessment",
    icon: Compass,
  },
  {
    step: "02",
    title: "Requirement Analysis",
    description: "Define scope, technical prerequisites, data models, integration boundaries, and delivery milestones.",
    deliverable: "Functional Specification & Architecture Plan",
    icon: FileCheck2,
  },
  {
    step: "03",
    title: "Architecture & UI/UX",
    description: "Design system architecture, user journeys, wireframes, component design systems, and database schemas.",
    deliverable: "Interactive Prototypes & System Architecture Blueprint",
    icon: Layers,
  },
  {
    step: "04",
    title: "Development",
    description: "Implement the solution using suitable technologies, clean code conventions, and modular engineering practices.",
    deliverable: "Iterative Working Software & Source Code Commits",
    icon: Code2,
  },
  {
    step: "05",
    title: "Testing & Quality Assurance",
    description: "Validate functionality, automated unit/integration suites, security vulnerabilities, performance, and cross-device responsiveness.",
    deliverable: "QA Test Reports & Security Hardening Audit",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Deployment & Launch",
    description: "Deploy the application into agreed hosting, cloud, or on-premises Kubernetes environments with zero-downtime procedures.",
    deliverable: "Production Release & Infrastructure Handover",
    icon: Rocket,
  },
  {
    step: "07",
    title: "Ongoing Support",
    description: "Provide proactive monitoring, SLA-backed maintenance, bug remediation, security patches, and iterative enhancements.",
    deliverable: "Operational Runbooks, 24/7 Monitoring & Support SLA",
    icon: Headphones,
  },
];

export const DeliveryProcess: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, idx) => (
          <Reveal key={item.step} delay={idx * 60}>
            <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-line bg-base-raised p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-lg">
                    Step {item.step}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-base-soft text-ink-faint group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-body">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line/60">
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  Key Deliverable
                </p>
                <div className="mt-1 flex items-start gap-1.5 text-xs text-ink font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 flex-none mt-0.5" />
                  <span className="leading-snug">{item.deliverable}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default DeliveryProcess;
