import AboutPreview from "../components/home/AboutPreview.jsx";
import FeaturedProjects from "../components/home/FeaturedProjects.jsx";
import Hero from "../components/home/Hero.jsx";
import ServicesPreview from "../components/home/ServicesPreview.jsx";
import Statement from "../components/home/Statement.jsx";
import TrustStrip from "../components/home/TrustStrip.jsx";
import WhyChoose from "../components/home/WhyChoose.jsx";
import CtaBand from "../components/ui/CtaBand.jsx";
import PageMeta from "../components/ui/PageMeta.jsx";
import { homeCta } from "../data/site.js";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Asset 13 LTD | Housing & Real Estate"
        description="Asset 13 LTD is a housing and real estate company creating considered homes and residential developments — designed for modern living and built to endure."
        path="/"
      />
      <Hero />
      <TrustStrip />
      <AboutPreview />
      <FeaturedProjects />
      <WhyChoose />
      <ServicesPreview />
      <Statement />
      <CtaBand {...homeCta} />
    </>
  );
}
