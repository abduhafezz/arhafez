import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { PageClose } from "@/components/sections/PageClose";

const Index = () => {
  return (
    <Layout variant="dark">
      <div className="bg-black min-h-screen">
        <HeroSection />
        <ProjectGrid />

        {/* Trust band — the clients behind the work, just before the closing CTA.
            Mirrors the About page's client marquee for a consistent system;
            inverted to white logos to sit on the homepage's dark theme. */}
        <section className="py-16 md:py-20 border-t border-gray-800">
          <div className="container mb-10">
            <h2 className="eyebrow text-gray-400">Select clients</h2>
          </div>
          <ClientMarquee onDark />
        </section>

        {/* Hands the reader on to the method — the floating booking button and
            the footer carry the direct enquiry paths. */}
        <PageClose
          label="How I work"
          action="See how a system gets built"
          to="/services"
          tone="dark"
        />
      </div>
    </Layout>
  );
};

export default Index;