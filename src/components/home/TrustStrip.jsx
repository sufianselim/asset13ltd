import { trustItems } from "../../data/site.js";

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Our approach">
      <div className="container trust-grid">
        {trustItems.map((item, index) => (
          <div
            className="trust-item reveal"
            key={item.number}
            style={{ "--reveal-delay": `${index * 0.08}s` }}
          >
            <span className="trust-num">{item.number}</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
