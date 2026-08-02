import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the top on every route change.
 * Mounted inside <BrowserRouter> so it can read the current pathname.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant jump (not the CSS smooth-scroll) so route changes don't visibly
    // animate a scroll-to-top behind the page-enter fade.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
