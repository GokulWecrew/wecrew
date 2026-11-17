import { Link } from "react-router-dom";
import type { FC, ReactNode } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/navigation/Logo";
import { site } from "@/constants/site";
import { services } from "@/constants/services";

export interface SiteFooterProps {
  className?: string;
}

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
];

const productLinks = [
  { label: "Copilot AI", href: "/products/copilot-ai" },
  { label: "Sentinel", href: "/products/sentinel" },
  { label: "WeCrew Ops", href: "/products/wecrew-ops" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/login", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/@Wecrewai-f7x", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/accounts/login/", icon: "instagram" },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V8.99H7.1v11.46ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.73V1.73C24 .77 23.19 0 22.22 0Z" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.54 3.56 12 3.56 12 3.56s-7.54 0-9.4.52A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.86.52 9.4.52 9.4.52s7.54 0 9.4-.52a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.55 15.6V8.4L15.82 12l-6.27 3.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return <h3 className="eyebrow text-white/50">{children}</h3>;
}

export const SiteFooter: FC<SiteFooterProps> = ({ className = "" }) => {
  return (
    <footer className={`bg-hero text-white/70 ${className}`}>
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr_1.1fr] lg:gap-10">
        {/* Brand */}
        <div className="max-w-sm">
          <Logo tone="light" size={42} />
          <p className="mt-5 max-w-sm text-left text-sm leading-relaxed text-white/60">
            We build enterprise software and AI solutions that help businesses
            work smarter, scale with confidence, and create lasting impact.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-cyan-400"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
        </div>

        {/* Company */}
        <nav aria-label="Company">
          <FooterHeading>Company</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Solutions */}
        <nav aria-label="Solutions">
          <FooterHeading>Solutions</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Products */}
        <nav aria-label="Products">
          <FooterHeading>Products</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.products.copilot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white"
              >
                Copilot AI portal
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.products.sentinel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white"
              >
                Sentinel portal
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={site.products.ops}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white"
              >
                WeCrew Ops portal
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <nav aria-label="Contact">
          <FooterHeading>Contact</FooterHeading>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact#consultation"
                className="transition-colors hover:text-white"
              >
                Request a Consultation
              </Link>
            </li>
          </ul>
          <ul aria-label="Social media" className="mt-5 flex items-center gap-3">
            {socialLinks.map((social) => (
              <li key={social.icon}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-cyan-400/60 hover:bg-white/5 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  <SocialIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="transition-colors hover:text-white/80">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
