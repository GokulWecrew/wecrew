import type { FC } from "react";
import { Sparkles, Cpu, Users, Compass } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

export interface LeadershipPrincipleItem {
  icon: typeof Sparkles;
  title: string;
  description: string;
  accent: string;
}

const principles: LeadershipPrincipleItem[] = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Building intelligent solutions for evolving business challenges.",
    accent: "text-cyan-400 bg-cyan-500/10 border-cyan-400/20",
  },
  {
    icon: Cpu,
    title: "Engineering Excellence",
    description: "Prioritizing quality, reliability, security, and scalability.",
    accent: "text-blue-400 bg-blue-500/10 border-blue-400/20",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Creating practical technology that delivers measurable business value.",
    accent: "text-emerald-400 bg-emerald-500/10 border-emerald-400/20",
  },
  {
    icon: Compass,
    title: "Long-Term Vision",
    description: "Developing sustainable products and technology partnerships.",
    accent: "text-amber-400 bg-amber-500/10 border-amber-400/20",
  },
];

export const LeadershipPrinciples: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 ${className}`}>
      {principles.map((item, idx) => (
        <Reveal key={item.title} delay={idx * 70} className="min-w-0">
          <div className="group min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg border flex-none ${item.accent}`}
              >
                <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h4 className="font-display text-sm font-semibold text-white tracking-tight">
                {item.title}
              </h4>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
              {item.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

export default LeadershipPrinciples;
