import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-media"
        src="/images/hero.jpg"
        alt="Contemporary residence at dusk with warm interior lighting and a landscaped entrance"
        width="2000"
        height="1333"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-content reveal">
          <p className="eyebrow eyebrow--light">Housing &amp; Real Estate</p>
          <h1 id="hero-title">
            Building Better Living, <br />
            <em>Creating Lasting Value.</em>
          </h1>
          <p className="hero-sub">
            Asset 13 LTD creates considered homes and residential developments —
            designed for modern life, delivered with care, and built to endure.
          </p>
          <div className="hero-actions">
            <Link className="btn btn--gold" to="/projects">
              Explore Our Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="hero-foot">
          <span>Asset 13 LTD — Housing &amp; Real Estate</span>
          <a className="scroll-cue" href="#about-preview">
            <span className="scroll-line" aria-hidden="true" />
            Scroll
          </a>
        </div>
      </div>
    </section>
  );
}
