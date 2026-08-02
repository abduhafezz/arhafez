import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageCloseProps {
  /** Micro-label above the action. */
  label: string;
  /** The action itself — written as a sentence, not a button label. */
  action: string;
  to: string;
  /** Ground this block sits on. Also drives the nav-theme marker. */
  tone?: "light" | "dark";
}

/**
 * The single closing gesture used at the end of every page, so each one hands
 * the reader forward instead of stopping. One label + one large link, matching
 * the site's editorial voice rather than a button.
 */
export function PageClose({ label, action, to, tone = "dark" }: PageCloseProps) {
  const isDark = tone === "dark";

  return (
    <section
      data-nav-theme={tone}
      className={isDark ? "bg-black" : "bg-white"}
    >
      <div className="container pb-20 md:pb-28">
        <div
          className={cn(
            "pt-16 md:pt-20 border-t",
            isDark ? "border-gray-800" : "border-gray-300"
          )}
        >
          <p
            className={cn(
              "eyebrow mb-6",
              isDark ? "text-gray-400" : "text-gray-500"
            )}
          >
            {label}
          </p>
          <Link
            to={to}
            className={cn(
              "group inline-flex items-baseline gap-4 text-3xl md:text-5xl font-light tracking-[-0.02em] transition-colors",
              isDark
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-600"
            )}
          >
            {action}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
