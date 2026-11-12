import { statement } from "../../data/site.js";

export default function Statement() {
  return (
    <section className="statement" aria-label="Our standard">
      <div className="container statement-inner reveal">
        <p className="eyebrow">{statement.eyebrow}</p>
        <blockquote>“{statement.quote}”</blockquote>
        <p className="statement-attr">{statement.attribution}</p>
      </div>
    </section>
  );
}
