import { Helmet } from "react-helmet-async";
import type { FC } from "react";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { site } from "@/constants/site";

export const CookiesPage: FC = () => {
  const pageTitle = `Cookie Policy — ${site.name} Technologies`;
  const pageDescription = `How the ${site.legalName} website uses cookies and how you can control them.`;
  const canonicalUrl = `${site.url}/cookies`;

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
        title="Cookie Policy"
        description="What cookies and similar technologies this website uses — and what it deliberately does not."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]} />
      <article className="container-x max-w-3xl py-16">
        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold text-ink">1. What cookies are</h2>
          <p className="mt-3 leading-relaxed text-ink-body">
            Cookies are small text files stored by your browser when you visit
            websites. They are commonly used to keep sites working properly and
            to understand how they are used.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold text-ink">2. Cookies this website uses</h2>
          <p className="mt-3 leading-relaxed text-ink-body">
            This corporate website is designed to work without persistent
            tracking cookies. We use:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-ink-body">
            <li>
              <strong className="font-semibold text-ink">
                Strictly necessary infrastructure cookies:
              </strong>{" "}
              minimal cookies or storage entries required for basic site
              operation and security (for example, protections against form
              abuse). These cannot be switched off in our systems.
            </li>
            <li>
              <strong className="font-semibold text-ink">
                No advertising or cross-site tracking cookies:
              </strong>{" "}
              we do not run advertising networks, cross-site trackers or
              third-party analytics scripts on this website.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold text-ink">3. Managing cookies</h2>
          <p className="mt-3 leading-relaxed text-ink-body">
            You can control or delete cookies through your browser settings —
            every major browser lets you block or remove them. Restricting
            strictly necessary cookies may affect some site functionality, such
            as the contact form.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-xl font-semibold text-ink">4. Updates</h2>
          <p className="mt-3 leading-relaxed text-ink-body">
            If our cookie practices change — for example, if we add opt-in
            analytics — this page will be updated to describe them before they
            take effect.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">5. Contact</h2>
          <p className="mt-3 leading-relaxed text-ink-body">
            Questions about this policy:{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-accent hover:text-accent-strong"
            >
              {site.email}
            </a>
            .
          </p>
        </section>
      </article>
    </>
  );
}

export default CookiesPage;
