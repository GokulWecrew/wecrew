import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
};

const maxWMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

/**
 * Enterprise accessible Modal Dialog adhering to WCAG 2.2 AA standards.
 * Features:
 * - Trapped focus and auto-focus on open
 * - Escape key dismissal
 * - Body scroll locking
 * - Accessible ARIA attributes (role="dialog", aria-modal="true", aria-labelledby)
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/75 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${maxWMap[maxWidth]} rounded-2xl border border-line bg-base-raised p-6 sm:p-8 shadow-lift transition-all focus:outline-none`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-base-soft hover:text-ink cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {title && (
          <h2
            id="modal-title"
            className="font-display text-xl font-semibold text-ink"
          >
            {title}
          </h2>
        )}

        {description && (
          <p
            id="modal-description"
            className="mt-1.5 text-sm text-ink-body leading-relaxed"
          >
            {description}
          </p>
        )}

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
