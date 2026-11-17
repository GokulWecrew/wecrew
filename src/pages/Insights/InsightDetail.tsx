import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import type { FC } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Breadcrumbs, buttonClass } from "@/components/ui";
import { Reveal } from "@/components/animations/Reveal";
import { getInsight, relatedInsights } from "@/constants/insights";
import { site } from "@/constants/site";

export const InsightDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const insight = getInsight(slug || "");

  if (!insight) {
    return <Navigate to="/404" replace />;
  }

  const related = relatedInsights(insight.slug);
  const pageTitle = `${insight.title} — ${site.name} Technologies`;
  const canonicalUrl = `${site.url}/insights/${insight.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    author: { "@type": "Organization", name: insight.author },
    publisher: { "@type": "Organization", name: site.legalName },
    mainEntityOfPage: canonicalUrl,
    keywords: insight.category,
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={insight.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={insight.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="pb-20 pt-28 sm:pt-32">
        <div className="container-x max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: insight.category },
            ]}
          />
          <header className="mt-8">
            <p className="eyebrow text-accent">{insight.category}</p>
            <h1 className="display-1 mt-3 text-ink">{insight.title}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-faint">
              <span className="font-medium text-ink-body">{insight.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {insight.readingTime} min read
              </span>
            </div>
            <p className="mt-6 border-l-2 border-brand-500 pl-5 text-lg leading-relaxed text-ink-body">
              {insight.excerpt}
            </p>
          </header>

          <div className="mt-10 space-y-10">
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-ink-body">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 space-y-3">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-600"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed text-ink-body">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <footer className="mt-14 rounded-2xl bg-hero p-8 text-white">
            <p className="font-display text-xl font-semibold">
              Working on a problem like this?
            </p>
            <p className="mt-2 text-white/60">
              We help organizations put these practices into production.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact#consultation" className={buttonClass("primary", "md")}>
                Talk to our team
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/insights" className={buttonClass("outline-light", "md")}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All insights
              </Link>
            </div>
          </footer>
        </div>
      </article>

      {/* Related articles */}
      <section className="border-t border-line bg-base-soft py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="display-2 text-ink">Related insights</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <Link
                  to={`/insights/${r.slug}`}
                  className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <p className="eyebrow text-accent">{r.category}</p>
                  <h3 className="mt-3 flex-1 font-display text-[1.05rem] font-semibold leading-snug text-ink">
                    {r.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Read article
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default InsightDetailPage;
