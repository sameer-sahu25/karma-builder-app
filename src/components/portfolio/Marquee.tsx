import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TECH =
  "PYTORCH • PANDAS • TYPESCRIPT • NODE.JS • SCIKIT-LEARN • TENSORFLOW • SQL • NEXT.JS • PYTHON • DOCKER • ";
const ROLES =
  "AI ENGINEER • DATA SCIENTIST • DATA ANALYST • MACHINE LEARNING ENGINEER • BACKEND DEVELOPER • FULL STACK ENGINEER • NLP ENGINEER • DATA ENGINEER • WEB DEVELOPER • ";

export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const topTrackRef = useRef<HTMLDivElement>(null);
  const midTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const ctx = gsap.context(() => {
      const tracks = [topTrackRef.current, midTrackRef.current].filter(
        (el): el is HTMLDivElement => el !== null,
      );

      if (tracks.length) {
        gsap.fromTo(
          tracks,
          { opacity: 0, filter: "blur(12px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden select-none" aria-hidden="true">
      <div className="relative w-full h-44 flex items-center justify-center">
        <div className="absolute w-[120vw] -left-[10vw] -rotate-[3.5deg] z-10 bg-surface/90 border-y border-border-strong py-3 overflow-hidden backdrop-blur-sm">
          <div
            ref={topTrackRef}
            className="animate-marquee-left flex whitespace-nowrap text-xs md:text-sm font-mono font-bold tracking-[0.25em] text-muted-foreground uppercase"
            style={{ willChange: "transform" }}
          >
            <span className="px-4">{TECH.repeat(2)}</span>
            <span className="px-4">{TECH.repeat(2)}</span>
          </div>
        </div>
        <div className="absolute w-[120vw] -left-[10vw] rotate-[3.5deg] z-20 bg-background border-y-2 border-foreground py-3.5 overflow-hidden shadow-2xl">
          <div
            ref={midTrackRef}
            className="animate-marquee-right flex whitespace-nowrap text-xs md:text-sm font-mono font-black tracking-[0.25em] uppercase"
            style={{ willChange: "transform" }}
          >
            <span className="px-4">{ROLES}</span>
            <span className="px-4">{ROLES}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
