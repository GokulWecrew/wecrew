import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { FC } from "react";
import {
  ArrowRight,
  Compass,
  Eye,
  Hammer,
  HeartHandshake,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, CheckItem, PageHero, SectionHeading, buttonClass } from "@/components/ui";
import { FounderProfile } from "@/components/about/FounderProfile";
import { site } from "@/constants/site";

const values = [
  {
    icon: Compass,
    title: "Business problems before technology",
    text: "Technology choices are consequences of business requirements — never the starting point.",
  },
  {
    icon: ShieldCheck,
    title: "Engineering integrity",
    text: "We build what we said we would build, and we operate what we deliver.",
  },
  {
    icon: Eye,
    title: "Radical clarity",
    text: "Honest assessments, transparent progress, and trade-offs explained in plain language.",
  },
  {
    icon: HeartHandshake,
    title: "Relationships over transactions",
    text: "We optimize for the second and third engagement, not the first invoice.",
  },
];

const engineeringPrinciples = [
  {
    title: "Architecture before code",
    text: "Data models, integration boundaries and security posture are designed and reviewed before implementation begins.",
  },
  {
    title: "Working software, frequently",
    text: "Incremental releases you can see, use and challenge — no long silences followed by big reveals.",
  },
  {
    title: "Automate the repeated",
    text: "Tests, deployments and infrastructure are automated, so quality doesn't depend on heroics.",
  },
  {
    title: "Operate what we build",
    text: "Monitoring, logging and support are part of delivery. A system nobody can operate is not finished.",
  },
  {
    title: "Document decisions",
    text: "We record why systems are the way they are, so future teams inherit reasoning, not mystery.",
  },
  {
    title: "Boring on purpose",
    text: "Mature technologies chosen for longevity. Novelty is reserved for the problems that genuinely need it.",
  },
];

const commitments = [
  "Every engagement starts with understanding, not a proposal",
  "Clear deliverables and milestones from the first week",
  "Your data, systems and access are handled with least privilege",
  "Honest communication about risks, delays and trade-offs",
  "Post-launch support with defined response expectations",
  "A named engineering point of contact for the life of the engagement",
];

function site_tagline() {
  return (
    "WeCrew Technologies Private Limited builds and operates enterprise software, AI platforms and intelligent automation — engineering intelligent solutions that empower business growth."
  );
}

export const AboutPage: FC = () => {
  const pageTitle = `About Us — Who We Are — ${site.name} Technologies`;
  const pageDescription =
    "WeCrew Technologies Private Limited is an enterprise technology company building custom software, AI solutions, enterprise products and managed infrastructure for businesses across India and international markets.";
  const canonicalUrl = `${site.url}/about`;

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
        eyebrow="About WeCrew"
        title={
          <>
            An engineering company,{" "}
            <span className="text-gradient">built for the long term</span>
          </>
        }
        description={site_tagline()}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      {/* 1. Company overview */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-accent">Company overview</p>
            <h2 className="display-2 mt-3 text-ink">
              WeCrew Technologies Private Limited
            </h2>
            <p className="body-lg mt-6">
              WeCrew Technologies is an enterprise technology company serving
              startups, SMEs, mid-sized businesses and enterprises across India
              and international markets. Our work spans custom software
              development, artificial intelligence, intelligent automation, IT
              infrastructure and digital transformation.
            </p>
            <p className="body-lg mt-4">
              We are engineers first. Our own products — WeCrew Copilot AI, an
              enterprise knowledge assistant deployed on Kubernetes, and WeCrew
              Sentinel, an API security platform — are built and operated by the
              same people who take on client engagements. That operational
              experience is what we bring to every project: we have run the
              systems we recommend, in production, under load.
            </p>
            <p className="body-lg mt-4">
              The name is the commitment: <strong className="font-semibold text-ink">We</strong> —
              your team and ours, working as one crew on problems that matter.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-5">
              {/* Vision */}
              <div className="card border-t-4 border-t-cyan-500 p-7">
                <Eye className="h-6 w-6 text-accent-cyan" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  Our vision
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-body">
                  A world where every business — not just the giants — runs on
                  software that is genuinely engineered: intelligent, reliable
                  and built to last.
                </p>
              </div>
              {/* Mission */}
              <div className="card border-t-4 border-t-brand-600 p-7">
                <Target className="h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  Our mission
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-body">
                  To help businesses accelerate innovation through enterprise
                  software, AI-powered solutions, intelligent automation and
                  scalable digital infrastructure — engineered with business
                  outcomes as the measure of success.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Founder & Managing Director Profile */}
      <FounderProfile />

      {/* Technology philosophy */}
      <section className="bg-hero py-20 text-white sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="Our technology philosophy"
              title="Technology is a means. The business is the point."
              description="We hold a few convictions that shape every recommendation we make."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-base-raised/10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Fit over fashion",
                text: "The right technology is the one your team can hire for, operate and grow with — not the one topping a trend report.",
              },
              {
                title: "AI with governance",
                text: "AI belongs in production when it is grounded in your data, permissioned correctly and auditable. Anything less is a liability.",
              },
              {
                title: "Own your core",
                text: "The systems that differentiate your business deserve custom engineering. Rent the commodity; own the advantage.",
              },
              {
                title: "Security is architecture",
                text: "Access control, auditability and least privilege are design decisions — not features to patch in later.",
              },
              {
                title: "Observability first",
                text: "If it isn't measured, it isn't manageable. We instrument systems before we optimize them.",
              },
              {
                title: "Simplicity scales",
                text: "Complexity is a cost that compounds. The simplest architecture that meets the requirement is usually the most durable.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 80} className="h-full">
                <div className="h-full bg-navy-900/80 p-7">
                  <h3 className="font-display text-[1.02rem] font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering approach */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Our engineering approach"
              title="Six principles we don't negotiate on"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80}>
                <div className="card h-full p-6">
                  <Hammer className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-[1rem] font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to customers + Leadership & team */}
      <section className="bg-base-soft py-20 sm:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-accent">Our commitment to customers</p>
            <h2 className="display-2 mt-3 text-ink">What you can expect from us</h2>
            <ul className="mt-7 space-y-3.5">
              {commitments.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-accent">Leadership &amp; team</p>
            <h2 className="display-2 mt-3 text-ink">An engineering-led company</h2>
            <p className="body-lg mt-5">
              WeCrew is led by engineers, and it shows in how engagements run:
              technical decisions are made close to the work, estimates come
              from the people who will build, and leadership reviews real
              deliverables rather than status decks.
            </p>
            <p className="body-lg mt-4">
              Our teams are organized into focused practices — software
              engineering, AI, DevOps and platform — with senior engineers
              directly involved in every engagement. Detailed profiles of the
              specific team proposed for your project are shared during the
              discovery process, so you know exactly who you are working with
              before you commit.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-strong"
            >
              Meet the team on a discovery call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Why WeCrew */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Why WeCrew"
              title="Four values behind the work"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-accent dark:bg-brand-500/10 dark:text-accent">
                    <v.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 min-h-12 font-display text-[1rem] font-semibold leading-6 text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 min-h-24 text-sm leading-relaxed text-ink-body">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <Link to="/contact#consultation" className={buttonClass("primary", "lg")}>
              Start a conversation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
