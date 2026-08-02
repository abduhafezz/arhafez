import { useEffect, useRef } from "react";
import { CAL_LINK, loadCal } from "@/lib/cal";

/**
 * Cal.com inline booking calendar, embedded natively on the page.
 * Spans the full content width and is themed dark to match the site.
 */
export function CalInline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cal = loadCal();

    cal("inline", {
      elementOrSelector: ref.current,
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
      },
      calLink: CAL_LINK,
    });

    cal("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      // Match the dark Contact page; brand accent = the site's white CTA.
      theme: "dark",
      cssVarsPerTheme: { dark: { "cal-brand": "#ffffff" } },
    });
  }, []);

  return (
    <div
      ref={ref}
      id="my-cal-inline-15min"
      className="w-full min-h-[600px] overflow-hidden"
    />
  );
}
