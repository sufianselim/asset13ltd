import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import CtaBand from "../components/ui/CtaBand.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import PageMeta from "../components/ui/PageMeta.jsx";
import { aboutPage } from "../data/site.js";

export default function About() {
  const { hero, story, direction, values, commitment, cta } = aboutPage;

  return (
    <>
      <PageMeta
        title="About | Asset 13 LTD"
        description="Learn about Asset 13 LTD — a housing and real estate company built on integrity, considered design, disciplined delivery, and a long-term view of value."
        path="/about"
      />

      <PageHero
        eyebrow={hero.eyebrow}
        title={
          <>
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
          </>
        }
        intro={hero.intro}
      />

      <section className="section">
        <div className="container split">
          <div className="split-copy reveal">
            <p className="eyebrow">{story.eyebrow}</p>
            <h2 className="balance">{story.title}</h2>
            <p className="lead">{story.lead}</p>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure className="framed reveal">
            <img
              src={story.image}
              alt={story.imageAlt}
              width="1600"
              height="1067"
              loading="lazy"
              decoding="async"
            />
            <figcaption>{story.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--ivory" aria-labelledby="mission-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{direction.eyebrow}</p>
              <h2 id="mission-title">{direction.title}</h2>
            </div>
            <p className="section-intro">{direction.intro}</p>
          </div>

          <div className="mv-grid">
            <div className="mv-card reveal">
              <span className="mv-label">{direction.mission.label}</span>
              <h3>{direction.mission.title}</h3>
              <p>{direction.mission.body}</p>
            </div>
            <div
              className="mv-card reveal"
              style={{ "--reveal-delay": "0.08s" }}
            >
              <span className="mv-label">{direction.vision.label}</span>
              <h3>{direction.vision.title}</h3>
              <p>{direction.vision.body}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="values-title">
        <div className="container">
          <div className="section-head section-head--light">
            <div>
              <p className="eyebrow eyebrow--light">{values.eyebrow}</p>
              <h2 id="values-title">{values.title}</h2>
            </div>
            <p className="section-intro">{values.intro}</p>
          </div>

          <div className="values-grid">
            {values.items.map((item, index) => (
              <div
                className="value-item reveal"
                key={item.title}
                style={{ "--reveal-delay": `${index * 0.06}s` }}
              >
                <span className="value-num">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--reverse">
          <div className="split-media reveal">
            <figure className="framed">
              <img
                src={commitment.image}
                alt={commitment.imageAlt}
                width="1600"
                height="1067"
                loading="lazy"
                decoding="async"
              />
              <figcaption>{commitment.caption}</figcaption>
            </figure>
          </div>

          <div className="split-copy reveal">
            <p className="eyebrow">{commitment.eyebrow}</p>
            <h2 className="balance">{commitment.title}</h2>
            <p className="lead">{commitment.lead}</p>
            <p>{commitment.body}</p>
            <ul className="commitment-list">
              {commitment.items.map((item) => (
                <li key={item}>
                  <Check size={17} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="text-link" to="/contact" style={{ marginTop: "2rem" }}>
              {commitment.linkLabel}
              <span aria-hidden="true">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand {...cta} />
    </>
  );
}
