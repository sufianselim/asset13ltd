import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects.js";
import ProjectCard from "../project/ProjectCard.jsx";

export default function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section className="section section--ivory" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">02 — Selected Work</p>
            <h2 id="featured-title">Featured projects</h2>
          </div>
          <Link className="text-link" to="/projects">
            View all projects
            <span aria-hidden="true">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        <div className="project-grid">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
