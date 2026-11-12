import { ArrowRight, Check, Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProjectCard from "../components/project/ProjectCard.jsx";
import ProjectGallery from "../components/project/ProjectGallery.jsx";
import CtaBand from "../components/ui/CtaBand.jsx";
import PageMeta from "../components/ui/PageMeta.jsx";
import { getProject, getRelatedProjects } from "../data/projects.js";
import { siteConfig } from "../lib/config.js";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  const related = getRelatedProjects(project.slug);

  return (
    <>
      <PageMeta
        title={`${project.title} | Asset 13 LTD`}
        description={project.short}
        path={`/projects/${project.slug}`}
        image={project.cover}
        imageAlt={`${project.title} — ${project.coverAlt}`}
        type="article"
      />

      <section className="project-hero" aria-labelledby="project-title">
        <img
          className="project-hero-bg"
          src={project.cover}
          alt=""
          width="1600"
          height="1067"
          fetchPriority="high"
          decoding="async"
        />
        <div className="container project-hero-content">
          <p className="project-meta-line">
            <span>{project.status}</span>
            <span className="dot" aria-hidden="true" />
            <span>{project.location}</span>
            <span className="dot" aria-hidden="true" />
            <span>{project.isSample ? "Sample project" : project.type}</span>
          </p>
          <h1 id="project-title">{project.title}</h1>
          <p>{project.heroDescription}</p>
        </div>
      </section>

      <section className="section section--tight" aria-label="Project facts">
        <div className="container">
          <div className="project-facts">
            <div className="fact">
              <span className="fact-label">Status</span>
              <span className="fact-value">{project.status}</span>
            </div>
            <div className="fact">
              <span className="fact-label">Location</span>
              <span className="fact-value">{project.location}</span>
            </div>
            <div className="fact">
              <span className="fact-label">Project type</span>
              <span className="fact-value">{project.type}</span>
            </div>
            <div className="fact">
              <span className="fact-label">Completion</span>
              <span className="fact-value">{project.completion}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container project-layout">
          <div className="project-prose reveal">
            <h2>Overview</h2>
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h2>Design intent</h2>
            {project.designIntent.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h2>Key features</h2>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside className="enquiry-card reveal">
            <h2>Enquire about this project</h2>
            <p>
              Register your interest and we will share availability, plans, and
              pricing as soon as they are confirmed.
            </p>
            <Link
              className="btn btn--gold"
              to={`/contact?project=${project.slug}`}
            >
              Register interest
            </Link>
            <span className="enquiry-contact">
              or email{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>
            </span>
            <p className="sample-note">
              <Info size={15} aria-hidden="true" />
              Sample project — illustrative content for layout preview, not a
              completed development.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="gallery-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Gallery</p>
              <h2 id="gallery-title">A closer look</h2>
            </div>
            <p className="section-intro">
              Illustrative imagery selected to convey the intended character and
              quality of the project.
            </p>
          </div>
          <ProjectGallery images={project.gallery} title={project.title} />
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">More Projects</p>
              <h2 id="related-title">Related projects</h2>
            </div>
            <Link className="text-link" to="/projects">
              View all projects
              <span aria-hidden="true">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>

          <div className="related-grid">
            {related.map((relatedProject, index) => (
              <ProjectCard
                key={relatedProject.slug}
                project={relatedProject}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Register your interest"
        title={`Interested in ${project.title}?`}
        body="Tell us what you are looking for and we will keep you informed as plans, availability, and pricing are confirmed."
        label="Make an enquiry"
        to={`/contact?project=${project.slug}`}
      />
    </>
  );
}
