import type { FC } from "react";
import { Sparkles, Quote, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { FounderPortraitCard } from "./FounderPortraitCard";
import { LeadershipPrinciples } from "./LeadershipPrinciples";

export const FounderProfile: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section
      id="founder"
      aria-label="Founder and Leadership Profile"
      className={`relative overflow-hidden py-24 sm:py-32 text-white ${className}`}
      style={{
        background: "linear-gradient(145deg, #071426 0%, #0B1220 45%, #050d1f 100%)",
      }}
    >
      {/* Background Decorative Gradients & Grid Pattern */}
      <div className="bg-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Ambient Blue & Cyan Lighting Glows */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(40, 184, 232, 0.45), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[460px] w-[460px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(22, 104, 216, 0.4), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative z-10 min-w-0">
        <div className="grid min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT SIDE — FOUNDER INTRODUCTION */}
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                <span>LEADERSHIP &amp; VISION</span>
              </div>

              <h2 className="display-2 mt-4 text-white font-display">
                Meet Our <span className="text-gradient">Founder</span>
              </h2>

              <div className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-2xl font-bold text-white tracking-tight sm:text-3xl">
                  Raj Kumar
                </h3>
                <span className="min-w-0 break-words text-sm font-semibold font-mono text-cyan-300">
                  Founder &amp; Managing Director
                </span>
              </div>

              {/* Professional Positioning Quote */}
              <div className="relative mt-6 min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6">
                <Quote className="absolute top-4 right-4 h-7 w-7 text-cyan-400/20" aria-hidden="true" />
                <p className="font-display text-base sm:text-lg font-medium leading-relaxed text-white/90 italic">
                  &ldquo;Building technology that empowers businesses, accelerates innovation, and creates meaningful digital transformation.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-mono text-cyan-300/80">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>WeCrew Technologies Leadership Philosophy</span>
                </div>
              </div>

              {/* Supporting Content */}
              <div className="mt-6 space-y-4 text-sm leading-relaxed sm:text-base">
                <p className="text-slate-200">
                  At WeCrew Technologies, our vision is to make technology a meaningful driver of
                  business growth. We focus on building intelligent software, enterprise AI
                  solutions, and scalable digital platforms that help organizations innovate, operate
                  efficiently, and grow with confidence.
                </p>
                <p className="text-slate-200">
                  Driven by innovation, engineering excellence, and a commitment to delivering real
                  business value, we aim to build technology solutions that create lasting impact.
                </p>
              </div>

              {/* Signature-style Closing */}
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-display text-lg font-semibold tracking-wide text-cyan-300">
                  &ldquo;Building the Future Through Technology.&rdquo;
                </p>
                <p className="mt-1 text-xs font-mono uppercase tracking-widest text-slate-400">
                  Executive Commitment · WeCrew Technologies Private Limited
                </p>
              </div>
            </Reveal>

            {/* Optional Leadership Highlights Principles */}
            <div className="mt-10 pt-4">
              <Reveal delay={100}>
                <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Company Leadership Principles
                </p>
                <LeadershipPrinciples />
              </Reveal>
            </div>
          </div>

          {/* RIGHT SIDE — CEO PORTRAIT PROFILE CARD */}
          <div className="min-w-0 flex justify-center lg:col-span-5 lg:justify-end">
            <Reveal delay={120} className="w-full min-w-0">
              <FounderPortraitCard
                name="Raj Kumar"
                designation="Founder & Managing Director"
                company="WeCrew Technologies Private Limited"
                imageSrc="/raj-kumar-founder.png"
                fallbackSrc="/raj-kumar-founder.png"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderProfile;
