import { Link } from "react-router-dom";
import type { FC } from "react";
import { ArrowRight, ShieldCheck, Bot, Server } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { buttonClass } from "@/components/ui";

export interface HeroProps {
  className?: string;
}

/**
 * Custom hero visual: an authored SVG representing the convergence of
 * enterprise software, AI, cloud infrastructure and connected business
 * systems — the WeCrew orbit. No stock photography.
 */
function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      role="img"
      aria-label="Illustration of intelligent business systems: an AI core connected to enterprise software, cloud infrastructure, automation and data systems"
    >
      {/* Ambient glows */}
      <div
        className="absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 45%, rgba(43,125,233,0.35), transparent 70%), radial-gradient(30% 30% at 75% 70%, rgba(63,201,78,0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 560 500"
        className="h-auto w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wcr-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4fcdf7" />
            <stop offset="100%" stopColor="#22b8f0" />
          </linearGradient>
          <linearGradient id="wcr-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2b7de9" />
            <stop offset="100%" stopColor="#1668d8" />
          </linearGradient>
          <linearGradient id="wcr-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5bd968" />
            <stop offset="100%" stopColor="#3fc94e" />
          </linearGradient>
          <radialGradient id="wcr-core" cx="0.35" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="#3a8ef2" />
            <stop offset="100%" stopColor="#0e4da3" />
          </radialGradient>
        </defs>

        {/* Orbit rings */}
        <g className="origin-[280px_250px] animate-spin-slow">
          <ellipse
            cx="280"
            cy="250"
            rx="225"
            ry="205"
            stroke="url(#wcr-cyan)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="3 9"
          />
          <circle cx="505" cy="250" r="6" fill="url(#wcr-cyan)" />
        </g>
        <ellipse
          cx="280"
          cy="250"
          rx="160"
          ry="145"
          stroke="url(#wcr-blue)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />

        {/* Circuit traces to satellites */}
        <g strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none">
          {/* Enterprise software (top left) */}
          <path d="M280 250 H170 V155" stroke="#2b7de9" strokeOpacity="0.7" />
          <circle cx="170" cy="155" r="5" fill="#0a1628" stroke="#5bd968" strokeWidth="2.5" />
          <path d="M280 250 H155 V250 H120" stroke="#2b7de9" strokeOpacity="0.5" />
          <circle cx="120" cy="250" r="5" fill="#0a1628" stroke="#5bd968" strokeWidth="2.5" />
          {/* Cloud (right) */}
          <path d="M280 250 H400 V180" stroke="#22b8f0" strokeOpacity="0.7" />
          <circle cx="400" cy="180" r="5" fill="#0a1628" stroke="#4fcdf7" strokeWidth="2.5" />
          <path d="M280 250 H440 V330" stroke="#22b8f0" strokeOpacity="0.5" />
          <circle cx="440" cy="330" r="5" fill="#0a1628" stroke="#4fcdf7" strokeWidth="2.5" />
          {/* Automation (bottom) */}
          <path d="M280 250 V380 H210" stroke="#5bd968" strokeOpacity="0.7" />
          <circle cx="210" cy="380" r="5" fill="#0a1628" stroke="#5bd968" strokeWidth="2.5" />
          <path d="M280 250 V400 H360" stroke="#5bd968" strokeOpacity="0.5" />
          <circle cx="360" cy="400" r="5" fill="#0a1628" stroke="#5bd968" strokeWidth="2.5" />
        </g>

        {/* AI core */}
        <g>
          <circle
            cx="280"
            cy="250"
            r="74"
            fill="url(#wcr-core)"
            stroke="#4fcdf7"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <circle
            cx="280"
            cy="250"
            r="74"
            fill="none"
            stroke="#4fcdf7"
            strokeOpacity="0.35"
            strokeWidth="10"
            className="animate-pulse-soft"
          />
          {/* Globe lattice */}
          <ellipse
            cx="280"
            cy="250"
            rx="56"
            ry="56"
            stroke="#eaf4ff"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <ellipse
            cx="280"
            cy="250"
            rx="30"
            ry="56"
            stroke="#eaf4ff"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
          <path
            d="M226 234 H334 M226 266 H334"
            stroke="#eaf4ff"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
          <text
            x="280"
            y="242"
            textAnchor="middle"
            fill="#fff"
            fontFamily="var(--font-display)"
            fontWeight="700"
            fontSize="24"
          >
            AI
          </text>
          <text
            x="280"
            y="266"
            textAnchor="middle"
            fill="#cfe6ff"
            fontFamily="var(--font-inter)"
            fontWeight="500"
            fontSize="11"
            letterSpacing="1.5"
          >
            CORE
          </text>
        </g>

        {/* Satellite chips */}
        <g fontFamily="var(--font-inter)" fontWeight="600" fontSize="12.5">
          {/* Enterprise Software */}
          <g transform="translate(96,108)">
            <rect
              width="148"
              height="44"
              rx="10"
              fill="#0d1d33"
              stroke="#2b7de9"
              strokeOpacity="0.5"
            />
            <circle cx="24" cy="22" r="9" fill="#2b7de9" fillOpacity="0.25" />
            <path
              d="M20.5 22 l2.5 2.5 5 -5"
              stroke="#7db8f5"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <text x="42" y="26.5" fill="#dbeafe">
              Enterprise
            </text>
          </g>
          {/* Cloud */}
          <g transform="translate(330,128)">
            <rect
              width="140"
              height="44"
              rx="10"
              fill="#0d1d33"
              stroke="#22b8f0"
              strokeOpacity="0.5"
            />
            <path
              d="M30 27 c-5 0 -8 -3.5 -8 -7.5 c0 -3.8 2.8 -6.6 6.4 -6.9 c1 -3.4 4.2 -5.6 7.9 -5.6 c4.4 0 8 3.2 8.4 7.4 c2.8 0.4 5.3 2.7 5.3 6.1 c0 3.7 -3 6.5 -6.8 6.5 z"
              fill="none"
              stroke="#83e0fa"
              strokeWidth="1.8"
            />
            <text x="54" y="26.5" fill="#c9ecfb">
              Cloud
            </text>
          </g>
          {/* Automation */}
          <g transform="translate(148,356)">
            <rect
              width="150"
              height="44"
              rx="10"
              fill="#0d1d33"
              stroke="#5bd968"
              strokeOpacity="0.5"
            />
            <path
              d="M22 16 h8 v8 h-8 z M28 16 v-4 M32 24 h6 v6 h-6 z M22 24 v8 h8 v-8 z"
              stroke="#8ce797"
              strokeWidth="1.8"
              fill="none"
              strokeLinejoin="round"
            />
            <text x="46" y="26.5" fill="#dcf7e0">
              Automation
            </text>
          </g>
          {/* Data */}
          <g transform="translate(388,356)">
            <rect
              width="118"
              height="44"
              rx="10"
              fill="#0d1d33"
              stroke="#22b8f0"
              strokeOpacity="0.5"
            />
            <ellipse
              cx="29"
              cy="18.5"
              rx="8"
              ry="3.6"
              stroke="#83e0fa"
              strokeWidth="1.8"
              fill="none"
            />
            <path
              d="M21 18.5 v10 c0 2 3.6 3.6 8 3.6 s8 -1.6 8 -3.6 v-10 M21 23.5 c0 2 3.6 3.6 8 3.6 s8 -1.6 8 -3.6"
              stroke="#83e0fa"
              strokeWidth="1.8"
              fill="none"
            />
            <text x="46" y="26.5" fill="#c9ecfb">
              Data
            </text>
          </g>
        </g>
      </svg>

      {/* Floating glass cards (decorative, subtle) */}
      <div
        className="absolute -left-2 top-1/2 hidden animate-float md:block"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
          <Bot className="h-5 w-5 text-cyan-400" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-semibold text-white">Copilot AI</p>
            <p className="text-white/50">Knowledge assistant</p>
          </div>
        </div>
      </div>
      <div className="absolute -right-3 top-24 hidden animate-float md:block">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
          <ShieldCheck className="h-5 w-5 text-[#4EE0C2]" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-semibold text-white">Sentinel</p>
            <p className="text-white/50">API security</p>
          </div>
        </div>
      </div>
      <div
        className="absolute -right-2 bottom-16 hidden animate-float md:block"
        style={{ animationDelay: "2.4s" }}
      >
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
          <Server className="h-5 w-5 text-brand-green-400" aria-hidden="true" />
          <div className="text-xs">
            <p className="font-semibold text-white">Kubernetes</p>
            <p className="mt-1 leading-5 text-white/50">Platform ops</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Hero: FC<HeroProps> = ({ className = "" }) => {
  return (
    <section className={`relative overflow-hidden bg-hero pb-24 pt-36 text-white sm:pt-40 ${className}`}>
      {/* Backdrop */}
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(79,205,247,0.5), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-[8%] h-[420px] w-[560px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(22,104,216,0.6), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-52 right-[4%] h-[420px] w-[480px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(63,201,78,0.5), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Enterprise Software · AI · Automation · DevOps
          </p>
          <h1 className="display-1 mt-6 text-white">
            Engineering the Future of{" "}
            <span className="text-gradient">Intelligent Business</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            WeCrew Technologies helps businesses accelerate innovation through
            enterprise software, AI-powered solutions, intelligent automation,
            and scalable digital infrastructure.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/contact#consultation"
              className={buttonClass("primary", "lg")}
            >
              Let&apos;s Discuss Your Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/products" className={buttonClass("outline-light", "lg")}>
              Explore Our Solutions
            </Link>
          </div>
          <p className="mt-10 border-l-2 border-cyan-500/60 pl-4 text-sm italic leading-relaxed text-white/50">
            Engineering Intelligent Solutions. Empowering Business Growth.
          </p>
        </Reveal>
        <Reveal delay={150} className="lg:pl-6">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
