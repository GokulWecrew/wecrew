import { useState, type FC } from "react";
import {
  Code,
  Cpu,
  Database,
  Layers,
  Server,
  Terminal,
  Zap,
  CheckCircle2,
  Box,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { technologyCategories, type TechnologyCategory } from "@/constants/technologies";

const categoryIconMap = {
  frontend: Code,
  backend: Terminal,
  database: Database,
  devops: Server,
};

export const TechnologyStack: FC<{ className?: string }> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedCategories =
    activeTab === "all"
      ? technologyCategories
      : technologyCategories.filter((cat) => cat.id === activeTab);

  return (
    <div className={className}>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-line pb-6">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-accent text-white shadow-sm"
              : "bg-base-soft text-ink-body hover:bg-base-raised hover:text-ink"
          }`}
        >
          All Technologies ({technologyCategories.flatMap((c) => c.items).length})
        </button>

        {technologyCategories.map((cat) => {
          const Icon = categoryIconMap[cat.id] || Box;
          const isSelected = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-accent text-white shadow-sm"
                  : "bg-base-soft text-ink-body hover:bg-base-raised hover:text-ink"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Categories & Cards Grid */}
      <div className="mt-12 space-y-12">
        {displayedCategories.map((cat) => (
          <div key={cat.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/60 pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {cat.label}
                </h3>
                <p className="mt-1 text-xs text-ink-faint">
                  {cat.shortDescription}
                </p>
              </div>
              <span className="font-mono text-xs font-medium text-accent">
                {cat.items.length} Core Technologies
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cat.items.map((tech, idx) => (
                <Reveal key={tech.name} delay={idx * 60}>
                  <div className="group h-full rounded-xl border border-line bg-base-raised p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-ink group-hover:text-accent transition-colors">
                          {tech.name}
                        </span>
                        {tech.highlight && (
                          <span className="rounded bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                            {tech.highlight}
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-ink-body">
                        {tech.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-line/40 flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
                      <CheckCircle2 className="h-3 w-3 text-cyan-500" />
                      <span>Production Verified Stack</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Honest Engineering Selection Note */}
      <div className="mt-14 rounded-2xl bg-base-soft p-6 sm:p-8 border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Architecture Philosophy
          </span>
          <h4 className="font-display text-lg font-bold text-ink mt-1">
            Technologies Selected for Longevity, Not Hype
          </h4>
          <p className="text-xs sm:text-sm text-ink-body mt-1.5 max-w-2xl leading-relaxed">
            We choose platforms based on your exact business requirements, security standards, team
            hiring capacity, and operational maintainability — never forcing trendy frameworks where
            stable, proven solutions deliver higher reliability.
          </p>
        </div>
        <span className="rounded-xl border border-line bg-base-raised px-4 py-2 font-mono text-xs font-semibold text-ink flex-none shadow-sm">
          Fit Over Fashion
        </span>
      </div>
    </div>
  );
};

export default TechnologyStack;
