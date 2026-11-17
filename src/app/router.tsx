import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { LoadingFallback } from "@/components/common/LoadingFallback";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Route-level code splitting via React.lazy
const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const CopilotAIPage = lazy(() => import("@/pages/Products/CopilotAI"));
const SentinelPage = lazy(() => import("@/pages/Products/Sentinel"));
const WecrewOpsPage = lazy(() => import("@/pages/Products/WecrewOps"));
const ServicesPage = lazy(() => import("@/pages/Services"));
const ServiceRoute = lazy(() => import("@/pages/Services/ServiceRoute"));
const {
  CustomSoftwarePage,
  WebMobilePage,
  AIAutomationPage,
  DevOpsInfrastructurePage,
} = {
  CustomSoftwarePage: lazy(() =>
    import("@/pages/Services/ServiceRoute").then((m) => ({
      default: m.CustomSoftwarePage,
    }))
  ),
  WebMobilePage: lazy(() =>
    import("@/pages/Services/ServiceRoute").then((m) => ({
      default: m.WebMobilePage,
    }))
  ),
  AIAutomationPage: lazy(() =>
    import("@/pages/Services/ServiceRoute").then((m) => ({
      default: m.AIAutomationPage,
    }))
  ),
  DevOpsInfrastructurePage: lazy(() =>
    import("@/pages/Services/ServiceRoute").then((m) => ({
      default: m.DevOpsInfrastructurePage,
    }))
  ),
};
const IndustriesPage = lazy(() => import("@/pages/Industries"));
const InsightsPage = lazy(() => import("@/pages/Insights"));
const InsightDetailPage = lazy(() => import("@/pages/Insights/InsightDetail"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const PrivacyPage = lazy(() => import("@/pages/Legal/Privacy"));
const TermsPage = lazy(() => import("@/pages/Legal/Terms"));
const CookiesPage = lazy(() => import("@/pages/Legal/Cookies"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

function withSuspense(Component: React.ComponentType) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <ErrorBoundary>
        <NotFoundPage />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: "about",
        element: withSuspense(AboutPage),
      },
      {
        path: "products",
        element: withSuspense(ProductsPage),
      },
      {
        path: "products/copilot-ai",
        element: withSuspense(CopilotAIPage),
      },
      {
        path: "products/sentinel",
        element: withSuspense(SentinelPage),
      },
      {
        path: "products/wecrew-ops",
        element: withSuspense(WecrewOpsPage),
      },
      {
        path: "products/ops",
        element: <Navigate to="/products/wecrew-ops" replace />,
      },
      {
        path: "services",
        element: withSuspense(ServicesPage),
      },
      {
        path: "services/custom-software-development",
        element: withSuspense(CustomSoftwarePage),
      },
      {
        path: "services/web-mobile-development",
        element: withSuspense(WebMobilePage),
      },
      {
        path: "services/ai-automation",
        element: withSuspense(AIAutomationPage),
      },
      {
        path: "services/devops-infrastructure",
        element: withSuspense(DevOpsInfrastructurePage),
      },
      {
        path: "services/:slug",
        element: withSuspense(ServiceRoute),
      },
      {
        path: "industries",
        element: withSuspense(IndustriesPage),
      },
      {
        path: "insights",
        element: withSuspense(InsightsPage),
      },
      {
        path: "insights/:slug",
        element: withSuspense(InsightDetailPage),
      },
      {
        path: "contact",
        element: withSuspense(ContactPage),
      },
      {
        path: "privacy",
        element: withSuspense(PrivacyPage),
      },
      {
        path: "terms",
        element: withSuspense(TermsPage),
      },
      {
        path: "cookies",
        element: withSuspense(CookiesPage),
      },
      {
        path: "404",
        element: withSuspense(NotFoundPage),
      },
      {
        path: "*",
        element: withSuspense(NotFoundPage),
      },
    ],
  },
]);
