import { useState, type FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code2,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, PageHero, SectionHeading, buttonClass } from "@/components/ui";
import { services } from "@/constants/services";
import { site } from "@/constants/site";
import { ServiceCard } from "@/components/services/ServiceCard";
import { TechnologyStack } from "@/components/services/TechnologyStack";
import { DeliveryProcess } from "@/components/services/DeliveryProcess";
import { IndustryGrid } from "@/components/services/IndustryGrid";
import { WhyChooseWeCrew } from "@/components/services/WhyChooseWeCrew";
import { ProductShowcase } from "@/components/services/ProductShowcase";
import { EngagementModels } from "@/components/services/EngagementModels";

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "WeCrew Technologies Services",
  serviceType: "Enterprise Software & AI Solutions",
  provider: {
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
  },
  areaServed: ["India", "Global"],
  description:
    "End-to-end technology solutions: custom software development, web & mobile applications, enterprise artificial intelligence & automation, and cloud & DevOps infrastructure.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
  ],
};

export const ServicesPage: FC = () => {
  const pageTitle = `Services — Custom Software, Web & Mobile, AI, DevOps — ${site.name} Technologies`;
  const pageDescription =
    "WeCrew Technologies delivers custom software development, web & mobile applications, enterprise AI solutions, and cloud & DevOps infrastructure. End-to-end engineering tailored for business growth.";
  const canonicalUrl = `${site.url}/services`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* SECTION 01 — HERO */}
      <section className="relative overflow-hidden bg-hero pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
        {/* Ambient Gradient Glows */}
        <div
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(34,184,240,0.5), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(22,104,216,0.6), transparent)" }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
              <span>OUR TECHNOLOGY SERVICES</span>
            </div>

            <h1 className="display-1 mt-6 text-white font-display">
              Technology Solutions That{" "}
              <span className="text-gradient">Move Your Business Forward.</span>
            </h1>

            <p className="mt-3 font-display text-lg font-semibold text-cyan-300 sm:text-xl">
              Build Smarter. Innovate Faster. Scale Confidently.
            </p>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/75">
              From custom enterprise applications and AI-powered automation to modern web platforms
              and scalable DevOps infrastructure, WeCrew helps businesses turn technology challenges
              into practical digital solutions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact#consultation"
                className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <a
                href="#services-overview"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/60 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                End-to-End Technology Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                4 Focused Engineering Practices
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                Production-Tested Enterprise Stack
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                Long-Term Technical Support
              </span>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      {/* SECTION 02 — THE FOUR CORE SERVICES OVERVIEW */}
      <section id="services-overview" className="py-20 sm:py-28 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="OUR FOUR PRACTICES"
              title={
                <>
                  Engineered for Your{" "}
                  <span className="text-gradient">Business Operations</span>
                </>
              }
              description="Four dedicated engineering disciplines delivering customized business software, high-converting digital products, governed enterprise AI, and rock-solid cloud infrastructure."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {services.map((service, idx) => (
              <Reveal key={service.slug} delay={(idx % 2) * 90}>
                <ServiceCard service={service} index={idx} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — TECHNOLOGY STACK SHOWCASE */}
      <section id="technology-stack" className="py-20 sm:py-24 bg-base-soft">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="TECHNOLOGY STACK"
              title={
                <>
                  Technologies We Use to{" "}
                  <span className="text-gradient">Build Your Solutions</span>
                </>
              }
              description="We choose technologies based on your business requirements, architecture, scalability, performance, and long-term maintainability."
            />
          </Reveal>

          <div className="mt-14">
            <TechnologyStack />
          </div>
        </div>
      </section>

      {/* SECTION 04 — HOW WE WORK (7-STEP DELIVERY PROCESS) */}
      <section className="py-20 sm:py-28 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="OUR DELIVERY PROCESS"
              title={
                <>
                  From Business Challenge to{" "}
                  <span className="text-gradient">Production-Ready Solution</span>
                </>
              }
              description="A structured, transparent engineering methodology designed to mitigate risks, ensure continuous visibility, and deliver measurable business outcomes."
            />
          </Reveal>

          <div className="mt-14">
            <DeliveryProcess />
          </div>
        </div>
      </section>

      {/* SECTION 05 — INDUSTRIES WE SUPPORT */}
      <section className="py-20 sm:py-24 bg-base-soft">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="DOMAINS WE SERVE"
              title={
                <>
                  Technology Solutions Across{" "}
                  <span className="text-gradient">Business Domains</span>
                </>
              }
              description="We bring engineering depth and domain sensitivity to eight industries with unique regulatory pressures, integration needs, and operational workflows."
            />
          </Reveal>

          <div className="mt-14">
            <IndustryGrid />
          </div>
        </div>
      </section>

      {/* SECTION 06 — WHY CHOOSE WECREW? */}
      <section className="py-20 sm:py-28 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="THE WECREW ADVANTAGE"
              title={
                <>
                  Your Technology Partner from{" "}
                  <span className="text-gradient">Strategy to Support</span>
                </>
              }
              description="We combine deep software engineering craft with authentic business understanding to deliver digital solutions that empower long-term growth."
            />
          </Reveal>

          <div className="mt-14">
            <WhyChooseWeCrew />
          </div>
        </div>
      </section>

      {/* SECTION 07 — FEATURED WECREW PRODUCTS SHOWCASE */}
      <section className="relative overflow-hidden bg-hero py-20 text-white sm:py-28">
        <div className="bg-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container-x relative z-10">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="ENGINEERING BENCHMARK"
              title={
                <>
                  Our Products. Built from{" "}
                  <span className="text-gradient">Real Engineering Experience.</span>
                </>
              }
              description="The operational depth we bring to client projects is proven in the enterprise platforms we build, deploy, and operate ourselves."
            />
          </Reveal>

          <div className="mt-14">
            <ProductShowcase />
          </div>
        </div>
      </section>

      {/* SECTION 08 — FLEXIBLE ENGAGEMENT MODELS */}
      <section className="py-20 sm:py-28 bg-base">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="ENGAGEMENT MODELS"
              title={
                <>
                  Flexible Engagement for Your{" "}
                  <span className="text-gradient">Business Requirements</span>
                </>
              }
              description="Transparent, predictable collaboration structures adapted to your project scope, timeline, and internal engineering capacity."
            />
          </Reveal>

          <div className="mt-14">
            <EngagementModels />
          </div>
        </div>
      </section>

      {/* SECTION 09 — FINAL CONVERSION CALL TO ACTION */}
      <section className="relative overflow-hidden bg-hero py-20 text-white sm:py-24">
        {/* Ambient radial lighting */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34,184,240,0.45), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-x relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>LET&apos;S BUILD TOGETHER</span>
          </div>

          <h2 className="display-1 mt-6 text-white font-display">
            Have a Business Challenge?{" "}
            <span className="text-gradient">Let&apos;s Engineer the Solution.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed">
            Whether you are building a new application, modernizing existing software,
            implementing AI, or improving your infrastructure, WeCrew can help you plan and deliver
            the right technology solution.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact#consultation"
              className="btn-primary inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <ArrowUpRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/50 font-mono">
            Direct email:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-cyan-300 underline hover:text-cyan-200"
            >
              {site.email}
            </a>{" "}
            · We respond to all new project inquiries within one business day.
          </p>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
