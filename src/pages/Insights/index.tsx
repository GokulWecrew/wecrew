import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { Clock } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { insights, insightCategories } from "@/constants/insights";
import { site } from "@/constants/site";

const categoryColors: Record<string, string> = {
  "Artificial Intelligence":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-300",
  "Enterprise Software":
    "bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300",
  "DevOps & Cloud":
    "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  Kubernetes:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
  Cybersecurity:
    "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  "Digital Transformation":
    "bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-500/10 dark:text-brand-green-300",
  "Technology Trends":
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
};

export const InsightsPage: FC = () => {
  const featured = insights.filter((i) => i.featured);
  const rest = insights.filter((i) => !i.featured);

  const pageTitle = `Insights — Engineering Notes from the WeCrew Team — ${site.name} Technologies`;
  const pageDescription =
    "Practical engineering insights on AI, enterprise software, DevOps, Kubernetes, cybersecurity and digital transformation from the WeCrew team.";
  const canonicalUrl = `${site.url}/insights`;

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
        eyebrow="Insights"
        title={
          <>
            Notes from the{" "}
            <span className="text-gradient">engineering floor</span>
          </>
        }
        description="What we learn building and operating enterprise software, AI platforms and infrastructure — written by the team that does the work."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />

      <section className="py-16 sm:py-20">
        <div className="container-x">
          {/* Category index */}
          <Reveal>
            <div className="flex flex-wrap gap-2" aria-label="Article categories">
              {insightCategories
                .filter((c) => c !== "All")
                .map((cat) => (
                  <span
                    key={cat}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                      categoryColors[cat] ?? "bg-base-soft text-ink-body"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
            </div>
          </Reveal>

          {/* Featured */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featured.map((insight, i) => (
              <Reveal key={insight.slug} delay={i * 100}>
                <Link
                  to={`/insights/${insight.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-hero p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-10"
                >
                  <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
                  <div
                    className="absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-30 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(43,125,233,0.6), transparent)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-center gap-3">
                    <span className="rounded-full bg-base-raised/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                      {insight.category}
                    </span>
                    <span className="rounded-full border border-cyan-400/40 px-3 py-1 text-xs font-semibold text-cyan-300">
                      Featured
                    </span>
                  </div>
                  <h2 className="relative mt-5 font-display text-2xl font-semibold leading-snug text-white">
                    {insight.title}
                  </h2>
                  <p className="relative mt-3 flex-1 leading-relaxed text-white/60">
                    {insight.excerpt}
                  </p>
                  <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-white/50">
                    <span>{insight.author}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {insight.readingTime} min read
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Rest */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight, i) => (
              <Reveal key={insight.slug} delay={(i % 3) * 80}>
                <Link
                  to={`/insights/${insight.slug}`}
                  className="card group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryColors[insight.category] ??
                      "bg-base-soft text-ink-body"
                    }`}
                  >
                    {insight.category}
                  </span>
                  <h2 className="mt-4 flex-1 font-display text-lg font-semibold leading-snug text-ink">
                    {insight.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">
                    {insight.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-faint">
                    <span>{insight.author}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {insight.readingTime} min
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Editorial policy note */}
          <Reveal className="mt-12">
            <p className="mx-auto max-w-2xl rounded-xl border border-line bg-base-soft p-5 text-center text-sm leading-relaxed text-ink-faint">
              Our articles are written by the WeCrew engineering team and
              published without invented authorship or dates — we add
              publication metadata as this section grows into a regularly
              updated knowledge base.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default InsightsPage;
