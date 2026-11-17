import { Helmet } from "react-helmet-async";
import type { FC } from "react";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { site } from "@/constants/site";

const sections = [
  {
    heading: "1. Who we are",
    paragraphs: [
      `${site.legalName} ("WeCrew", "we", "us") operates this website, ${site.url}. You can reach us at ${site.email} for any privacy-related question.`,
    ],
  },
  {
    heading: "2. Information we collect",
    bullets: [
      "Contact form information: when you submit our contact form, we collect the details you provide — your name, business email, company name, phone number, service interest, optional budget range and project description.",
      "Usage information: like most websites, our hosting infrastructure may process standard technical logs (IP address, browser type, pages visited) for security and operational purposes.",
      "Cookies: see our Cookie Policy for details on cookies and how to control them.",
    ],
  },
  {
    heading: "3. How we use your information",
    bullets: [
      "To respond to your inquiry and communicate about your request.",
      "To prepare proposals, consultations and project engagements you ask for.",
      "To protect our website and infrastructure against abuse (rate limiting, spam filtering).",
      "We do not sell, rent or trade your personal information to third parties.",
    ],
  },
  {
    heading: "4. Legal basis",
    paragraphs: [
      "We process contact-form information on the basis of your consent (given when you submit the form) and our legitimate interest in responding to business inquiries. You may withdraw consent at any time by emailing us.",
    ],
  },
  {
    heading: "5. Retention",
    paragraphs: [
      "We retain inquiry-related information only as long as needed to handle your request and any resulting business relationship, or as required by applicable law. You may request deletion of your information at any time via " +
        site.email +
        ".",
    ],
  },
  {
    heading: "6. Sharing and processors",
    paragraphs: [
      "We share information only with service providers necessary to operate this website (for example, hosting and email delivery providers), under confidentiality obligations, and only to the extent needed to deliver the service.",
    ],
  },
  {
    heading: "7. Security",
    paragraphs: [
      "We apply appropriate technical and organizational measures — including TLS encryption in transit, validation, rate limiting and access controls — to protect information submitted through this website. No method of transmission is 100% secure; please do not send confidential credentials or secrets through the contact form.",
    ],
  },
  {
    heading: "8. Your rights",
    paragraphs: [
      "Subject to applicable law, you may request access to, correction of, or deletion of your personal information, and may object to or restrict its processing. Contact us at " +
        site.email +
        " and we will respond within a reasonable timeframe.",
    ],
  },
  {
    heading: "9. Changes to this policy",
    paragraphs: [
      "We may update this policy as our practices evolve. Material changes will be reflected on this page.",
    ],
  },
];

export const PrivacyPage: FC = () => {
  const pageTitle = `Privacy Policy — ${site.name} Technologies`;
  const pageDescription = `How ${site.legalName} collects, uses and protects personal information submitted through this website.`;
  const canonicalUrl = `${site.url}/privacy`;

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
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect the information you share with us."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <article className="container-x max-w-3xl py-16">
        {sections.map((s) => (
          <section key={s.heading} className="mb-10">
            <h2 className="font-display text-xl font-semibold text-ink">{s.heading}</h2>
            {s.paragraphs?.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-ink-body">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-ink-body">
                {s.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </>
  );
}

export default PrivacyPage;
