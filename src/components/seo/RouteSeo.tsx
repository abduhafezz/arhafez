import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveRouteSeo, SITE_URL } from "@/data/seo";

/**
 * Centralised, per-route document head manager for this client-rendered SPA.
 * Mounted once inside the router; it updates <title>, meta description,
 * canonical, Open Graph / Twitter tags, robots directive, the Markdown
 * alternate link, and per-route JSON-LD on navigation.
 *
 * It renders nothing and never alters the visual UI — it only writes to <head>.
 */
export function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = resolveRouteSeo(pathname);
    const url = `${SITE_URL}${seo.path === "/" ? "/" : seo.path}`;
    const isProject = seo.path.startsWith("/project/");
    const mdPath = seo.path === "/" ? "/index.md" : `${seo.path}.md`;

    document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("name", "robots", seo.robots ?? "index, follow, max-image-preview:large, max-snippet:-1");
    setCanonical(url);
    setLinkAlternateMarkdown(`${SITE_URL}${mdPath}`);

    // Open Graph
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", isProject ? "article" : "website");
    setMeta("property", "og:image", seo.image);

    // Twitter / X
    setMeta("name", "twitter:card", seo.image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", seo.image);

    setRouteJsonLd(seo.jsonLd);
  }, [pathname]);

  return null;
}

/** Upsert (or remove when content is undefined) a managed meta tag. */
function setMeta(attr: "name" | "property", key: string, content?: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (content == null) {
    // Only remove tags this manager owns (marked with data-rseo), so we never
    // strip the static tags baked into index.html.
    if (el?.dataset.rseo) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.dataset.rseo = "";
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function setLinkAlternateMarkdown(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="alternate"][type="text/markdown"]'
  );
  if (!el) {
    el = document.createElement("link");
    el.rel = "alternate";
    el.type = "text/markdown";
    document.head.appendChild(el);
  }
  el.href = href;
}

function setRouteJsonLd(nodes?: object[]) {
  const id = "route-jsonld";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!nodes || nodes.length === 0) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(
    nodes.length === 1
      ? { "@context": "https://schema.org", ...nodes[0] }
      : { "@context": "https://schema.org", "@graph": nodes }
  );
}
