import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ScrollToTop from "./components/layout/ScrollToTop.jsx";
import useScrollReveal from "./hooks/useScrollReveal.js";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Projects from "./pages/Projects.jsx";
import Services from "./pages/Services.jsx";

export default function App() {
  const location = useLocation();
  useScrollReveal(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
