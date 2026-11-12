import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CtaBand({ eyebrow, title, body, label, to }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <div className="reveal">
          <p className="eyebrow eyebrow--light">{eyebrow}</p>
          <h2 id="cta-title">{title}</h2>
          <p>{body}</p>
        </div>
        <Link className="btn btn--gold" to={to}>
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
