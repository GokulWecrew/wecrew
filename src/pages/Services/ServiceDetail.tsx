import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, CheckItem, PageHero, SectionHeading, buttonClass } from "@/components/ui";
import { type Service } from "@/constants/services";
import { site } from "@/constants/site";

export interface ServiceDetailProps {
  service: Service;
  index: number;
}

export const ServiceDetail: FC<ServiceDetailProps> = ({
  service,
  index,
}) => {
  const pageTitle = `${service.name} — ${site.name} Technologies`;
  const canonicalUrl = `${site.url}/services/${service.slug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={service.short} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={service.short} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <PageHero
        eyebrow={`${service.category} · Practice 0${index + 1}`}
        title={service.headline || service.name}
        description={service.intro}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      {/* Problem → Solution */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="card h-full border-l-4 border-l-danger p-8">
              <p className="eyebrow text-danger">The business problem</p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-body">
                {service.problem}
              </p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="card h-full border-l-4 border-l-brand-green-500 p-8">
              <p className="eyebrow text-accent-green">Our engineering solution</p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-body">
                {service.solution}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Business Applications & Deliverables */}
      {(service.businessApplications?.length > 0 || service.deliverables?.length > 0) && (
        <section className="border-t border-line bg-base-soft/40 py-20 sm:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
            {service.businessApplications?.length > 0 && (
              <Reveal>
                <div className="card h-full p-8">
                  <p className="eyebrow text-accent">Real-World Business Applications</p>
                  <h3 className="display-3 mt-2 text-ink">Where this creates measurable impact</h3>
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.businessApplications.map((app) => (
                      <div
                        key={app}
                        className="flex items-center gap-2 rounded-lg border border-line bg-base-raised px-3.5 py-2.5 text-[0.88rem] font-medium text-ink shadow-xs"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 flex-none" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {service.deliverables?.length > 0 && (
              <Reveal delay={100}>
                <div className="card h-full p-8">
                  <p className="eyebrow text-accent-green">Concrete Project Deliverables</p>
                  <h3 className="display-3 mt-2 text-ink">What your organisation receives</h3>
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.deliverables.map((deliv) => (
                      <div
                        key={deliv}
                        className="flex items-center gap-2 rounded-lg border border-line bg-base-raised px-3.5 py-2.5 text-[0.88rem] font-medium text-ink shadow-xs"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-green-500 flex-none" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section className="bg-base-soft py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title={`What we deliver — ${service.name.toLowerCase()}`}
            />
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {service.capabilities.map((cap, i) => (
              <Reveal key={cap} delay={(i % 4) * 60}>
                <div className="flex items-start gap-3 border-b border-line py-3.5 last:border-0">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-600"
                    aria-hidden="true"
                  />
                  <span className="text-[0.95rem] text-ink-body">{cap}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology expertise */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Technology expertise"
              title="The tools behind the practice"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.expertise.map((group, i) => (
              <Reveal key={group.label} delay={i * 80}>
                <div className="card h-full p-6">
                  <p className="eyebrow text-accent">{group.label}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-base-soft px-2.5 py-1 font-mono text-xs text-ink-body"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-hero py-20 text-white sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Implementation methodology"
              title="How the work actually runs"
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-base-raised/10 sm:grid-cols-2 lg:grid-cols-5">
            {service.methodology.map((step, i) => (
              <Reveal key={step.step} delay={(i % 5) * 70} className="h-full">
                <div className="h-full bg-navy-900/80 p-6">
                  <span className="font-display text-sm font-bold text-cyan-400">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-[0.98rem] font-semibold text-white">
                    {step.step}
                  </h3>
                  <p className="mt-2 text-[0.83rem] leading-relaxed text-white/55">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + engagement models */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-accent">Expected business outcomes</p>
            <h2 className="display-2 mt-3 text-ink">What success looks like</h2>
            <ul className="mt-7 space-y-3.5">
              {service.outcomes.map((outcome) => (
                <CheckItem key={outcome}>{outcome}</CheckItem>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-accent">Engagement models</p>
            <h2 className="display-2 mt-3 text-ink">Three ways to work with us</h2>
            <div className="mt-7 space-y-4">
              {service.engagementModels.map((model) => (
                <div key={model.name} className="card p-6">
                  <h3 className="font-display text-[1rem] font-semibold text-ink">
                    {model.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-body">
                    {model.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 90% at 50% 0%, rgba(34,184,240,0.14), transparent)",
          }}
          aria-hidden="true"
        />
        <div className="container-x relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="max-w-2xl">
            <h2 className="display-2 text-white">
              Discuss your {service.name.toLowerCase()} requirements
            </h2>
            <p className="mt-4 text-lg text-white/65">
              A discovery consultation is free, structured and useful — whether
              or not we end up working together.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact#consultation"
              className={buttonClass("primary", "lg")}
            >
              {service.ctaText || "Schedule a consultation"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className={buttonClass("outline-light", "lg")}>
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetail;
