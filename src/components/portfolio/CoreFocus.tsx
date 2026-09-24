import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const corners = ["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];

export function CoreFocus() {
  const rootRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<SVGLineElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const quoteWordsRef = useRef<HTMLSpanElement[]>([]);
  const gridColsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (_) {
      // no-op
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            underlineRef.current,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" },
          );

          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          );

          gsap.fromTo(
            dotsRef.current,
            { opacity: 0, scale: 0.2 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              stagger: 0.08,
              ease: "back.out(1.6)",
            },
          );

          gsap.fromTo(
            quoteWordsRef.current,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: "power3.out",
            },
          );

          gsap.fromTo(
            gridColsRef.current,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
            },
          );
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="focus" className="relative px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <div
          ref={cardRef}
          className="relative tech-dots border border-border bg-background/60 p-8 md:p-14 rounded-sm interactive-card hover:border-border-strong"
        >
          {corners.map((pos, i) => (
            <span
              key={pos}
              ref={(el) => {
                if (el) dotsRef.current[i] = el;
              }}
              className={`absolute ${pos} w-2.5 h-2.5 bg-danger shadow-[0_0_8px_rgba(239,68,68,0.9)]`}
            />
          ))}

          <div className="flex flex-wrap gap-4 items-center justify-between border-b border-border pb-6 mb-10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-danger uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-danger animate-ping" />
                Core Focus
              </span>
              <svg width="120" height="6" viewBox="0 0 120 6" fill="none" aria-hidden="true">
                <line
                  ref={underlineRef}
                  x1="0"
                  y1="3"
                  x2="120"
                  y2="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-danger"
                  pathLength="1"
                  strokeDasharray="1 1"
                  strokeDashoffset="1"
                />
              </svg>
            </div>
            <span className="font-mono text-[11px] tracking-widest text-subtle uppercase">
              AI, Data &amp; Software Engineer
            </span>
          </div>

          <blockquote className="my-8 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15]">
            <span className="text-subtle font-mono text-4xl mr-2">"</span>
            <span className="hover:text-accent transition-colors">
              {["Applied", "AI."].map((w, i) => (
                <span
                  key={`w1-${i}`}
                  ref={(el) => {
                    if (el) quoteWordsRef.current.push(el);
                  }}
                  className="inline-block mr-2 last:mr-0"
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="text-muted-foreground hover:text-foreground transition-colors ml-2 sm:ml-3">
              {["Scalable", "Data."].map((w, i) => (
                <span
                  key={`w2-${i}`}
                  ref={(el) => {
                    if (el) quoteWordsRef.current.push(el);
                  }}
                  className="inline-block mr-2 last:mr-0"
                >
                  {w}
                </span>
              ))}
            </span>
            <br />
            <span className="italic font-normal text-muted-foreground hover:text-foreground transition-colors">
              {["robust", "software", "engineering"].map((w, i) => (
                <span
                  key={`w3-${i}`}
                  ref={(el) => {
                    if (el) quoteWordsRef.current.push(el);
                  }}
                  className="inline-block mr-2 last:mr-0"
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="text-subtle font-mono text-4xl">."</span>
          </blockquote>

          <div className="w-full h-px bg-border my-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              ref={(el) => {
                if (el) gridColsRef.current[0] = el;
              }}
            >
              <p className="text-base text-foreground/80 leading-relaxed">
                I build intelligent systems and the <span className="italic text-foreground">data infrastructure</span>{" "}
                that makes them reliable at scale.
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) gridColsRef.current[1] = el;
              }}
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                Scope &amp; Platform
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Focusing on predictive models, optimized data processing, and RAG pipelines designed for production
                environments and measurable performance.
              </p>
              <p className="mt-3 text-xs italic text-danger">Bridging labs and live systems.</p>
            </div>

            <div
              ref={(el) => {
                if (el) gridColsRef.current[2] = el;
              }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                  Integration
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Beyond models, I architect full-stack ecosystems: secure backends, robust data architectures, and
                  scalable pipelines.
                </p>
              </div>
              <p className="pt-6 font-signature text-3xl sm:text-4xl text-muted-foreground select-none hover:text-amber transition-colors duration-300">
                Sameer&nbsp;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
