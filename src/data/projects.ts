/** A case-study gallery image. `span: "full"` = full content width;
 *  consecutive `"half"` items are paired into a 2-up row on desktop.
 *  `ratio` is a CSS aspect-ratio (e.g. "16 / 9", "1 / 1") controlling the
 *  frame; defaults to "16 / 9". Use the source's native ratio to avoid cropping. */
export interface GalleryImage {
  src: string;
  alt: string;
  span: "full" | "half";
  ratio?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  role: string;
  /** Agency the work was made with; undefined = ARHAFEZ direct project */
  agency?: string;
  /** Full credit line per the Work Presentation System */
  credit: string;
  tags: string[];
  color: string;
  /** Work-grid thumbnail (4:3 crop). */
  heroImage?: string;
  /** Detail-page hero (full-bleed 16:9). Falls back to the color block if unset. */
  coverImage?: string;
  context: string;
  challenge: string;
  approach: string;
  made: string[];
  outcome: string;
  /** Rich case-study gallery with layout spans. Preferred over galleryImages. */
  gallery?: GalleryImage[];
  /** Legacy flat gallery (fallback when `gallery` is absent). */
  galleryImages: string[];
}

// TODO(assets): projects still WITHOUT imagery (heroImage/coverImage unset,
// gallery empty) fall back to solid brand-color blocks with the title overlaid.
// PLDG is fully wired below; SNB, Heli, Ghadi, and Ward still need their assets.
export const projects: Project[] = [
  {
    id: "pldg-development",
    title: "PLDG Development",
    subtitle: "A real-estate brand built to rebuild trust.",
    description: "Brand System",
    year: "2025",
    role: "ARHAFEZ",
    credit: "ARHAFEZ · PLDG Development · 2025",
    tags: ["BRAND SYSTEM", "REAL ESTATE"],
    color: "hsl(158, 22%, 22%)",
    heroImage: "/projects/pldg-development/card.jpg",
    coverImage: "/projects/pldg-development/cover.jpg",
    context:
      "A real-estate developer in Egypt — a market with a trust problem. Buyers have been promised homes that never arrived, and every new developer inherits that suspicion.",
    challenge:
      "PLDG didn't need a prettier logo. It needed to look like a company that keeps its word, before a single line was read.",
    approach:
      "Built on three ideas: clarity, reliability, commitment. Where most developers reach for soft, aspirational visuals, PLDG got the opposite — a structure where nothing is accidental. In a market running on broken promises, structure reads as trust.",
    made: [
      "Brand strategy & art direction",
      "Logo & full visual identity",
      "Editorial & layout system",
      "Brand guidelines",
    ],
    outcome:
      "Not a statistic — a fit. An identity that does the one thing its market demanded: it looks like a company that delivers.",
    gallery: [
      {
        src: "/projects/pldg-development/billboard-outdoor.jpg",
        alt: "PLDG billboard beside a residential development — “We deliver what we promise. Real homes. Real trust.”",
        span: "full",
      },
      {
        src: "/projects/pldg-development/logo-gradient.jpg",
        alt: "The PLDG Development wordmark on a graphite gradient.",
        span: "half",
      },
      {
        src: "/projects/pldg-development/brand-story.jpg",
        alt: "Signage telling the rebrand story — “PLEDGE becomes PLDG. Four letters. One promise.”",
        span: "half",
      },
      {
        src: "/projects/pldg-development/hoarding.jpg",
        alt: "Street-side site hoarding — “The Promise Lives Here.”",
        span: "full",
      },
      {
        src: "/projects/pldg-development/business-cards.jpg",
        alt: "The PLDG business-card system, front and back variants.",
        span: "half",
      },
      {
        src: "/projects/pldg-development/envelopes.jpg",
        alt: "PLDG branded envelopes in two sizes.",
        span: "half",
      },
      {
        src: "/projects/pldg-development/card-spotlight.jpg",
        alt: "A PLDG business card lit by a single spotlight on concrete.",
        span: "half",
      },
      {
        src: "/projects/pldg-development/shopping-bags.jpg",
        alt: "PLDG shopping bags showing the wordmark and the P monogram.",
        span: "half",
      },
      {
        src: "/projects/pldg-development/digital-web.jpg",
        alt: "PLDG digital presence — key message paired with the website interface.",
        span: "full",
      },
      {
        src: "/projects/pldg-development/social-1.jpg",
        alt: "PLDG social campaign — “The Promise Lives Here”, “Clarity We Keep”, “Detail. Care. Trust.”",
        span: "half",
      },
      {
        src: "/projects/pldg-development/social-2.jpg",
        alt: "PLDG social campaign — “Communities, Not Walls”, “Kept Without Fail”, “Live the Promise.”",
        span: "half",
      },
      {
        src: "/projects/pldg-development/stationery-folder.jpg",
        alt: "The PLDG presentation folder and letterhead.",
        span: "full",
      },
    ],
    galleryImages: [],
  },
  {
    id: "snb",
    title: "SNB",
    subtitle: "A tiered bank-card system that stays one premium brand.",
    description: "Product Design & Identity",
    year: "2024",
    role: "Brand Designer",
    agency: "Telfaz",
    credit: "Brand Designer · Telfaz · SNB · 2024",
    tags: ["PRODUCT DESIGN", "BANKING"],
    color: "hsl(216, 28%, 20%)",
    heroImage: "/projects/snb/card.jpg",
    coverImage: "/projects/snb/cover.jpg",
    context:
      "SNB, one of Saudi Arabia's largest banks: premium, corporate, high-trust. The brief — a tiered bank-card system.",
    challenge:
      "Span multiple tiers, yet read as one premium brand. Each tier distinct — without breaking the whole.",
    approach:
      "One card family, tiers set apart by restrained, premium cues rather than decoration. System over ornament, proven at the product level.",
    made: [
      "Card system: product design",
      "Card system: visual identity",
      "AI photoshoot creation",
    ],
    outcome:
      "A range that reads as one premium family — each tier distinct, the whole unmistakably SNB. Difference and consistency, held at once.",
    gallery: [
      {
        src: "/projects/snb/cards-presented.jpg",
        alt: "An SNB World card presented in hand — part of the tiered card family.",
        span: "full",
      },
      {
        src: "/projects/snb/card-cashback.jpg",
        alt: "The SNB CashBack card in SNB green with Mastercard.",
        span: "half",
      },
      {
        src: "/projects/snb/card-gold.jpg",
        alt: "The SNB Mennam Gold card — green and gold — held in hand.",
        span: "half",
      },
    ],
    galleryImages: [],
  },
  {
    id: "heli",
    title: "Heli",
    subtitle: "Precision and progress for industrial-construction tech.",
    description: "Brand Identity & Editorial",
    year: "2024",
    role: "Brand Designer",
    agency: "alpha studio",
    credit: "Brand Designer · alpha studio · Heli · 2024",
    tags: ["BRAND IDENTITY", "INDUSTRIAL TECH"],
    color: "hsl(203, 14%, 28%)",
    heroImage: "/projects/heli/card.jpg",
    coverImage: "/projects/heli/cover.jpg",
    context:
      "A technology company modernising construction and manufacturing through digital innovation.",
    challenge:
      "Feel precise, progressive, and modern — not heavy and traditional like the sectors it serves.",
    approach:
      "A visual language of precision and progress, with order standing in for engineering rigour.",
    made: ["Art direction", "Brand identity", "Visual identity", "Editorial & layout"],
    outcome:
      "HELI reads like the technology company it is, not the industry it serves. Structure doing the signalling.",
    gallery: [
      {
        src: "/projects/heli/folders-motif.jpg",
        alt: "Heli folders in black, marked with the glowing yellow pinwheel monogram.",
        span: "full",
      },
      {
        src: "/projects/heli/profile-why.jpg",
        alt: "Company-profile spread — “Why choose HELI for your construction and manufacturing needs?”",
        span: "half",
      },
      {
        src: "/projects/heli/profile-vision.jpg",
        alt: "Company-profile spread — vision and mission set over industrial photography.",
        span: "half",
      },
      {
        src: "/projects/heli/key-visual.jpg",
        alt: "Heli brand key visual — wordmark, pinwheel monogram, and “Industrial Digitalization”.",
        span: "full",
      },
      {
        src: "/projects/heli/notepad.jpg",
        alt: "Heli-branded notepad in black and volt yellow.",
        span: "half",
      },
      {
        src: "/projects/heli/folder.jpg",
        alt: "Black Heli document folder carrying the monogram.",
        span: "half",
      },
    ],
    galleryImages: [],
  },
  {
    id: "ghadi-real-estate",
    title: "Ghadi Real Estate",
    subtitle: "Modern luxury and architectural precision, as a system.",
    description: "Brand Identity",
    year: "2024",
    role: "Brand Designer",
    agency: "alpha studio",
    credit: "Brand Designer · alpha studio · Ghadi Real Estate · 2024",
    tags: ["BRAND IDENTITY", "REAL ESTATE"],
    color: "hsl(36, 22%, 28%)",
    heroImage: "/projects/ghadi/card.jpg",
    coverImage: "/projects/ghadi/cover.jpg",
    context:
      "Ghadi Real Estate needed a refined, premium presence across every touchpoint.",
    challenge:
      "Stand out in real estate without being generic or loud — modern luxury, architectural precision.",
    approach:
      "An identity where restraint, grid, and precision are the luxury signals. Structure reading as premium.",
    made: ["Logo", "Brand identity", "Visual identity system", "Editorial & layout"],
    outcome:
      "A presence that reads as quiet luxury — restraint doing the work that loud real-estate branding never could.",
    gallery: [
      {
        src: "/projects/ghadi/business-card.jpg",
        alt: "Ghadi business card in teal and cream, propped against concrete blocks.",
        span: "full",
      },
      {
        src: "/projects/ghadi/logo.jpg",
        alt: "The Ghadi (غدي العقارية) wordmark on petrol teal.",
        span: "half",
      },
      {
        src: "/projects/ghadi/stationery.jpg",
        alt: "Ghadi stationery system — letterhead and business-card layout.",
        span: "half",
      },
    ],
    galleryImages: [],
  },
  {
    id: "ward-production",
    title: "Ward Production",
    subtitle: "Cinematic energy on a disciplined system.",
    description: "Visual Identity",
    year: "2023",
    role: "ARHAFEZ",
    credit: "ARHAFEZ · Ward Production · 2023",
    tags: ["VISUAL IDENTITY", "FILM & TV"],
    color: "hsl(355, 28%, 24%)",
    heroImage: "/projects/ward/cover.jpg",
    coverImage: "/projects/ward/cover.jpg",
    context:
      "A production company turning imagination into film and television.",
    challenge:
      "An expressive, cinematic identity that still holds together as a system.",
    approach:
      "Cinematic energy on a disciplined base — proof the system flexes to expressive, media-driven brands.",
    made: ["Art direction", "Logo", "Brand identity", "Visual identity"],
    outcome:
      "An identity as expressive as its films, disciplined underneath.",
    gallery: [
      {
        src: "/projects/ward/logo-colors.jpg",
        alt: "The WARD mark across the brand palette — lime, lavender, emerald, and black.",
        span: "full",
      },
      {
        src: "/projects/ward/posters-street.jpg",
        alt: "WARD campaign posters on a street billboard — “Where imagination meets the screen”.",
        span: "half",
        ratio: "1401 / 1501",
      },
      {
        src: "/projects/ward/poster-moments.jpg",
        alt: "WARD poster — “Join us in crafting unforgettable television moments”.",
        span: "half",
        ratio: "1401 / 1501",
      },
      {
        src: "/projects/ward/logo-construction.jpg",
        alt: "The WARD logotype and its geometric construction — the disciplined base beneath the energy.",
        span: "full",
      },
      {
        src: "/projects/ward/lanyard.jpg",
        alt: "WARD event lanyard and ID badge in lime green.",
        span: "half",
        ratio: "1401 / 1501",
      },
      {
        src: "/projects/ward/browser.jpg",
        alt: "The WARD Production website interface in petrol teal.",
        span: "half",
        ratio: "1401 / 1501",
      },
    ],
    galleryImages: [],
  },
];

export const BOOKING_URL = "https://cal.com/arhafez"; // TODO: confirm Cal.com username
export const CONTACT_EMAIL = "hi@arhafez.com";

export const socials = {
  behance: "https://www.behance.net/arhafez",
  instagram: "https://www.instagram.com/arhafez_/",
  linkedin: "https://www.linkedin.com/in/arhafez/",
};
