import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, type FC } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "@/components/navigation/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNavDrawer } from "@/components/navigation/MobileNavDrawer";
import { nav } from "@/constants/site";

export interface SiteHeaderProps {
  className?: string;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export const SiteHeader: FC<SiteHeaderProps> = ({ className = "" }) => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  // On the home page, the header starts transparent over the full-bleed dark hero
  const overDarkHero = pathname === "/" && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop dropdowns and mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Escape key closes open desktop dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getLinkClasses = (active: boolean) => {
    const base = "rounded-lg px-2.5 xl:px-3 py-2 text-[0.92rem] font-medium transition-all duration-150";
    if (overDarkHero) {
      return active
        ? `${base} text-white font-semibold bg-white/10`
        : `${base} text-white/80 hover:text-white hover:bg-white/10`;
    }
    return active
      ? `${base} text-accent font-semibold bg-brand-50/80 dark:bg-brand-500/20 dark:text-brand-200`
      : `${base} text-ink-body hover:text-ink hover:bg-base-soft`;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-200 ${
          overDarkHero
            ? "bg-transparent border-b border-transparent"
            : "bg-base/95 backdrop-blur-md border-b border-line shadow-xs"
        } ${className}`}
      >
        {/* 3-Column Balanced Layout: Left Logo | Center Nav | Right Theme + CTA */}
        <div className="mx-auto grid h-16 lg:h-[4.5rem] w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* COLUMN 1: LEFT — Original WeCrew Logo */}
          <div className="flex items-center justify-start shrink-0">
            <Logo tone={overDarkHero ? "light" : "dark"} size={38} />
          </div>

          {/* COLUMN 2: CENTER — Primary Desktop Navigation */}
          <nav
            aria-label="Main"
            className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 overflow-visible"
          >
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu(openMenu === item.label ? null : item.label)
                    }
                    className={`flex items-center gap-1.5 cursor-pointer ${getLinkClasses(
                      pathname.startsWith(item.href)
                    )}`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {openMenu === item.label && (
                    <div className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-2">
                      <div className="animate-dropdown overflow-hidden rounded-xl border border-line bg-base-raised shadow-lift">
                        <ul className="py-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                to={child.href}
                                className="group flex flex-col gap-0.5 px-5 py-3.5 transition-colors hover:bg-base-soft"
                              >
                                <span className="flex items-center justify-between text-[0.92rem] font-semibold text-ink">
                                  {child.label}
                                  <ArrowRight
                                    className="h-3.5 w-3.5 -translate-x-1 text-accent opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                    aria-hidden="true"
                                  />
                                </span>
                                {child.description && (
                                  <span className="text-[0.8rem] leading-snug text-ink-faint">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={getLinkClasses(isActive(pathname, item.href))}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Placeholder spacer for mobile grid centering */}
          <div className="lg:hidden" aria-hidden="true" />

          {/* COLUMN 3: RIGHT — Theme Toggle & Primary CTA / Mobile Controls */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle tone={overDarkHero ? "light" : "dark"} />
              <Link
                to="/contact#consultation"
                className="btn-primary ml-1 px-5 py-2.5 text-sm inline-flex items-center justify-center rounded-lg font-semibold bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-[0_8px_20px_rgb(22_104_216/0.25)] hover:shadow-[0_10px_28px_rgb(22_104_216/0.35)] hover:brightness-110 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer"
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* Mobile & Tablet Controls */}
            <div className="flex lg:hidden items-center gap-1.5">
              <ThemeToggle tone={overDarkHero ? "light" : "dark"} />
              <button
                ref={hamburgerBtnRef}
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                className={`relative inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                  overDarkHero
                    ? "text-white hover:bg-white/10"
                    : "text-ink hover:bg-base-soft"
                }`}
              >
                {/* Modern React Bits 3-bar morphing animation */}
                <div className="relative h-4 w-5 flex flex-col justify-between" aria-hidden="true">
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out origin-center ${
                      mobileOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ease-out ${
                      mobileOpen ? "opacity-0 scale-x-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out origin-center ${
                      mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern React Bits-Inspired Mobile Navigation Drawer (mounted via Portal outside <header>) */}
      <MobileNavDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        triggerRef={hamburgerBtnRef}
      />
    </>
  );
};

export default SiteHeader;
