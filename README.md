# ARHAFEZ

The website for **ARHAFEZ**, the strategic brand practice of Abdulrahman Hafez.

Editorial, Swiss-influenced portfolio site: a work-forward home, a process-led
services page, a practice page, and a case study for each project.

---

## Stack

| | |
|---|---|
| Build | Vite 5 |
| Framework | React 18 + TypeScript |
| Routing | React Router 6 (client-side) |
| Styling | Tailwind CSS |
| Booking | Cal.com embed (floating button + inline calendar) |

Runtime dependencies are deliberately minimal: `react`, `react-dom`,
`react-router-dom`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, plus
`@vercel/edge` — which is used only by `middleware.ts` and never reaches the
client bundle.

---

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build    # production build to dist/
npm run preview  # serve the built output
npm run lint
```

---

## Structure

```
src/
├─ pages/                  One file per route
│  ├─ Index.tsx            "/"            home + work grid
│  ├─ Services.tsx         "/services"    the four-phase process
│  ├─ About.tsx            "/about"       the practice
│  ├─ Contact.tsx          "/contact"     brief form + inline calendar
│  ├─ ProjectDetail.tsx    "/project/:id" case study
│  └─ NotFound.tsx         catch-all
├─ components/
│  ├─ layout/              Layout, Navbar, Footer, Logo, ScrollToTop
│  ├─ sections/            HeroSection, ClientMarquee, PageClose
│  ├─ work/                ProjectGrid, ProjectCard
│  ├─ seo/                 RouteSeo — per-route <head> manager
│  └─ booking/             CalFloatingButton, CalInline
├─ data/
│  ├─ projects.ts          Case-study content + contact/social constants
│  └─ seo.ts               Per-route titles/descriptions + JSON-LD builders
├─ lib/
│  ├─ utils.ts             cn() class merger
│  └─ cal.ts               Cal.com embed bootstrap
└─ index.css               Design tokens + .hero-display / .eyebrow

middleware.ts               Accept: text/markdown negotiation (see Deployment)

public/
├─ projects/<slug>/        Web-optimised case-study imagery
├─ clients/                Client logos (marquee)
├─ about/                  Award photograph
├─ *.md, project/*.md      Markdown representation of each page
└─ robots.txt, sitemap.xml, llms.txt, og-image.jpg
```

### Content

All case-study copy, credits and imagery live in **`src/data/projects.ts`**.
Adding a project means adding one object there plus a folder under
`public/projects/`. No component changes required.

### Design system

Three shared tokens in `src/index.css` keep the pages consistent:

- `.hero-display` — the single fluid hero scale, `clamp(2.75rem, 7vw, 8rem)`
- `.hero-accent` — the one bold word in each hero
- `.eyebrow` — the uppercase micro-label used above every section

**Navbar theming:** the fixed header reads `data-nav-theme="light|dark"` from
whichever section sits beneath it, so pages that invert mid-scroll (the dark
band on Services, the light band on About) never show a clashing bar. Mark any
new inverted section with that attribute.

---

## Deployment

Static SPA — build and serve `dist/`.

Because routing is client-side, the host must rewrite unknown paths to
`index.html`, or deep links such as `/services` will 404 on refresh. Config for
both common hosts is committed: `public/_redirects` (Netlify / Cloudflare
Pages) and `vercel.json` (Vercel).

**Markdown for agents.** On Vercel, `middleware.ts` answers requests carrying
`Accept: text/markdown` with the page's Markdown twin from `public/`, at the
same URL. Browsers are unaffected — a bare `*/*` does not qualify — and every
failure path falls through to the normal HTML app. The same content is also
published directly at `/index.md`, `/about.md`, `/project/<slug>.md`, etc.

The Vercel project has **no Git integration**: pushing to `main` does not
deploy. Production is released explicitly with `vercel deploy --prod` from a
clean tree.

---

## Notes

- `assets-src/` holds full-resolution design masters. It is **git-ignored** —
  keep it backed up separately. Only optimised exports under `public/` ship.
- The contact form currently opens a prefilled email via `mailto:`; wire a form
  backend before relying on it.
