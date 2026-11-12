import { useState } from "react";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/project/ProjectCard.jsx";
import CtaBand from "../components/ui/CtaBand.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import PageMeta from "../components/ui/PageMeta.jsx";
import { projects } from "../data/projects.js";
import { projectsPage } from "../data/site.js";

const filters = [
  { key: "all", label: "All projects" },
  { key: "upcoming", label: "Upcoming" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" }
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.statusKey === filter
  );

  return (
    <>
      <PageMeta
        title="Our Projects | Asset 13 LTD"
        description="Explore housing and real estate projects by Asset 13 LTD — upcoming, ongoing, and completed residential developments."
        path="/projects"
      />

      <PageHero
        eyebrow={projectsPage.hero.eyebrow}
        title={projectsPage.hero.title}
        intro={projectsPage.hero.intro}
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Filter projects by status">
            {filters.map((item) => (
              <button
                className="filter-btn"
                key={item.key}
                type="button"
                aria-pressed={filter === item.key}
                onClick={() => setFilter(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={index * 0.08}
                hidden={filter !== "all" && project.statusKey !== filter}
              />
            ))}
          </div>

          <div className="empty-state" hidden={visibleProjects.length !== 0}>
            <h3>No projects in this category yet.</h3>
            <p>
              New and completed projects will be published here as they are
              confirmed. In the meantime, you are welcome to{" "}
              <Link className="text-link" to="/contact">
                ask us about current availability
              </Link>
              .
            </p>
          </div>

          <p className="project-note">
            <Info size={16} aria-hidden="true" />
            <span>
              Projects marked <strong>Sample</strong> are illustrative layout
              previews, not completed work. Real project details, locations, and
              photography will replace them once confirmed by Asset 13 LTD.
            </span>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Register your interest"
        title="Be the first to hear about new releases."
        body="Tell us the type of home or location you are considering, and we will share relevant project information as it becomes available."
        label="Register interest"
        to="/contact"
      />
    </>
  );
}
