import { useEffect } from "react";
import { CAL_LINK, loadCal } from "@/lib/cal";

// Guard so the widget initializes only once, even if this component
// were ever mounted more than once (e.g. React StrictMode double-invoke).
let initialized = false;

/**
 * Cal.com floating booking button — the single, site-wide booking action.
 * Renders nothing itself; Cal injects a fixed, floating button that persists
 * across all pages and works on desktop and mobile. Styled to match the site
 * (black button, white text, "Book a call").
 */
export function CalFloatingButton() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    const cal = loadCal();

    cal("floatingButton", {
      calLink: CAL_LINK,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      // Same ground as the nav pill (Tailwind gray-900) so the two read as one
      // component. Cal writes these as inline styles on the button.
      buttonText: "Book a call",
      buttonColor: "#111827",
      buttonTextColor: "#ffffff",
    });
    cal("ui", { hideEventTypeDetails: false, layout: "month_view" });

    // The button renders inside a shadow root, so its styling has to be injected
    // there. This does two jobs: match the nav pill's design system, and keep the
    // button clear of the bottom nav on mobile.
    const styleShadowRoot = () => {
      const host = document.querySelector("cal-floating-button");
      const root = host?.shadowRoot;
      if (!root) return false;
      if (root.getElementById("arhafez-cal-style")) return true;
      const style = document.createElement("style");
      style.id = "arhafez-cal-style";
      // Cal ships a 64px pill with 16px sentence-case text and a drop-shadow.
      // Re-spec it to the nav pill: 40px tall (h-10), 11px uppercase labels at
      // 0.08em, Tailwind shadow-md, and the pill's selected state (white ground,
      // black label) as the hover. `!important` is required because Cal writes
      // the colours as inline styles on the element.
      style.textContent = `
        button {
          height: 40px !important;
          padding: 0 18px !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          filter: none !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
          transition: background-color 300ms ease, color 300ms ease !important;
        }
        button svg { height: 14px !important; width: 14px !important; }
        button #button-text {
          margin-left: 8px !important;
          font-size: 11px !important;
          line-height: 1 !important;
        }
        /* Mirrors the pill's active chip. The icon is stroked with currentColor,
           so it inverts along with the label. */
        button:hover {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        button:focus-visible {
          outline: 2px solid #ffffff !important;
          outline-offset: 2px !important;
        }
        @media (max-width: 767px) {
          button {
            bottom: 84px !important;
            /* Align the button's right edge with the Contact tab / bottom-nav
               edge (both sit 40px from the viewport edge on mobile). */
            right: 40px !important;
          }
        }`;
      root.appendChild(style);
      return true;
    };
    const poll = window.setInterval(() => {
      if (styleShadowRoot()) window.clearInterval(poll);
    }, 200);
    const stopPolling = window.setTimeout(() => window.clearInterval(poll), 8000);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(stopPolling);
    };
  }, []);

  return null;
}
