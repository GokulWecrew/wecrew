import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui";
import { site } from "@/constants/site";

export const NotFoundPage: FC = () => {
  const pageTitle = `404 — Page Not Found — ${site.name} Technologies`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-hero text-white">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div className="container-x relative py-32 text-center">
          <p
            className="font-display text-7xl font-bold text-transparent sm:text-8xl"
            style={{
              backgroundImage: "linear-gradient(100deg, #4fcdf7, #3fc94e)",
              backgroundClip: "text",
            }}
          >
            404
          </p>
          <h1 className="display-2 mt-4 text-white">This page doesn&apos;t exist</h1>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            The link may be outdated or mistyped. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/" className={buttonClass("primary", "lg")}>
              Go to homepage
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className={buttonClass("outline-light", "lg")}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
