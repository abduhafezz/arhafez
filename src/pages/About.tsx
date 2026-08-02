import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { PageClose } from "@/components/sections/PageClose";

/** How the practice thinks — positions, not process (the process lives on Services). */
const convictions = [
  {
    statement: "Strategy earns the right to design.",
    support:
      "Every visual decision should trace back to a business reason, or it's decoration.",
  },
  {
    statement: "A brand is infrastructure.",
    support:
      "Not a campaign. It has to carry weight long after the launch is over.",
  },
  {
    statement: "The real test is scale.",
    support:
      "Anything can look good once. The question is whether it holds across a hundred touchpoints.",
  },
];

const record = [
  { label: "Agencies", items: ["Telfaz", "alpha studio", "alep. studio", "AZ", "Gimix"] },
  { label: "Markets", items: ["Saudi Arabia", "Egypt", "UAE"] },
  {
    label: "Sectors",
    items: ["Banking", "Real estate", "Industrial tech", "Film & TV"],
  },
];

/**
 * Renders at the source's natural ratio — the award photo already carries its
 * own white margin, so any extra frame or tint would show as a panel around it.
 * Degrades to a labelled placeholder if the file isn't in place yet.
 */
function Figure({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-[4/5] flex items-end p-4">
        <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
          {alt} — image pending
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
      className="w-full h-auto"
    />
  );
}

const About = () => {
  return (
    <Layout variant="dark">
      <div className="bg-black">
        {/* ── Thesis ─────────────────────────────────────────────── */}
        <section className="pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="container">
            <p className="eyebrow text-gray-400 mb-10">
              The practice
            </p>
            <h1 className="hero-display text-white">
              Design is the last step,
              <br />
              not the <span className="hero-accent">first</span>.
            </h1>
          </div>
        </section>

        {/* ── Convictions ────────────────────────────────────────── */}
        <section className="pb-8 md:pb-12">
          <div className="container">
            <h2 className="eyebrow text-gray-400 pb-8 border-b border-gray-800">
              What the work is built on
            </h2>

            {convictions.map((c) => (
              <div
                key={c.statement}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 py-10 md:py-14 border-b border-gray-800"
              >
                <p className="lg:col-span-7 text-2xl md:text-4xl font-light text-white tracking-[-0.02em]">
                  {c.statement}
                </p>
                <p className="lg:col-span-5 lg:pt-3 text-base text-gray-400 max-w-sm">
                  {c.support}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The test ───────────────────────────────────────────── */}
        {/* Indented to read as the practice's own standard, quoted. */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-start-3 lg:col-span-10">
                <p className="eyebrow text-gray-400 mb-8">
                  Every decision passes one test
                </p>
                <p className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-[-0.02em] max-w-4xl">
                  Does this make the brand more of a{" "}
                  <span className="font-bold">system</span> — or more scattered?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── The record (light band) ────────────────────────────── */}
        <section data-nav-theme="light" className="bg-white py-20 md:py-28">
          <div className="container">
            <h2 className="eyebrow text-gray-500 pb-10 border-b border-gray-300">
              The record
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 pt-12 md:pt-16">
              {record.map((col) => (
                <div key={col.label}>
                  <h3 className="eyebrow text-gray-500 mb-5">
                    {col.label}
                  </h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="text-base text-black">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Recognition — the certificate sits on its own white ground,
                so it reads as an object rather than a pasted-in picture. */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mt-16 md:mt-24 pt-12 md:pt-16 border-t border-gray-300">
              <div className="lg:col-span-5">
                <Figure
                  src="/about/gridliners-award.jpg"
                  alt="Gridliners Design Awards 2024 — Gold Winner"
                />
              </div>
              <div className="lg:col-span-7">
                <h3 className="eyebrow text-gray-500 mb-6">
                  Recognition
                </h3>
                <p className="text-3xl md:text-5xl font-light text-black tracking-[-0.02em] mb-6">
                  Gold, <span className="font-bold">2024</span>.
                </p>
                {/* Category wording intentionally omitted until confirmed
                    against the certificate — see the note in the About brief. */}
                <p className="text-base text-gray-600 max-w-md">
                  Gridliners Design Awards 2024 — for Marine Majesty Galley.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Clients ────────────────────────────────────────────── */}
        <section data-nav-theme="light" className="bg-white pb-16 md:pb-20">
          <div className="container mb-10">
            <h2 className="eyebrow text-gray-500 pt-16 md:pt-20 border-t border-gray-300">
              Select clients
            </h2>
          </div>
          <ClientMarquee />
        </section>

        <PageClose
          label="Next"
          action="Tell me what you're building"
          to="/contact"
          tone="light"
        />
      </div>
    </Layout>
  );
};

export default About;
