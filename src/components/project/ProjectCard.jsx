import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, delay = 0, hidden = false }) {
  return (
    <article
      className="project-card reveal"
      style={{ "--reveal-delay": `${delay}s` }}
      hidden={hidden}
    >
      <Link
        className="project-media"
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title}`}
      >
        <img
          src={project.cover}
          alt={project.coverAlt}
          width="1600"
          height="1067"
          loading="lazy"
          decoding="async"
        />
        <span className="project-badges">
          <span className="badge badge--status">{project.status}</span>
          {project.isSample && <span className="badge badge--sample">Sample</span>}
        </span>
        <span className="project-media-cta">
          View project
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </Link>
      <div className="project-body">
        <p className="project-loc">{project.location}</p>
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-excerpt">{project.short}</p>
      </div>
    </article>
  );
}
