import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reveal + on-screen tracking via IntersectionObserver (no per-scroll
    // getBoundingClientRect). Reveal latches on; on-screen gates the parallax.
    let onScreen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0].isIntersecting;
        if (onScreen) setIsVisible(true);
      },
      { threshold: 0 }
    );
    observer.observe(el);

    // Reduced motion: reveal immediately, no parallax scroll work.
    if (prefersReduced) {
      setIsVisible(true);
      return () => observer.disconnect();
    }

    // Parallax, rAF-throttled and only while the card is on screen.
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!onScreen || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const distanceFromCenter =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        window.innerHeight;
      setParallaxOffset(distanceFromCenter * 30);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Link 
      to={`/project/${project.id}`}
      ref={cardRef}
      className={`group block cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Image Container with Parallax */}
      <div
        className="relative mb-4 overflow-hidden aspect-[4/3]"
        style={{ backgroundColor: project.color }}
      >
        {/* Parallax image wrapper */}
        <div 
          className="absolute inset-[-20px] transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          {project.heroImage ? (
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/30 text-4xl md:text-5xl font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="space-y-1">
        {/* Title */}
        <h3 className="text-base md:text-lg font-medium text-white group-hover:text-gray-300 transition-colors">
          {project.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 pt-2">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-widest text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}