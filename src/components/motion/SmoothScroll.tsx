import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;
let gsapRegistered = false;

export function getLenis() {
  return lenisInstance;
}

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!gsapRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      gsapRegistered = true;
    }

    ScrollTrigger.defaults({
      toggleActions: reduced ? "play none none none" : "play none none reverse",
    });

    const lenis = new Lenis({
      duration: reduced ? 0.01 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      touchMultiplier: reduced ? 1 : 1.6,
    });
    lenisInstance = lenis;

    const rafTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafTicker);
    gsap.ticker.lagSmoothing(reduced ? 500 : 1000, 16);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshId = window.setTimeout(refresh, 250);
    const refreshLateId = window.setTimeout(refresh, 3000);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    const onAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.4 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshId);
      window.clearTimeout(refreshLateId);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafTicker);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
