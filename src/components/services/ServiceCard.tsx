import { useState, useRef, type FC, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  MessageSquare,
  Server,
  Sparkles,
} from "lucide-react";
import type { Service } from "@/constants/services";
import { buttonClass } from "@/components/ui";

const iconMap = {
  code: Code2,
  layers: Layers,
  brain: BrainCircuit,
  server: Server,
};

export interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard: FC<ServiceCardProps> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number; opacity: number }>({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const Icon = iconMap[service.icon] || Code2;

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 0.15,
    });
  };

  const handlePointerLeave = () => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-base-raised p-6 sm:p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
    >
      {/* React Bits-inspired Spotlight glow overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(22, 104, 216, 0.25), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      <div>
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-cyan-400 border border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                {service.category}
              </span>
              <p className="font-mono text-[11px] text-ink-faint">
                Practice 0{index + 1}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-base-soft px-3 py-1 font-mono text-xs font-semibold text-ink-faint border border-line">
            WeCrew Practice
          </span>
        </div>

        {/* Headline & Name */}
        <div className="mt-6">
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.65rem]">
            {service.name}
          </h3>
          <p className="mt-2 font-display text-base font-semibold text-accent leading-snug">
            &ldquo;{service.headline}&rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-body">
            {service.short}
          </p>
        </div>

        {/* Key Capabilities */}
        <div className="mt-6 pt-5 border-t border-line/60">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3">
            Core Engineering Capabilities
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {service.capabilities.slice(0, 6).map((cap) => (
              <div key={cap} className="flex items-start gap-2 text-xs text-ink-body">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-cyan-500" />
                <span className="leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Typical Business Applications */}
        <div className="mt-6 pt-5 border-t border-line/60">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2.5">
            Typical Business Applications
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.businessApplications.map((app) => (
              <span
                key={app}
                className="rounded-lg border border-line bg-base-soft px-2.5 py-1 text-xs text-ink-body"
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Technology Stack Tags */}
        <div className="mt-6 pt-5 border-t border-line/60">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-faint mb-2.5">
            Key Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.expertise.flatMap((e) => e.items).slice(0, 7).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-brand-200/50 bg-brand-50/50 px-2 py-0.5 font-mono text-[11px] font-medium text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dual CTA Actions */}
      <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-3">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-strong transition-colors"
        >
          <span>{service.ctaText}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          to="/contact#consultation"
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-base-soft px-3.5 py-2 text-xs font-semibold text-ink hover:bg-base hover:border-accent/40 transition-all"
        >
          <MessageSquare className="h-3.5 w-3.5 text-accent" />
          <span>Discuss This Service</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
