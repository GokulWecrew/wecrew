import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BrainCircuit, Shield, Radar, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { allProducts } from "@/constants/products";

const productIconMap = {
  "copilot-ai": BrainCircuit,
  sentinel: Shield,
  "wecrew-ops": Radar,
};

export const ProductShowcase: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="grid gap-8 lg:grid-cols-3">
        {allProducts.map((prod, idx) => {
          const Icon = productIconMap[prod.id as keyof typeof productIconMap] || BrainCircuit;
          return (
            <Reveal key={prod.id} delay={idx * 80}>
              <div
                className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-navy-950/80 p-7 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                style={{
                  borderTop: `3px solid ${prod.accentHex}`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: `${prod.accentHex}20`, color: prod.accentHex }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40">
                      Product 0{idx + 1}
                    </span>
                  </div>

                  <span
                    className="mt-5 inline-block font-mono text-xs font-semibold uppercase tracking-wider"
                    style={{ color: prod.accentHex }}
                  >
                    {prod.eyebrow}
                  </span>

                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">
                    {prod.name}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/70">
                    {prod.shortDescription}
                  </p>

                  <div className="mt-6 space-y-2.5 pt-5 border-t border-white/10">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                      Key Capabilities
                    </p>
                    {prod.capabilities.slice(0, 3).map((cap) => (
                      <div key={cap} className="flex items-start gap-2 text-xs text-white/80">
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 flex-none"
                          style={{ color: prod.accentHex }}
                        />
                        <span className="leading-snug">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                  <Link
                    to={prod.route}
                    className="inline-flex items-center gap-1.5 text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>View Product Page</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={prod.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-white/60 hover:text-white transition-colors"
                  >
                    <span>Live Portal</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default ProductShowcase;
