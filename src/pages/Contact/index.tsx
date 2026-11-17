import { Helmet } from "react-helmet-async";
import type { FC } from "react";
import { ArrowUpRight, Clock, Mail, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, PageHero, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/constants/site";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${site.url}/contact`,
  name: "Contact WeCrew Technologies",
  mainEntity: {
    "@type": "Organization",
    name: site.legalName,
    email: site.email,
    url: site.url,
  },
};

export const ContactPage: FC = () => {
  const pageTitle = `Contact Us — ${site.name} Technologies`;
  const pageDescription =
    "Contact WeCrew Technologies Private Limited — discuss your project, request a consultation, or reach our product teams. Email: support@wecrew.in";
  const canonicalUrl = `${site.url}/contact`;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start the{" "}
            <span className="text-gradient">conversation</span>
          </>
        }
        description="Tell us about your business challenge. A structured, useful first consultation is free — and there's no obligation beyond it."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Contact info */}
          <Reveal>
            <div className="space-y-5">
              <div className="card p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-accent dark:bg-brand-500/10 dark:text-accent">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                  Email
                </h2>
                <p className="mt-1 text-sm text-ink-faint">
                  For all inquiries — projects, products, support and partnerships.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-accent transition-colors hover:text-accent-strong"
                >
                  {site.email}
                </a>
              </div>

              <div className="card p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-100 text-accent-cyan dark:bg-cyan-500/10 dark:text-accent-cyan">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                  Our products
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm">
                  <li>
                    <a
                      href={site.products.copilot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-ink-body transition-colors hover:text-accent"
                    >
                      Copilot AI — kt.copilot.wecrew.in
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.products.sentinel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-ink-body transition-colors hover:text-accent"
                    >
                      Sentinel — sentinel.wecrew.in
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.products.ops}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-ink-body transition-colors hover:text-accent"
                    >
                      WeCrew Ops — sovereign.ops.wecrew.in
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-100 text-accent-green dark:bg-brand-green-500/10 dark:text-accent-green">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                  What happens next
                </h2>
                <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink-body">
                  <li className="flex gap-2.5">
                    <span className="font-display font-bold text-accent">1.</span>
                    We acknowledge your inquiry by email.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-display font-bold text-accent">2.</span>
                    A discovery call helps us understand your context.
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-display font-bold text-accent">3.</span>
                    You receive an honest assessment and a proposed path forward.
                  </li>
                </ol>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-line bg-base-soft p-5 text-sm leading-relaxed text-ink-body">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-accent-green" aria-hidden="true" />
                <p>
                  Your submission is validated and transmitted securely to our
                  support desk via FormSubmit, and used only to respond to your
                  inquiry. NDA available on request.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div id="consultation" className="scroll-mt-28">
              <SectionHeading
                align="left"
                eyebrow="Request a consultation"
                title="Tell us about your project"
                className="mb-2"
              />
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
