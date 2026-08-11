import { Link } from "react-router-dom";
import { CONTACT_EMAIL, socials } from "@/data/projects";

const socialLinks = [
  {
    category: "For Work",
    links: [{ label: "Behance", href: socials.behance }],
  },
  {
    category: "For Updates",
    links: [{ label: "Instagram", href: socials.instagram }],
  },
  {
    category: "Network",
    links: [{ label: "LinkedIn", href: socials.linkedin }],
  },
];

export function Footer() {
  // Always dark — marked so the fixed header inverts over it on light pages.
  return (
    <footer data-nav-theme="dark" className="bg-black text-white">
      <div className="container py-16 md:py-20">
        {/* Connect — doubles as the compact closing prompt. The large
            "Let's find your system" CTA was removed (redundant with the
            floating Cal button + the Contact page's inline calendar). */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-[0.95] tracking-[-0.02em] mb-6">
            Let's connect.
          </h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-lg md:text-xl text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
          >
            {CONTACT_EMAIL}
            <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">→</span>
          </a>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {socialLinks.map((group) => (
            <div key={group.category}>
              <p className="eyebrow text-gray-400 mb-4">
                {group.category}
              </p>
              <div className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white hover:text-gray-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    {link.label}
                    <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-400">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Abdulrahman Hafez. All rights reserved.
          </p>
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Work
            </Link>
            <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
