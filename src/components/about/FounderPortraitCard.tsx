import { useState, useRef, useEffect, type FC, type PointerEvent } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

export interface FounderPortraitCardProps {
  name?: string;
  designation?: string;
  company?: string;
  imageSrc?: string;
  fallbackSrc?: string;
  className?: string;
}

/**
 * Premium React Bits-inspired Tilted Card with interactive spotlight and glare effects.
 * Optimized for executive profiles:
 * - Subtle 3D perspective tilt following pointer position
 * - Responsive dynamic glare overlay
 * - Automatic disable on touch/coarse pointers and reduced-motion preferences
 * - High-DPI crisp portrait rendering with dark gradient rim
 */
export const FounderPortraitCard: FC<FounderPortraitCardProps> = ({
  name = "Raj Kumar",
  designation = "Founder & Managing Director",
  company = "WeCrew Technologies Private Limited",
  imageSrc = "/raj-kumar-founder.png",
  fallbackSrc = "/raj-kumar-founder.png",
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glareStyle, setGlareStyle] = useState<{ opacity: number; x: number; y: number }>({
    opacity: 0,
    x: 50,
    y: 50,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Check if device supports fine hover or if reduced motion is requested
  const isInteractiveRef = useRef<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      isInteractiveRef.current = !isCoarse && !prefersReduced;
    }
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isInteractiveRef.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, high-end tilt: max 7 degrees on X and Y
    const maxTilt = 7;
    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Glare coordinates in percentages
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlareStyle({
      opacity: 0.35,
      x: glareX,
      y: glareY,
    });
  };

  const handlePointerEnter = () => {
    if (!isInteractiveRef.current) return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (!isInteractiveRef.current) return;
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className={`relative mx-auto w-full min-w-0 max-w-[420px] lg:max-w-[460px] ${className}`}>
      {/* Outer ambient glow behind card */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-3xl opacity-40 blur-2xl transition-opacity duration-700"
        style={{
          background: isHovered
            ? "radial-gradient(circle at 50% 40%, rgba(40, 184, 232, 0.4), rgba(22, 104, 216, 0.25) 50%, transparent 75%)"
            : "radial-gradient(circle at 50% 50%, rgba(22, 104, 216, 0.2), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 3D Tilted Card Container */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e213d] via-[#071426] to-[#050d1f] shadow-2xl transition-all duration-300 ease-out will-change-transform"
        style={{
          transform: transformStyle,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? "0 25px 60px -12px rgba(5, 13, 31, 0.8), 0 0 40px -5px rgba(34, 184, 240, 0.2)"
            : "0 15px 40px -10px rgba(5, 13, 31, 0.6)",
        }}
      >
        {/* Dynamic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(79, 205, 247, 0.2) 30%, transparent 65%)`,
            mixBlendMode: "overlay",
          }}
          aria-hidden="true"
        />

        {/* Decorative Top Accent Light Rim */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent z-20"
          aria-hidden="true"
        />

        {/* Floating Top Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/75 px-3 py-1 text-[11px] font-mono font-medium tracking-wider text-cyan-300 backdrop-blur-md shadow-md">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>FOUNDER &amp; LEADERSHIP</span>
        </div>

        {/* Portrait Image Frame */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#071426]">
          <img
            src={imageError ? fallbackSrc : imageSrc}
            alt={`${name} — ${designation}, ${company}`}
            loading="eager"
            decoding="async"
            onError={() => {
              if (!imageError) setImageError(true);
            }}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Cinematic Vignette Gradient over portrait */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to top, rgba(5, 13, 31, 0.95) 0%, rgba(5, 13, 31, 0.6) 24%, rgba(5, 13, 31, 0.1) 50%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Subtle Side Rim Shading */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(5, 13, 31, 0.2) 0%, transparent 15%, transparent 85%, rgba(5, 13, 31, 0.2) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Bottom Glassmorphic Identity Panel */}
        <div className="relative z-20 -mt-20 px-6 pb-6 pt-3 text-white">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4.5 backdrop-blur-md shadow-lg transition-colors group-hover:border-cyan-400/30 group-hover:bg-white/[0.07]">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {name}
                </h3>
                <p className="mt-0.5 break-words font-display text-sm font-semibold text-cyan-300">
                  {designation}
                </p>
              </div>

              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-400 shadow-inner flex-none"
                title="Verified Executive Leadership"
              >
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-3 border-t border-white/10 pt-2.5 flex items-center justify-between text-xs text-white/60 font-mono">
              <span className="truncate">{company}</span>
              <span className="flex items-center gap-1 text-[11px] text-cyan-400 flex-none ml-2">
                <Sparkles className="h-3 w-3" />
                <span>Executive</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom border subtle glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default FounderPortraitCard;
