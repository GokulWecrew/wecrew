import { Helmet } from "react-helmet-async";
import type { FC } from "react";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { site } from "@/constants/site";

const sections = [
  {
    heading: "1. Acceptance of terms",
    paragraphs: [
      `By accessing or using this website (${site.url}), you agree to these terms and conditions. If you do not agree, please do not use the website.`,
    ],
  },
  {
    heading: "2. About these terms",
    paragraphs: [
      `This website is operated by ${site.legalName} ("WeCrew", "we", "us"). These terms govern use of the website only; engagements, projects and product subscriptions are governed by separately executed agreements.`,
    ],
  },
  {
    heading: "3. Use of the website",
    bullets: [
      "You may use this website for lawful purposes only.",
      "You may not attempt to gain unauthorized access to any part of the website, probe or scan its security, or interfere with its operation.",
      "You may not use the website to submit unlawful, misleading or malicious content, including through the contact form.",
      "Automated scraping or bulk collection of website content is not permitted without prior written consent.",
    ],
  },
  {
    heading: "4. Intellectual property",
    paragraphs: [
      `All content on this website — including text, design, graphics, the WeCrew logo and product materials — is the property of ${site.legalName} or its licensors and is protected by applicable intellectual property law. You may view and share links to this content; reproduction or commercial use requires our written permission.`,
    ],
  },
  {
    heading: "5. Product names and links",
    paragraphs: [
      "WeCrew Copilot AI and WeCrew Sentinel are products of WeCrew Technologies Private Limited. Product portals linked from this website are operated under their own terms of use, which apply when you access them.",
    ],
  },
  {
    heading: "6. Disclaimer of warranties",
    paragraphs: [
      'This website is provided on an "as is" and "as available" basis. While we work to keep the content accurate and current, we make no warranties, express or implied, regarding the completeness, reliability or suitability of the website content for any particular purpose.',
    ],
  },
  {
    heading: "7. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, WeCrew shall not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, this website.",
    ],
  },
  {
    heading: "8. Third-party links",
    paragraphs: [
      "This website may link to external websites and product portals. We are not responsible for the content or practices of third-party sites.",
    ],
  },
  {
    heading: "9. Governing law",
    paragraphs: [
      "These terms are governed by the laws of India, and the courts of competent jurisdiction in India shall have exclusive jurisdiction over any dispute arising from them.",
    ],
  },
  {
    heading: "10. Contact",
    paragraphs: [`Questions about these terms: ${site.email}.`],
  },
];

export const TermsPage: FC = () => {
  const pageTitle = `Terms and Conditions — ${site.name} Technologies`;
  const pageDescription = `Terms and conditions governing the use of the ${site.legalName} website.`;
  const canonicalUrl = `${site.url}/terms`;

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
        title="Terms and Conditions"
        description="The terms that govern use of this website."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms and Conditions" }]} />
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

export default TermsPage;
