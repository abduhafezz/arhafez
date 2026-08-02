import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  variant?: "light" | "dark";
}

export function Layout({ children, hideFooter = false, variant = "light" }: LayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className={`min-h-screen flex flex-col ${variant === "dark" ? "bg-black" : "bg-white"}`}>
      <Navbar variant={variant} />
      {/* key={pathname} remounts on navigation so the enter animation replays.
          motion-reduce disables it for users who prefer reduced motion. */}
      <main key={pathname} className="flex-1 animate-page-enter motion-reduce:animate-none">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}