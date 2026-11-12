import { useEffect } from "react";

/**
 * Reveals elements with the `.reveal` class as they enter the viewport.
 * Re-runs whenever the route key changes so newly mounted pages animate.
 */
export default function useScrollReveal(key) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    if (!elements.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    const revealInViewport = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) return;

        const rect = element.getBoundingClientRect();
        const withinView =
          rect.top < viewportHeight * 1.05 && rect.bottom > -viewportHeight * 0.05;

        if (withinView) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      });
    };

    const timer = window.setTimeout(revealInViewport, 350);
    window.addEventListener("load", revealInViewport);
    window.addEventListener("hashchange", revealInViewport);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("load", revealInViewport);
      window.removeEventListener("hashchange", revealInViewport);
    };
  }, [key]);
}
