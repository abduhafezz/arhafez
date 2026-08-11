import { projects } from "./projects";

/** Canonical production origin. Used for canonical URLs, OG URLs, JSON-LD ids. */
export const SITE_URL = "https://arhafez.com";

export interface RouteSeo {
  title: string;
  description: string;
  /** Canonical path (always starts with "/"). */
  path: string;
  /** Absolute image URL for OG/Twitter, when a representative image exists. */
  image?: string;
  /** Robots directive; defaults to index,follow. Set to noindex for the 404. */
  robots?: string;
  /** Optional JSON-LD graph nodes specific to this route. */
  jsonLd?: object[];
}

const DEFAULT_DESCRIPTION =
  "ARHAFEZ is the strategic brand practice of Abdulrahman Hafez. Brand systems for ambitious founders — strategy, identity, and guidelines, built to last. Working across Saudi Arabia, Egypt, and the UAE.";

/** Default representative image for non-project pages (Open Graph / Twitter).
 *  Manual asset: add a branded 1200×630 image at public/og-image.jpg. */
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Reusable id references into the sitewide entity graph (defined in index.html). */
const PERSON_REF = { "@id": `${SITE_URL}/#person` } as const;

const AREA_SERVED = [
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "Egypt" },
  { "@type": "Country", name: "United Arab Emirates" },
];

/** Static, hand-authored routes. Titles/descriptions are metadata only — they do
 *  not change any visible copy on the pages. */
const staticRoutes: Record<string, RouteSeo> = {
  "/": {
    title: "Abdulrahman Hafez — Strategic Brand Designer | ARHAFEZ",
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  "/services": {
    title: "Brand Strategy, Identity & Brand Systems — ARHAFEZ",
    description:
      "The services of Abdulrahman Hafez (ARHAFEZ): Brand Audit, the full Brand System, Brand Identity, and Creative Direction. Strategic brand design for ambitious founders — every project starts with strategy, never a logo.",
    path: "/services",
    jsonLd: [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services#service`,
        name: "Strategic Brand Design",
        url: `${SITE_URL}/services`,
        serviceType: ["Brand strategy", "Brand identity", "Brand systems", "Creative direction"],
        description:
          "Strategic brand design for ambitious founders — Brand Audit, the full Brand System, Brand Identity, Brand Guidelines, Rebranding, Art Direction, Editorial & Layout, and Creative Direction.",
        provider: PERSON_REF,
        areaServed: AREA_SERVED,
      },
    ],
  },
  "/about": {
    title: "About — Abdulrahman Hafez, Strategic Brand Designer | ARHAFEZ",
    description:
      "Abdulrahman Hafez is a strategic brand designer (ARHAFEZ) working across Saudi Arabia, Egypt, and the UAE — from banking to real estate to film. Gold Winner, Gridliners Design Awards 2024.",
    path: "/about",
    jsonLd: [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/about#profilepage`,
        url: `${SITE_URL}/about`,
        name: "About Abdulrahman Hafez",
        mainEntity: PERSON_REF,
      },
    ],
  },
  "/contact": {
    title: "Contact — Work with Abdulrahman Hafez | ARHAFEZ",
    description:
      "Start a project with Abdulrahman Hafez (ARHAFEZ). Tell me what you're building for clear next steps, or book a short discovery call. Reach ARHAFEZ at hi@arhafez.com.",
    path: "/contact",
    jsonLd: [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact ARHAFEZ",
        mainEntity: PERSON_REF,
      },
    ],
  },
};

function trim(text: string, max = 300): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

/** Build SEO + JSON-LD for a project case study from the real project data. */
function projectRoute(id: string): RouteSeo | null {
  const p = projects.find((x) => x.id === id);
  if (!p) return null;

  const path = `/project/${p.id}`;
  const url = `${SITE_URL}${path}`;
  const image = p.coverImage ? `${SITE_URL}${p.coverImage}` : undefined;

  const creativeWork: Record<string, unknown> = {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: p.title,
    headline: p.subtitle,
    description: trim(`${p.subtitle} ${p.context}`),
    url,
    inLanguage: "en",
    dateCreated: p.year,
    creditText: p.credit,
    keywords: p.tags.join(", "),
    genre: p.description,
    creator: { "@id": `${SITE_URL}/#person` },
    ...(image ? { image } : {}),
    ...(p.agency ? { producer: { "@type": "Organization", name: p.agency } } : {}),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: p.title, item: url },
    ],
  };

  return {
    title: `${p.title} — ${p.description} — ARHAFEZ`,
    description: trim(`${p.subtitle} ${p.context}`, 300),
    path,
    image,
    jsonLd: [creativeWork, breadcrumb],
  };
}

/** Resolve SEO for any pathname. Unknown routes get a noindex 404 record. */
export function resolveRouteSeo(pathname: string): RouteSeo {
  // Normalise trailing slash (except root).
  const clean =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (staticRoutes[clean]) {
    // Fall back to the branded default image where a route has none.
    return { ...staticRoutes[clean], image: staticRoutes[clean].image ?? DEFAULT_IMAGE };
  }

  const projectMatch = clean.match(/^\/project\/([^/]+)$/);
  if (projectMatch) {
    const route = projectRoute(projectMatch[1]);
    if (route) return route;
  }

  // Unknown / 404
  return {
    title: "Page not found — ARHAFEZ",
    description: "The page you're looking for doesn't exist or has moved.",
    path: clean,
    image: DEFAULT_IMAGE,
    robots: "noindex, follow",
  };
}
