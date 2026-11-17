import { useEffect, type FC, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BackToTop } from "@/components/navigation/BackToTop";
import { site } from "@/constants/site";

export interface MainLayoutProps {
  children?: ReactNode;
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/wecrew-logo-512.png`,
  description: site.description,
  email: site.email,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      availableLanguage: ["English"],
    },
  ],
};

export const MainLayout: FC<MainLayoutProps> = () => {
  const { pathname, hash } = useLocation();

  // Scroll to top or anchor on route changes
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col bg-base text-ink antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </div>
  );
}

export default MainLayout;
