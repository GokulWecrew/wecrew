import { Link, type LinkProps } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60 cursor-pointer";

const variants = {
  primary:
    "bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-[0_8px_20px_rgb(22_104_216/0.25)] hover:shadow-[0_10px_28px_rgb(22_104_216/0.35)] hover:brightness-110 active:scale-[0.99]",
  secondary:
    "bg-base-raised text-ink border border-line shadow-card hover:border-brand-300 hover:text-accent-strong",
  dark: "border border-line bg-navy-900 text-white hover:bg-navy-800 dark:border-white/10",
  outline: "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-base-soft",
  "outline-light":
    "border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/5",
} as const;

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return `${btnBase} ${variants[variant]} ${sizes[size]}`;
}

export type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={`${buttonClass(variant, size)} ${className ?? ""}`} {...props} />;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonClass(variant, size)} ${className ?? ""}`}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${
        className ?? ""
      }`}
    >
      {eyebrow && (
        <p className={`eyebrow ${tone === "dark" ? "text-cyan-400" : "text-accent"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`display-2 mt-3 ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${tone === "dark" ? "text-white/75" : "text-ink-body"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page hero (inner pages)                                             */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-hero pb-20 pt-36 sm:pt-40 lg:pt-44 text-white">
      <div className="bg-grid-dark absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(43,125,233,0.55), rgba(34,184,240,0.25), transparent)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative z-10">
        <p className="eyebrow text-cyan-400">{eyebrow}</p>
        <h1 className="display-1 mt-4 max-w-4xl text-white">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs + schema                                                */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link to={item.href} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-body">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Check list item                                                     */
/* ------------------------------------------------------------------ */

export function CheckItem({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-1 inline-block h-4 w-4 flex-none rounded-full bg-brand-green-100"
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-brand-green-600 stroke-[2.5]" >
          <path d="M4.5 8.5 7 11l4.5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className={`text-[0.95rem] leading-relaxed ${
          tone === "dark" ? "text-white/80" : "text-ink-body"
        }`}
      >
        {children}
      </span>
    </li>
  );
}
