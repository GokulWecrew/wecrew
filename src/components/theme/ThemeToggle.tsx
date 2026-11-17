import type { FC } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export interface ThemeToggleProps {
  tone?: "dark" | "light";
  className?: string;
}

/**
 * The single header theme control: cycles Light → Dark → System.
 * Icon shows the resolved appearance (Sun in light, Moon in dark);
 * a small monitor badge indicates "System" mode.
 */
export const ThemeToggle: FC<ThemeToggleProps> = ({ tone = "dark", className = "" }) => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const label =
    theme === "system"
      ? "Theme: system preference — switch to light mode"
      : theme === "light"
        ? "Theme: light — switch to dark mode"
        : "Theme: dark — switch to system preference";

  const base =
    "relative inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer";
  const colors =
    tone === "light"
      ? "text-white/85 hover:bg-white/10 hover:text-white"
      : "text-ink-body hover:bg-base-soft hover:text-ink";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`${base} ${colors} ${className ?? ""}`}
    >
      {resolvedTheme === "dark" ? (
        <Moon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Sun className="h-5 w-5" aria-hidden="true" />
      )}
      {theme === "system" && (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 hidden h-2.5 w-2.5 rounded-full border-2 border-base-raised bg-brand-500 sm:block"
        />
      )}
    </button>
  );
}
