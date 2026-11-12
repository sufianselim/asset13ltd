import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { aboutPreview } from "../../data/site.js";

export default function AboutPreview() {
  return (
    <section className="section" id="about-preview">
      <div className="container split">
        <div className="split-copy reveal">
          <p className="eyebrow">{aboutPreview.eyebrow}</p>
          <h2 className="balance">{aboutPreview.title}</h2>
          <p className="lead">{aboutPreview.lead}</p>
          {aboutPreview.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="text-link" to={aboutPreview.linkTo}>
            {aboutPreview.linkLabel}
            <span aria-hidden="true">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        <figure className="framed reveal">
          <img
            src={aboutPreview.image}
            alt={aboutPreview.imageAlt}
            width="1600"
            height="1067"
            loading="lazy"
            decoding="async"
          />
          <figcaption>{aboutPreview.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
