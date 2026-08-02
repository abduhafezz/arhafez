import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CalFloatingButton } from "@/components/booking/CalFloatingButton";
import Index from "@/pages/Index";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ProjectDetail from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";

const App = () => (
  <>
    {/* Site-wide booking action, rendered outside the router so it persists
        across navigation. */}
    <CalFloatingButton />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        {/* Catch-all — keep last. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
