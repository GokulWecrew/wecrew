import type { FC } from "react";
import {
  Compass,
  Workflow,
  Wrench,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

export interface PillarItem {
  title: string;
  description: string;
  icon: typeof Compass;
}

const pillars: PillarItem[] = [
  {
    title: "Business-Focused Engineering",
    description: "We invest time to deeply understand your actual business problem, operational workflows, and revenue model before recommending any technical solution.",
    icon: Compass,
  },
  {
    title: "Tailored Solutions",
    description: "We don't force rigid off-the-shelf templates. Every application is designed and developed according to the way your organization actually functions.",
    icon: Workflow,
  },
  {
    title: "Practical Technology Choices",
    description: "We choose mature, well-supported technologies based on total cost of ownership, performance, and long-term team maintainability — not hype.",
    icon: Wrench,
  },
  {
    title: "End-to-End Delivery",
    description: "From discovery consultation and UI/UX design to full-stack code implementation, security hardening, and production infrastructure operations.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Architecture",
    description: "We design data models, APIs, and infrastructure boundaries that accommodate transaction growth, multi-tenant users, and future expansions gracefully.",
    icon: TrendingUp,
  },
  {
    title: "Transparent Collaboration",
    description: "No long silences followed by surprise reveals. We maintain clear milestone communication, weekly demos, and honest technical assessments.",
    icon: MessageSquare,
  },
  {
    title: "Long-Term Partnership",
    description: "Delivery is never the end of our involvement. We support continuous improvements, ongoing monitoring, and strategic enhancements as you scale.",
    icon: HeartHandshake,
  },
];

export const WhyChooseWeCrew: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, idx) => (
          <Reveal key={p.title} delay={idx * 60}>
            <div className="group h-full rounded-2xl border border-line bg-base-raised p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <p.icon className="h-5.5 w-5.5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-body">
                {p.description}
              </p>
            </div>
          </Reveal>
        ))}

        {/* Closing summary card */}
        <Reveal delay={pillars.length * 60}>
          <div className="h-full rounded-2xl border border-brand-200 bg-brand-50/60 p-6 dark:border-brand-500/20 dark:bg-brand-500/10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                Our Guarantee
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">
                Engineers Working as One Crew With Your Team
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-body">
                The name is our commitment: WeCrew. Your team and ours collaborating with shared
                accountability and complete technical transparency.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-accent font-semibold">
              <CheckCircle2 className="h-4 w-4 text-cyan-500" />
              <span>Dedicated Named Engineering Team</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default WhyChooseWeCrew;
