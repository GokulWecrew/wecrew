import type { FC } from "react";

export interface LoadingFallbackProps {
  className?: string;
}

/**
 * Branded suspense fallback rendered during route transitions.
 */
export const LoadingFallback: FC<LoadingFallbackProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex min-h-[50vh] flex-col items-center justify-center p-8 text-center ${className}`}
      role="status"
      aria-label="Loading page content"
    >
      <div className="relative flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
        <div className="absolute text-[0.65rem] font-bold text-brand-600 uppercase font-display">
          WC
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink-faint">
        Loading WeCrew
      </p>
    </div>
  );
}

export default LoadingFallback;
