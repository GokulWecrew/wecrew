import { Helmet } from "react-helmet-async";
import type { FC } from "react";
import { Hero } from "./Hero";
import {
  IntroSection,
  ProductsSection,
  ServicesSection,
  WhyWeCrew,
  IndustriesSection,
  ProcessSection,
  FinalCTA,
} from "./Sections";
import { site } from "@/constants/site";

export const HomePage: FC = () => {
  const pageTitle = `${site.name} Technologies — Enterprise Software, AI & Automation Company`;
  const canonicalUrl = `${site.url}/`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={site.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={site.description} />
      </Helmet>
      <Hero />
      <IntroSection />
      <ProductsSection />
      <ServicesSection />
      <WhyWeCrew />
      <IndustriesSection />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}

export default HomePage;
