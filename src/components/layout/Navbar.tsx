import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";

interface NavbarProps {
  variant?: "light" | "dark";
}

const navItems = [
  { label: "Work", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function activeIndex(pathname: string): number {
  if (pathname === "/" || pathname.startsWith("/project")) return 0;
  if (pathname.startsWith("/services")) return 1;
  if (pathname.startsWith("/about")) return 2;
  if (pathname.startsWith("/contact")) return 3;
  return 0;
}

/** Vertical probe point (px from viewport top) — roughly the middle of the bar. */
const PROBE_Y = 32;

export function Navbar({ variant = "light" }: NavbarProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Resolved from whichever `[data-nav-theme]` section is behind the bar; falls
  // back to the page's own variant. Without this, pages that invert mid-scroll
  // (Services' dark band, About's light band) show a bar in the opposite colour.
  const [theme, setTheme] = useState<"light" | "dark">(variant);
  const lastScrollY = useRef(0);

  const isDark = theme === "dark";
  const active = activeIndex(location.pathname);

  // Reset to the page default whenever the route changes.
  useEffect(() => {
    setTheme(variant);
  }, [variant, location.pathname]);

  useEffect(() => {
    const resolveTheme = () => {
      const marked = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let next: "light" | "dark" = variant;
      marked.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= PROBE_Y && r.bottom > PROBE_Y) {
          const t = el.dataset.navTheme;
          if (t === "light" || t === "dark") next = t;
        }
      });
      setTheme(next);
    };

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Hide when scrolling down (past a small threshold), reveal when scrolling up.
      if (y > lastScrollY.current && y > 80) {
        setHidden(true);
      } else if (y < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = y;

      resolveTheme();
    };

    resolveTheme();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resolveTheme);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resolveTheme);
    };
  }, [variant, location.pathname]);

  return (
    <>
      {/* Top bar — hides on scroll down, reveals on scroll up.
          NOTE: the pill nav is intentionally a SIBLING, not a child, of this
          header. A transform on the header would become the containing block
          for the pill's `position: fixed`, dragging the mobile bottom pill
          off-screen. Keeping them siblings lets each transform independently. */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-5 lg:py-8",
          "transition-[transform,background-color] duration-300 ease-out",
          isDark ? "bg-black" : "bg-white",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        {/* Logo lives in the same `.container` as the page content, so it shares
            the content's left edge and max-width at every breakpoint instead of
            hugging the viewport edge on wide screens. */}
        <div className="container">
          {/* From md up the pill sits in this same band, so match its height (h-10)
              to put both on one centreline — otherwise the shorter wordmark
              optically floats above it. Below md the pill docks to the bottom, so
              the bar stays compact. */}
          <div className="flex items-center justify-between md:h-10">
            {/* Left: Wordmark — official ARHAFEZ logo */}
            <Link
              to="/"
              aria-label="ARHAFEZ — home"
              className={cn(
                "transition-[opacity,color] duration-300 hover:opacity-60",
                isDark ? "text-white" : "text-black"
              )}
            >
              <Logo className="h-[18px] sm:h-[22px]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Center: Floating pill nav with sliding indicator.
          Mobile = bottom bar (stays visible); desktop = top pill (hides with header). */}
      <nav
        className={cn(
          "fixed left-1/2 -translate-x-1/2 bottom-6 md:bottom-auto md:top-5 lg:top-8 z-50 flex items-center rounded-full transition-all duration-300 bg-gray-900",
          scrolled ? "shadow-lg" : "shadow-md",
          // Hide the desktop (top) pill with the header; keep the mobile bottom pill visible.
          hidden ? "md:-translate-y-24" : ""
        )}
      >
        {/* Sliding white indicator */}
        <div
          className="absolute top-0 h-full w-1/4 bg-white rounded-full transition-all duration-300 ease-out"
          style={{ left: `${active * 25}%` }}
        />
        {navItems.map((item, i) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "relative z-10 flex items-center justify-center w-[4.6rem] sm:w-20 h-10 text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium transition-colors duration-300",
              i === active ? "text-black" : "text-gray-400 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
