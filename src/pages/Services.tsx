import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

/**
 * The four phases every engagement runs through. The page is built around
 * this sequence — deliverables appear *inside* a phase, as its consequence,
 * rather than as a standalone menu of services.
 */
const phases = [
  {
    n: "01",
    name: "Diagnose",
    body:
      "I learn the business first — where it's going, and what's holding the brand back. Nothing gets made on a guess.",
    leaveWith: ["Brand audit", "Strategic diagnosis", "Prioritised recommendations"],
  },
  {
    n: "02",
    name: "Position",
    body:
      "We settle what the brand stands for and how it says it. The part most brands skip — and why most brands drift.",
    leaveWith: ["Brand strategy", "Positioning & messaging", "Verbal identity"],
  },
  {
    n: "03",
    name: "Build",
    body:
      "Only now does it become visual. One system with a logic underneath, so later decisions already have an answer.",
    leaveWith: ["Brand identity", "Editorial & layout", "Art direction"],
  },
  {
    n: "04",
    name: "Hold",
    body:
      "A system is only worth what survives the handover. Documented so your team can run it — and I stay on to keep it coherent.",
    leaveWith: ["Brand guidelines", "Creative direction", "Ongoing stewardship"],
  },
];

const principles = [
  {
    title: "System before logo",
    body: "A logo is an output of the system, not a substitute for one.",
  },
  {
    title: "Strategy first, always",
    body: "Every visual decision traces back to a business reason.",
  },
  {
    title: "Built to endure",
    body: "Trends are disposable. A system compounds.",
  },
];

/** Individual engagements — a quiet index, subordinate to the process above. */
const engagements = [
  { name: "Brand Audit", note: "An honest read on where you stand" },
  { name: "The Brand System", note: "The full build, start to finish" },
  { name: "Brand Identity", note: "The complete visual system" },
  { name: "Brand Guidelines", note: "Consistency after the handover" },
  { name: "Rebranding", note: "For a brand that's been outgrown" },
  { name: "Art Direction", note: "One point of view, held throughout" },
  { name: "Editorial & Layout", note: "Dense information made navigable" },
  { name: "Creative Direction", note: "Ongoing, as you keep growing" },
];

const Services = () => {
  return (
    <Layout variant="light">
      <div className="bg-white">
        {/* ── Thesis ─────────────────────────────────────────────── */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="container">
            <p className="eyebrow text-gray-500 mb-10">
              Services
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <h1 className="lg:col-span-7 hero-display text-black">
                How a system
                <br />
                gets <span className="hero-accent">built</span>.
              </h1>
              <p className="lg:col-span-5 lg:pb-3 text-lg md:text-xl text-gray-600 max-w-md">
                Four phases, every time. Strategy first, design second — so the
                brand still works in five years.
              </p>
            </div>
          </div>
        </section>

        {/* ── The process (inverted band — the centrepiece) ───────── */}
        <section data-nav-theme="dark" className="bg-black text-white py-20 md:py-28">
          <div className="container">
            <div className="flex items-baseline justify-between gap-6 pb-10 md:pb-16 border-b border-gray-800">
              <h2 className="eyebrow text-gray-400">
                The process
              </h2>
              <p className="eyebrow text-gray-400">
                Four phases
              </p>
            </div>

            <ol className="list-none">
              {phases.map((phase) => (
                <li
                  key={phase.n}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16 border-b border-gray-800"
                >
                  {/* Numeral — the rhythm anchor */}
                  <div className="lg:col-span-2">
                    <span className="text-5xl md:text-6xl font-light text-gray-600 tabular-nums leading-none">
                      {phase.n}
                    </span>
                  </div>

                  {/* Phase name */}
                  <div className="lg:col-span-3">
                    <h3 className="text-3xl md:text-4xl font-medium tracking-[-0.02em] text-white">
                      {phase.name}
                    </h3>
                  </div>

                  {/* Body + what it produces */}
                  <div className="lg:col-span-7">
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                      {phase.body}
                    </p>
                    <div className="mt-8">
                      <p className="eyebrow text-gray-500 mb-3">
                        What you leave with
                      </p>
                      <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {phase.leaveWith.map((item) => (
                          <li key={item} className="text-base text-white">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Principles ─────────────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container">
            <h2 className="eyebrow text-gray-500 mb-12">
              How I work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {principles.map((p) => (
                <div key={p.title} className="border-t border-gray-300 pt-6">
                  <h3 className="text-xl md:text-2xl font-medium text-black tracking-[-0.01em] mb-3">
                    {p.title}
                  </h3>
                  <p className="text-base text-gray-600">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Engagements (quiet index) ──────────────────────────── */}
        <section className="pb-20 md:pb-28">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pb-8 border-b border-gray-300">
              <h2 className="eyebrow text-gray-500">
                Ways in
              </h2>
              <p className="text-base text-gray-600 max-w-lg md:text-right">
                Each one is an entry point into the same process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              {engagements.map((e) => (
                <div
                  key={e.name}
                  className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-8 py-5 border-b border-gray-200"
                >
                  <h3 className="text-lg font-medium text-black shrink-0">
                    {e.name}
                  </h3>
                  <p className="text-sm text-gray-500 sm:text-right">
                    {e.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Investment & close ─────────────────────────────────── */}
        <section className="pb-24 md:pb-32">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-4">
              <div className="lg:col-span-4">
                <h2 className="eyebrow text-gray-500">
                  Investment
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-2xl md:text-3xl font-light text-black tracking-[-0.01em] max-w-2xl mb-6">
                  Scoped and quoted for what it actually needs — priced on
                  value, not by the hour.
                </p>
                <p className="text-base text-gray-600 max-w-xl mb-10">
                  You'll get back scope, phases, and one number.
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-baseline gap-4 text-3xl md:text-5xl font-light text-black hover:text-gray-600 tracking-[-0.02em] transition-colors"
                >
                  Tell me what you're building
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;
