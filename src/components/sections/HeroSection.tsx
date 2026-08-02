import { useEffect, useState } from "react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Reduced motion: skip parallax entirely (scrollY stays 0).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      setScrollY(window.scrollY);
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax: title moves slower than scroll (creates depth)
  const titleOffset = scrollY * 0.3;
  const descOffset = scrollY * 0.15;

  return (
    <section className="min-h-[60vh] flex items-end bg-black text-white pt-32 md:pt-40 pb-8 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
          {/* Main Headline with Parallax */}
          <div
            className="lg:col-span-7 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${titleOffset}px)` }}
          >
            <p className="eyebrow text-gray-400 mb-6">
              ARHAFEZ · Strategic Brand Practice
            </p>
            <h1 className="hero-display text-white">
              I turn ambition
              <br />
              into a <span className="hero-accent">system</span>.
            </h1>
          </div>

          {/* Supporting Text with Parallax */}
          <div
            className="lg:col-span-5 lg:pb-4 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${descOffset}px)` }}
          >
            <p className="text-base md:text-lg text-gray-400 max-w-sm leading-relaxed">
              Brand systems for ambitious founders — strategy, identity, and the
              structure that holds them together as the business grows.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
