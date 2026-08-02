import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const links = [
  { label: "Work", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  return (
    <Layout variant="dark">
      <section className="min-h-screen bg-black text-white flex items-center pt-32 pb-20">
        <div className="container">
          <p className="eyebrow text-gray-400 mb-6">Error 404</p>
          <h1 className="hero-display mb-8">
            This page isn't part
            <br />
            of the <span className="hero-accent">system</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-12">
            The page you're looking for doesn't exist or has moved. Here's the
            way back.
          </p>
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Site">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-lg text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
              >
                {link.label}
                <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">
                  →
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
