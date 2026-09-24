import { useEffect } from "react";

/**
 * Adds `is-revealed` to every `.reveal` element as it scrolls into view.
 * Robust against SSR hydration ordering: uses MutationObserver to catch
 * nodes added after the first run, plus a 3s hard safety fallback that
 * forces all remaining `.reveal` visible even if IntersectionObserver
 * never fires (e.g. tab-in-background, SSR measurement quirks).
 */
export function useReveal() {
  useEffect(() => {
    const SAFETY_DELAY_MS = 3000;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mark = (node: Element) => {
      if (node instanceof HTMLElement && !node.classList.contains("is-revealed")) {
        node.classList.add("is-revealed");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            mark(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    const observed = new WeakSet<Element>();

    const observeAll = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
      for (const node of nodes) {
        if (observed.has(node)) continue;
        observed.add(node);
        const rect = node.getBoundingClientRect();
        const inView =
          rect.top <= window.innerHeight * 0.96 &&
          rect.bottom >= 0 &&
          rect.width > 0 &&
          rect.height > 0;
        if (inView || isReduced) {
          mark(node);
        } else {
          observer.observe(node);
        }
      }
    };

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.documentElement, { childList: true, subtree: true });

    const safetyId = window.setTimeout(() => {
      const remaining = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-revealed)"));
      remaining.forEach(mark);
    }, SAFETY_DELAY_MS);

    return () => {
      mo.disconnect();
      observer.disconnect();
      window.clearTimeout(safetyId);
    };
  }, []);
}
