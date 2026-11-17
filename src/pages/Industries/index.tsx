import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { FC } from "react";
import {
  ArrowRight,
  Briefcase,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, PageHero, buttonClass } from "@/components/ui";
import { industries, type Industry } from "@/constants/industries";
import { site } from "@/constants/site";

const industryIcons: Record<
  Industry["icon"],
  React.ComponentType<{ className?: string }>
> = {
  bank: Landmark,
  heart: HeartPulse,
  graduation: GraduationCap,
  factory: Factory,
  cart: ShoppingCart,
  chip: Cpu,
  truck: Truck,
  briefcase: Briefcase,
};

export const IndustriesPage: FC = () => {
  const pageTitle = `Industries We Serve — ${site.name} Technologies`;
  const pageDescription =
    "WeCrew builds software for banking & financial services, healthcare, education, manufacturing, retail & e-commerce, IT, logistics and professional services.";
  const canonicalUrl = `${site.url}/industries`;

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

      <PageHero
        eyebrow="Industries"
        title={
          <>
            Every industry has its own{" "}
            <span className="text-gradient">systems of record</span>
          </>
        }
        description="We bring engineering depth — and domain sensitivity — to eight industries whose workflows, compliance pressures and operational rhythms we understand."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />

      <section className="py-20 sm:py-24">
        <div className="container-x space-y-8">
          {industries.map((industry, i) => {
            const Icon = industryIcons[industry.icon];
            const reversed = i % 2 === 1;
            return (
              <Reveal key={industry.slug} delay={60}>
                <article
                  id={industry.slug}
                  className="card grid scroll-mt-28 gap-8 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className={reversed ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3.5">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-cyan-400">
                        <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                      </span>
                      <p className="eyebrow text-ink-faint">
                        Industry 0{i + 1}
                      </p>
                    </div>
                    <h2 className="display-2 mt-4 text-ink">
                      {industry.name}
                    </h2>
                    <p className="body-lg mt-4">{industry.intro}</p>
                  </div>
                  <div className={reversed ? "lg:order-1" : ""}>
                    <p className="eyebrow text-accent">What we build</p>
                    <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {industry.solutions.map((solution) => (
                        <li
                          key={solution}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-body"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-green-500"
                            aria-hidden="true"
                          />
                          {solution}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact#consultation"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
                    >
                      Discuss {industry.name.toLowerCase()} solutions
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="container-x mt-16 text-center">
          <p className="body-lg mx-auto max-w-2xl">
            Your industry not listed? Most of what we build transfers —{" "}
            <Link
              to="/contact#consultation"
              className="font-semibold text-accent hover:text-accent-strong"
            >
              tell us about your workflows
            </Link>{" "}
            and we&apos;ll give you an honest assessment.
          </p>
          <div className="mt-8">
            <Link to="/contact" className={buttonClass("secondary", "md")}>
              Contact our team
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default IndustriesPage;
