import { useEffect, useRef, useState, type FC } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  ChevronDown,
  ArrowRight,
  Home,
  Users,
  Layers,
  Cpu,
  Factory,
  BookOpen,
  MessageSquare,
  Sparkles,
  Shield,
  Code,
  Globe,
  Bot,
  CloudCog,
  Mail,
  Radar,
} from "lucide-react";
import { Logo } from "@/components/navigation/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { nav, site } from "@/constants/site";

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const NAV_ICONS: Record<string, typeof Home> = {
  Home,
  "About Us": Users,
  Products: Layers,
  Services: Cpu,
  Industries: Factory,
  Insights: BookOpen,
};

const PRODUCT_ICONS: Record<string, typeof Sparkles> = {
  "WeCrew Copilot AI": Sparkles,
  "WeCrew Sentinel": Shield,
  "WeCrew Ops": Radar,
};

const SERVICE_ICONS: Record<string, typeof Code> = {
  "Custom Software Development": Code,
  "Web & Mobile Development": Globe,
  "AI & Automation": Bot,
  "DevOps & Infrastructure": CloudCog,
};

export const MobileNavDrawer: FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const { pathname } = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Client-side portal mounting check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate in and out smoothly
  useEffect(() => {
    if (isOpen) {
      setAnimating(true);
      // Auto-expand section if currently on that route
      if (pathname.startsWith("/products")) {
        setExpandedSection("Products");
      } else if (pathname.startsWith("/services")) {
        setExpandedSection("Services");
      }
    } else {
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Focus close button on open
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      clearTimeout(focusTimer);
      triggerRef?.current?.focus();
    };
  }, [isOpen, triggerRef]);

  // Keyboard accessibility: Escape key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close when window resized to desktop (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, onClose]);

  if (!mounted || (!isOpen && !animating)) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const drawerContent = (
    <div
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[100] lg:hidden overflow-hidden"
    >
      {/* Backdrop overlay with blur */}
      <div
        className={`fixed inset-0 bg-navy-950/70 backdrop-blur-md transition-opacity duration-300 ease-out cursor-pointer ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel container */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 flex w-full max-w-sm sm:max-w-md flex-col bg-base border-l border-line shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ height: "100dvh" }}
      >
        {/* Drawer Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <Logo size={34} />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-base-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Drawer Body - Scrollable Navigation */}
        <nav
          aria-label="Mobile Primary Navigation"
          className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 divide-y divide-line/60"
        >
          <ul className="space-y-1.5 pb-4">
            {nav.map((item, index) => {
              const Icon = NAV_ICONS[item.label] || Layers;
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isSectionOpen = expandedSection === item.label;
              const isSectionActive = pathname.startsWith(item.href);
              const active = isActive(pathname, item.href);

              return (
                <li
                  key={item.label}
                  className="transition-all duration-300"
                  style={{
                    animationDelay: `${index * 40}ms`,
                  }}
                >
                  {hasChildren ? (
                    <div className="rounded-xl overflow-hidden border border-transparent transition-colors">
                      {/* Accordion toggle button */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedSection((prev) => (prev === item.label ? null : item.label))
                        }
                        aria-expanded={isSectionOpen}
                        aria-label={`Toggle ${item.label} submenu`}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[0.98rem] font-semibold transition-all cursor-pointer ${
                          isSectionActive
                            ? "bg-brand-500/10 text-accent dark:bg-brand-500/20"
                            : "text-ink hover:bg-base-soft hover:text-accent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isSectionOpen ? "rotate-180 text-accent" : "text-ink-faint"
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Animated Submenu */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isSectionOpen ? "max-h-[500px] opacity-100 pt-1 pb-2" : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="ml-5 pl-3 border-l-2 border-brand-500/20 space-y-1">
                          <li>
                            <Link
                              to={item.href}
                              onClick={handleLinkClick}
                              className="flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-accent hover:bg-base-soft rounded-md transition-colors"
                            >
                              <span>Explore all {item.label.toLowerCase()}</span>
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </Link>
                          </li>

                          {item.children?.map((child) => {
                            const ChildIcon =
                              item.label === "Products"
                                ? PRODUCT_ICONS[child.label] || Sparkles
                                : SERVICE_ICONS[child.label] || Code;
                            const childActive = pathname === child.href;

                            return (
                              <li key={child.href}>
                                <Link
                                  to={child.href}
                                  onClick={handleLinkClick}
                                  className={`group flex items-start gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${
                                    childActive
                                      ? "bg-brand-500/15 text-accent font-semibold"
                                      : "text-ink-body hover:bg-base-soft hover:text-ink"
                                  }`}
                                >
                                  <ChildIcon
                                    className="h-4 w-4 shrink-0 mt-0.5 text-accent/80 group-hover:text-accent transition-colors"
                                    aria-hidden="true"
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-[0.92rem] font-medium leading-tight">
                                      {child.label}
                                    </span>
                                    {child.description && (
                                      <span className="text-[0.76rem] text-ink-faint leading-snug line-clamp-1 mt-0.5">
                                        {child.description}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={handleLinkClick}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-[0.98rem] font-semibold transition-all ${
                        active
                          ? "bg-brand-500/10 text-accent border-l-4 border-accent dark:bg-brand-500/20"
                          : "text-ink hover:bg-base-soft hover:text-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick Contact & Info */}
          <div className="pt-4 space-y-3">
            <div className="rounded-xl border border-line bg-base-soft/50 p-3.5 flex items-center justify-between text-xs text-ink-body">
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <span className="font-mono">{site.email}</span>
              </span>
              <span className="text-ink-faint">Bangalore, IN</span>
            </div>
          </div>
        </nav>

        {/* Drawer Footer CTA */}
        <div className="shrink-0 border-t border-line bg-base p-4 sm:p-5">
          <Link
            to="/contact#consultation"
            onClick={handleLinkClick}
            className="group w-full py-3.5 px-5 text-center inline-flex items-center justify-center gap-2 rounded-xl font-semibold bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-[0_8px_20px_rgb(22_104_216/0.25)] hover:shadow-[0_12px_28px_rgb(22_104_216/0.35)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
            <MessageSquare className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <p className="mt-2 text-center text-[0.72rem] text-ink-faint">
            Enterprise software, AI & digital transformation
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};

export default MobileNavDrawer;
