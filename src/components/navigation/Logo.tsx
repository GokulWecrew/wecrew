import { Link } from "react-router-dom";
import type { FC } from "react";
import { Image } from "@/components/common/Image";

export interface LogoProps {
  /** Height of the mark in px (defaults to 38) */
  size?: number;
  /** On dark surfaces the wordmark renders in white */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * The original WeCrew logo mark (untouched) with the company wordmark set beside it.
 * Pinned to the left of the header layout with strict aspect-ratio and dimension constraints
 * to prevent natural image resolution from overflowing header boundaries.
 */
export const Logo: FC<LogoProps> = ({ size = 38, tone = "dark", className = "" }) => {
  // /wecrew-logo-512.png is 512x384 (aspect ratio 4:3)
  const markHeight = size;
  const markWidth = Math.round((markHeight * 512) / 384);

  return (
    <Link
      to="/"
      aria-label="WeCrew Technologies Private Limited — Home"
      className={`inline-flex items-center gap-3 shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 transition-opacity hover:opacity-95 ${className}`}
    >
      <Image
        src="/wecrew-logo-512.png"
        alt="WeCrew Technologies logo"
        width={markWidth}
        height={markHeight}
        priority
        className="shrink-0 object-contain"
        style={{
          width: `${markWidth}px`,
          height: `${markHeight}px`,
          maxWidth: `${markWidth}px`,
          maxHeight: `${markHeight}px`,
        }}
      />
      <span className="flex flex-col leading-none select-none whitespace-nowrap">
        <span
          className={`font-display text-[1.35rem] font-semibold tracking-tight transition-colors ${
            tone === "light" ? "text-white" : "text-ink"
          }`}
        >
          We<span className="text-accent">Crew</span>
        </span>
        <span
          className={`mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] transition-colors ${
            tone === "light" ? "text-white/70" : "text-ink-faint"
          }`}
        >
          Technologies
        </span>
      </span>
    </Link>
  );
};

export default Logo;
