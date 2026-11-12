import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta.jsx";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page not found | Asset 13 LTD"
        description="The page you were looking for could not be found. Return to Asset 13 LTD or explore our projects."
        path="/404"
        noindex
      />

      <section className="error-page" aria-labelledby="error-title">
        <div className="container error-page-inner">
          <span className="error-code" aria-hidden="true">
            404
          </span>
          <p className="eyebrow eyebrow--light">Page not found</p>
          <h1 id="error-title">This page has moved, or never existed.</h1>
          <p>
            The address you followed may be outdated or mistyped. Return to the
            homepage, or explore our projects and services.
          </p>
          <div className="error-actions">
            <Link className="btn btn--gold" to="/">
              Back to home
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link className="btn btn--outline-light" to="/projects">
              View projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
