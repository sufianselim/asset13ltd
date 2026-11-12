import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services.js";
import { servicesPreview } from "../../data/site.js";

export default function ServicesPreview() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container services-preview-grid">
        <div className="services-preview-head reveal">
          <p className="eyebrow">{servicesPreview.eyebrow}</p>
          <h2 id="services-title" className="balance">
            {servicesPreview.title}
          </h2>
          <p>{servicesPreview.body}</p>
          <Link className="btn btn--outline" to={servicesPreview.linkTo}>
            {servicesPreview.linkLabel}
          </Link>
        </div>

        <ul className="service-list">
          {services.map((service, index) => (
            <li
              className="reveal"
              key={service.id}
              style={{ "--reveal-delay": `${index * 0.06}s` }}
            >
              <Link to={`/services#${service.id}`}>
                <span className="service-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-name">{service.title}</span>
                <span className="service-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
