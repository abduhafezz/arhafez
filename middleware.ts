import { next } from "@vercel/edge";

/**
 * Markdown content negotiation for AI agents.
 *
 * Agents that send `Accept: text/markdown` get the page's Markdown
 * representation at the *same* URL; everyone else gets the normal HTML app,
 * untouched. The Markdown bodies are the same static `public/**.md` files that
 * are already published at their own `.md` URLs — this adds a second way to
 * reach them, it does not add a second source of truth.
 *
 * Safety properties that matter here:
 *  - Browsers never match. Their Accept header is `text/html,...,*\/*`, and a
 *    bare `*\/*` deliberately does NOT count as asking for Markdown.
 *  - The middleware only runs on the site's HTML routes (see `config.matcher`),
 *    so static assets, `.md`, `robots.txt`, `sitemap.xml`, and `llms.txt` are
 *    served exactly as before.
 *  - Every failure path falls through to `next()`. If the Markdown is missing
 *    or something unexpected comes back, the visitor still gets the website.
 */

export const config = {
  // HTML routes only. Everything else bypasses this function entirely.
  matcher: ["/", "/services", "/about", "/contact", "/project/:id"],
};

/** Canonical production origin. Advertised URLs are always the apex — never a
 *  preview or deployment host — matching the invariant RouteSeo enforces for
 *  the HTML `<link rel="canonical">`. The subrequest below still uses the real
 *  request origin, because that is what actually has to be fetched. */
const SITE_URL = "https://arhafez.com";

/** Hand-authored pages → their published Markdown twin. */
const PAGE_MARKDOWN: Record<string, string> = {
  "/": "/index.md",
  "/services": "/services.md",
  "/about": "/about.md",
  "/contact": "/contact.md",
};

/** Resolve the Markdown path for a route, or null if the route has none. */
function markdownPathFor(pathname: string): string | null {
  // Normalise a trailing slash the same way RouteSeo does (except at root).
  const clean =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (PAGE_MARKDOWN[clean]) return PAGE_MARKDOWN[clean];

  // Case studies: /project/{id} → /project/{id}.md. The id is not validated
  // here — an unknown id simply won't resolve to a Markdown file below, and
  // the request falls through to the SPA's own 404.
  const project = clean.match(/^\/project\/([A-Za-z0-9-]+)$/);
  return project ? `/project/${project[1]}.md` : null;
}

/** True only when the client explicitly named Markdown. `*\/*` does not count. */
function wantsMarkdown(accept: string | null): boolean {
  return accept != null && accept.toLowerCase().includes("text/markdown");
}

export default async function middleware(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") return next();
  if (!wantsMarkdown(request.headers.get("accept"))) return next();

  const url = new URL(request.url);
  const markdownPath = markdownPathFor(url.pathname);
  if (!markdownPath) return next();

  // Same-origin subrequest for the Markdown body. On a deployment with
  // Protection enabled (every preview), an unauthenticated subrequest is
  // bounced to SSO — so the caller's own credentials are forwarded, which
  // makes previews behave like production. On production, where there is no
  // Protection, these headers are simply absent and nothing changes.
  const subrequestHeaders: Record<string, string> = {
    accept: "text/markdown, text/plain",
  };
  const cookie = request.headers.get("cookie");
  if (cookie) subrequestHeaders.cookie = cookie;
  const bypass = request.headers.get("x-vercel-protection-bypass");
  if (bypass) subrequestHeaders["x-vercel-protection-bypass"] = bypass;

  let upstream: Response;
  try {
    // The .md paths are outside `config.matcher`, so this cannot re-enter the
    // middleware — no recursion is possible.
    upstream = await fetch(new URL(markdownPath, url.origin), {
      headers: subrequestHeaders,
      redirect: "manual",
    });
  } catch {
    return next();
  }

  // A missing .md does not 404 on this project: the SPA rewrite answers with
  // index.html at status 200.
  const upstreamType = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !upstreamType.toLowerCase().includes("markdown")) {
    return next();
  }

  // ...and the content type alone is NOT enough to trust it. `vercel.json`
  // stamps `Content-Type: text/markdown` on any `*.md` request path *before*
  // the filesystem is consulted, so a missing file comes back as index.html
  // wearing a Markdown label. Sniffing the body is what actually catches it —
  // verified against a real deployment, where the header check alone let
  // /project/<unknown> serve HTML as Markdown.
  const body = await upstream.text();
  if (/^\s*<(!doctype|html)/i.test(body)) return next();
  const canonical = `${SITE_URL}${url.pathname}`;

  return new Response(request.method === "HEAD" ? null : body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Caches must key on Accept, or a Markdown response could be replayed to
      // a browser (and vice versa).
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, must-revalidate",
      // Same policy the standalone .md URLs carry: agent-readable, not a
      // duplicate-content index entry. The HTML at this URL stays indexable.
      "X-Robots-Tag": "noindex",
      Link: `<${canonical}>; rel="canonical", <${SITE_URL}${markdownPath}>; rel="alternate"; type="text/markdown"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
