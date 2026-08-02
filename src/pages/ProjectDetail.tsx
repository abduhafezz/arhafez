import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { projects, GalleryImage } from "@/data/projects";

const caseSections = (p: (typeof projects)[number]) => [
  { label: "Context", body: p.context },
  { label: "Challenge", body: p.challenge },
  { label: "Approach", body: p.approach },
];

// Group the gallery into rows: consecutive "half" items pair into a 2-up row;
// "full" items (and a lone trailing "half") occupy their own row.
function toGalleryRows(gallery: GalleryImage[]): GalleryImage[][] {
  const rows: GalleryImage[][] = [];
  for (let i = 0; i < gallery.length; ) {
    const item = gallery[i];
    if (item.span === "half" && gallery[i + 1]?.span === "half") {
      rows.push([item, gallery[i + 1]]);
      i += 2;
    } else {
      rows.push([item]);
      i += 1;
    }
  }
  return rows;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Layout variant="dark">
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-white mb-4">Project not found</h1>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to work
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <Layout variant="dark">
      <div className="bg-black min-h-screen">
        {/* Hero block — full-bleed cover image (falls back to a color block). */}
        <section className="pt-24 lg:pt-32">
          <div className="w-full">
            <div
              className="w-full aspect-[16/9] overflow-hidden"
              style={{ backgroundColor: project.color }}
            >
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={`${project.title} — ${project.subtitle}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  // @ts-expect-error — React 18 types lack fetchpriority; the
                  // lowercase form is what the DOM expects (camelCase warns).
                  fetchpriority="high"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/20 text-4xl md:text-7xl font-bold uppercase tracking-tight px-6 text-center">
                    {project.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Metadata Section */}
        <section className="container py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Title & Subtitle */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-[-0.02em] mb-4">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-400">
                {project.subtitle}
              </p>
            </div>

            {/* Right: Credit + Services */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="eyebrow text-gray-400 mb-2">
                  Credit
                </p>
                <p className="text-sm text-white tracking-wide leading-relaxed">
                  {project.credit}
                </p>
              </div>
              <div>
                <p className="eyebrow text-gray-400 mb-3">
                  Services
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-widest text-gray-400 border border-gray-700 px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container">
          <div className="w-full h-px bg-gray-800" />
        </div>

        {/* Case study sections */}
        <section className="container py-12 lg:py-16 space-y-12 lg:space-y-16">
          {caseSections(project).map((s) => (
            <div key={s.label} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12">
              <div className="lg:col-span-3">
                <h2 className="eyebrow text-gray-400">
                  {s.label}
                </h2>
              </div>
              <div className="lg:col-span-9">
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  {s.body}
                </p>
              </div>
            </div>
          ))}

          {/* What I made */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 className="eyebrow text-gray-400">
                What I made
              </h2>
            </div>
            <div className="lg:col-span-9">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 max-w-2xl">
                {project.made.map((item) => (
                  <li
                    key={item}
                    className="text-base text-gray-300 py-3 border-b border-gray-800"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Outcome */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 className="eyebrow text-gray-400">
                Outcome
              </h2>
            </div>
            <div className="lg:col-span-9">
              <p className="text-lg md:text-xl text-white max-w-2xl">
                {project.outcome}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery — full-bleed moments alternating with 2-up paired rows.
            All sources are 16:9, so object-cover reframes without cropping;
            the color block reserves space (no layout shift) while lazy images load. */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="container pb-20 lg:pb-32 space-y-6 md:space-y-8">
            {toGalleryRows(project.gallery).map((row, ri) => (
              <div
                key={ri}
                className={
                  row.length === 2
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                    : ""
                }
              >
                {row.map((img) => (
                  <div
                    key={img.src}
                    className="w-full overflow-hidden"
                    style={{ backgroundColor: project.color }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover"
                      style={{ aspectRatio: img.ratio ?? "16 / 9" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ))}
          </section>
        )}

        {/* CTA + navigation */}
        <div className="container">
          <div className="w-full h-px bg-gray-800" />
        </div>
        <section className="container py-16 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div>
              <p className="eyebrow text-gray-400 mb-4">
                Have an ambitious project?
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-baseline gap-3 text-2xl md:text-3xl font-light text-white hover:text-gray-300 tracking-[-0.02em] transition-colors"
              >
                Tell me what you're building
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
            <Link to={`/project/${next.id}`} className="group text-left md:text-right">
              <p className="eyebrow text-gray-400 mb-2">
                Next project
              </p>
              <p className="text-2xl md:text-3xl font-medium text-white group-hover:text-gray-300 transition-colors">
                {next.title}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </p>
            </Link>
          </div>
          <div className="mt-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              Back to work
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
