import { cn } from "@/lib/utils";

// Client logos live in /public/clients. Order follows the source artboards.
// TODO(content): replace `alt` with each client's real name (e.g. "SNB",
// "GIMIX", "Telfaz") once the file→brand mapping is confirmed, for a11y + SEO.
const logos = [
  "logo-04",
  "logo-05",
  "logo-06",
  "logo-07",
  "logo-08",
  "logo-09",
  "logo-10",
  "logo-11",
  "logo-12",
  "logo-13",
  "logo-14",
];

/**
 * Seamless, infinite logo marquee scrolling left-to-right.
 *
 * The track holds the logo set twice. Spacing is baked into each item as
 * horizontal padding (not a flex `gap`) so both halves are exactly equal
 * width — that's what lets the `marquee` keyframe (-50% → 0) loop with no
 * visible jump. It scrolls continuously and is never paused; motion-reduce
 * disables it entirely.
 *
 * `onDark` inverts the (black) logos to white for use on dark backgrounds.
 */
export function ClientMarquee({ onDark = false }: { onDark?: boolean }) {
  return (
    <div
      role="region"
      aria-label="Selected clients"
      className="relative overflow-hidden"
      // Fade the strip's edges so logos ease in/out rather than hard-clip.
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {[...logos, ...logos].map((logo, i) => (
          <div key={`${logo}-${i}`} className="shrink-0 px-8 md:px-12">
            <img
              src={`/clients/${logo}.svg`}
              alt="Client logo"
              aria-hidden="true"
              className={cn(
                "h-7 md:h-9 w-auto opacity-60 transition-opacity duration-300 hover:opacity-100",
                onDark && "invert"
              )}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
