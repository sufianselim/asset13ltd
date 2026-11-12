export default function PageHero({ eyebrow, title, intro, className = "", id = "page-title" }) {
  return (
    <section
      className={`page-hero${className ? ` ${className}` : ""}`}
      aria-labelledby={id}
    >
      <div className="container page-hero-inner">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 id={id} className="balance">
          {title}
        </h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
