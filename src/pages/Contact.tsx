import { FormEvent, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CalInline } from "@/components/booking/CalInline";
import { CONTACT_EMAIL, socials } from "@/data/projects";

const fieldClass =
  "w-full bg-transparent border-b border-gray-600 focus:border-white outline-none text-white text-base py-3 placeholder:text-gray-500 transition-colors";

const labelClass =
  "eyebrow text-gray-400 block mb-1";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    building: "",
    goal: "",
    timeline: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  // Interim: composes an email until a form backend is wired up.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project brief — ${form.company || form.name || "new project"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Company: ${form.company}`,
        `What I'm building: ${form.building}`,
        `The goal: ${form.goal}`,
        `Timeline: ${form.timeline}`,
      ].join("\n")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout variant="dark">
      <section className="min-h-screen bg-black text-white pt-32 md:pt-40 pb-20">
        <div className="container">
          {/* Headline */}
          <p className="eyebrow text-gray-400 mb-10">Contact</p>
          <h1 className="hero-display text-white mb-8">
            Tell me what
            <br />
            you're <span className="hero-accent">building</span>.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-16">
            Send a brief and I'll come back with next steps — or just book a
            call.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
            {/* Left: the brief */}
            <div className="lg:col-span-7">
              <p className="eyebrow text-gray-400 mb-8">
                Send a brief
              </p>
              <form onSubmit={handleSubmit} className="space-y-8 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass} htmlFor="name">
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Full name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="company">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Company / brand"
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="building">
                    What you're building
                  </label>
                  <textarea
                    id="building"
                    value={form.building}
                    onChange={update("building")}
                    placeholder="A sentence or two"
                    rows={3}
                    className={`${fieldClass} resize-y`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass} htmlFor="goal">
                      The goal
                    </label>
                    <input
                      id="goal"
                      type="text"
                      value={form.goal}
                      onChange={update("goal")}
                      placeholder="What success looks like"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="timeline">
                      Timeline
                    </label>
                    <input
                      id="timeline"
                      type="text"
                      value={form.timeline}
                      onChange={update("timeline")}
                      placeholder="e.g. Q4, ~8 weeks"
                      className={fieldClass}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-200 transition-colors group"
                >
                  Send
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
                <p className="text-sm text-gray-400">
                  I reply within a couple of days.
                </p>
              </form>
            </div>

            {/* Right: direct + elsewhere */}
            <div className="lg:col-span-5 space-y-14">
              <div>
                <p className="eyebrow text-gray-400 mb-4">
                  Direct
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xl md:text-2xl font-medium text-white hover:text-gray-300 transition-colors inline-flex items-center gap-3 group"
                >
                  {CONTACT_EMAIL}
                  <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">→</span>
                </a>
              </div>

              <div>
                <p className="eyebrow text-gray-400 mb-4">
                  Elsewhere
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={socials.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    Behance
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">↗</span>
                  </a>
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    Instagram
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">↗</span>
                  </a>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    LinkedIn
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Book a call — inline calendar, full content width */}
          <div className="mt-24 md:mt-32 pt-16 border-t border-gray-800">
            <p className="eyebrow text-gray-400 mb-4">
              Prefer to talk?
            </p>
            <p className="text-base text-gray-400 max-w-sm mb-10">
              Book a time that suits you. Fifteen minutes, no pressure.
            </p>
            <CalInline />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
