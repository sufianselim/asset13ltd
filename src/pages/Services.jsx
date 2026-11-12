import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import CtaBand from "../components/ui/CtaBand.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import PageMeta from "../components/ui/PageMeta.jsx";
import { services, serviceProcess } from "../data/services.js";
import { servicesPage } from "../data/site.js";

export default function Services() {
  return (
    <>
      <PageMeta
        title="Services | Asset 13 LTD"
        description="Residential housing, real estate development, property investment, property management, and land solutions — delivered with one consistent standard of care by Asset 13 LTD."
        path="/services"
      />

      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        title={servicesPage.hero.title}
        intro={servicesPage.hero.intro}
      />

      <section className="section">
        <div className="container service-rows">
          {services.map((service) => (
            <article className="service-row" id={service.id} key={service.id}>
              <div className="service-row-media reveal">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  width="1400"
                  height="933"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                className="service-row-copy reveal"
                style={{ "--reveal-delay": "0.06s" }}
              >
                <span className="service-index">{service.index}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className="deliverables">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>
                      <Check size={15} aria-hidden="true" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
                <Link
                  className="text-link mt-7"
                  to={`/contact?project=${service.id}`}
                >
                  {service.ctaLabel}
                  <span aria-hidden="true">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section section--navy"
        aria-labelledby="process-title"
      >
        <div className="container">
          <div className="section-head section-head--light">
            <div>
              <p className="eyebrow eyebrow--light">{serviceProcess.eyebrow}</p>
              <h2 id="process-title">{serviceProcess.title}</h2>
            </div>
            <p className="section-intro">{serviceProcess.intro}</p>
          </div>

          <div className="process-grid">
            {serviceProcess.steps.map((step, index) => (
              <div
                className="process-step reveal"
                key={step.label}
                style={{ "--reveal-delay": `${index * 0.06}s` }}
              >
                <span>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand {...servicesPage.cta} />
    </>
  );
}
