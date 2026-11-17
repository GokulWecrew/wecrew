import { useEffect, useState, type FC } from "react";
import { ArrowUp } from "lucide-react";

export interface BackToTopProps {
  className?: string;
}

/**
 * Accessible smooth Back-To-Top button that reveals after scrolling down.
 */
export const BackToTop: FC<BackToTopProps> = ({ className = "" }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-base-raised text-ink shadow-lift transition-all hover:bg-base-soft hover:text-accent focus:outline-brand-500 cursor-pointer ${className}`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
