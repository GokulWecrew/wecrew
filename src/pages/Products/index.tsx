import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { PageHero, SectionHeading, buttonClass } from "@/components/ui";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs } from "@/components/ui";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { site } from "@/constants/site";
import { allProducts, productComparison } from "@/constants/products";

export const ProductsPage: FC = () => {
  const pageTitle = `Products — Enterprise AI, API Security & Agent Operations — ${site.name} Technologies`;
  const pageDescription =
    "WeCrew's enterprise product portfolio: WeCrew Copilot AI for knowledge and operations, WeCrew Sentinel for full life cycle API security, and WeCrew Ops for enterprise agent operations and governance.";
  const canonicalUrl = `${site.url}/products`;

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
        eyebrow="Enterprise Products"
        title={
          <>
            We build our own products.{" "}
            <span className="text-gradient">Then we run them.</span>
          </>
        }
        description="WeCrew's platforms are engineered in-house and operated by our own teams. The operational discipline that keeps them running is the same discipline we bring to client engagements."
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />

      {/* Flagship Products Showcase */}
      <section className="py-20 sm:py-24">
        <div className="container-x space-y-10">
          {allProducts.map((product, i) => {
            const isDarkCard = product.accent === "cyan";
            const isCoralCard = product.accent === "coral";

            return (
              <Reveal key={product.id} delay={i * 100}>
                <article
                  className={`grid gap-8 rounded-2xl border p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center transition-all ${
                    isDarkCard
                      ? "border-white/10 bg-navy-900 text-white"
                      : isCoralCard
                        ? "border-[#E05D44]/30 bg-base-raised shadow-card"
                        : "border-line bg-base-raised shadow-card"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <p
                        className="eyebrow"
                        style={{ color: product.accentHex }}
                      >
                        Product 0{i + 1} · {product.category}
                      </p>
                    </div>

                    <h2
                      className={`display-2 mt-3 ${
                        isDarkCard ? "text-white" : "text-ink"
                      }`}
                    >
                      {product.name}
                    </h2>

                    <p
                      className={`mt-2 font-medium ${
                        isDarkCard ? "text-white/70" : "text-ink-body"
                      }`}
                    >
                      {product.tagline}
                    </p>

                    <p
                      className={`mt-4 max-w-2xl leading-relaxed ${
                        isDarkCard ? "text-white/60" : "text-ink-body"
                      }`}
                    >
                      {product.shortDescription}
                    </p>

                    {/* Verified Capabilities */}
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-2xl">
                      {product.capabilities.slice(0, 4).map((cap) => (
                        <li
                          key={cap}
                          className={`flex items-start gap-2 text-xs leading-relaxed ${
                            isDarkCard ? "text-white/70" : "text-ink-body"
                          }`}
                        >
                          <CheckCircle2
                            className="h-3.5 w-3.5 shrink-0 mt-0.5"
                            style={{ color: product.accentHex }}
                            aria-hidden="true"
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 lg:w-56 shrink-0">
                    <Link
                      to={product.route}
                      className={buttonClass(
                        isDarkCard ? "primary" : isCoralCard ? "primary" : "secondary",
                        "md"
                      )}
                    >
                      Product details
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isDarkCard
                          ? "text-white/70 hover:text-white"
                          : "text-ink-faint hover:text-ink"
                      }`}
                    >
                      Live portal
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>

                    {product.docsUrl && (
                      <a
                        href={product.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-xs text-ink-faint hover:text-accent transition-colors"
                      >
                        Documentation
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Product Comparison Section */}
      <section className="bg-base-soft/70 border-y border-line py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio Architecture"
              title={
                <>
                  Complementary platforms,{" "}
                  <span className="text-gradient">distinct operational boundaries</span>
                </>
              }
              description="Each WeCrew product solves a distinct enterprise engineering challenge. They operate with sovereign boundaries and can be deployed independently based on your operational needs."
            />
          </Reveal>

          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-2xl border border-line bg-base-raised shadow-card">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-base-soft/80">
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-ink">
                      Operational Dimension
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-[#00E5FF]">
                      WeCrew Copilot AI
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-[#3D8BFF]">
                      WeCrew Sentinel
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-[#E05D44]">
                      WeCrew Ops
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {productComparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-base-soft/40 transition-colors">
                      <td className="p-4 sm:p-5 font-medium text-ink">
                        {row.feature}
                      </td>
                      <td className="p-4 sm:p-5 text-ink-body">
                        {row.copilot}
                      </td>
                      <td className="p-4 sm:p-5 text-ink-body">
                        {row.sentinel}
                      </td>
                      <td className="p-4 sm:p-5 text-ink-body font-medium">
                        {row.ops}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* R&D Lab Section */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Why product engineering matters"
              title="Products are our R&D lab"
              description="Running our own enterprise platforms — AI knowledge systems, API security engines, and agent operations planes — means our recommendations are grounded in what we operate ourselves, every day."
            />
          </Reveal>
          <Reveal className="mt-10 text-center">
            <Link to="/services" className={buttonClass("dark", "lg")}>
              Explore our services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
