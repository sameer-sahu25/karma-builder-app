import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { GithubIcon } from "./icons";

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="counter-wrap">
      <p className="text-3xl sm:text-4xl font-black tracking-tight text-emerald tabular-nums">
        {n.toLocaleString()}
      </p>
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export function GithubEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

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
      if (underlineRef.current) {
        gsap.fromTo(
          underlineRef.current,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll<HTMLElement>("[data-char]");
        if (chars.length) {
          gsap.fromTo(
            chars,
            { opacity: 0, y: 18, filter: "blur(6px)", rotateZ: -2 },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              rotateZ: 0,
              stagger: 0.025,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true,
              },
            },
          );
        }
      }

      if (countersRef.current.length) {
        gsap.fromTo(
          countersRef.current,
          { y: 28, opacity: 0, scale: 0.9, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 0.85,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );
      }

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  const registerCounter = (el: HTMLDivElement | null, idx: number) => {
    if (el) countersRef.current[idx] = el;
  };

  const headline1 = "Creative Engineering,";
  const headline2 = "now";
  const headline3 = "Open Source.";

  return (
    <section id="open-source" ref={sectionRef} className="py-20 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <Reveal kind="up">
          <TiltCard max={5} lift={14}>
            <div ref={cardRef} className="relative rounded-3xl border border-border bg-surface/80 backdrop-blur-md p-8 sm:p-12 overflow-hidden">
              <div
                ref={blobRef}
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald/10 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-emerald">
                    <GithubIcon className="w-6 h-6" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">Github Ecosystem</span>
                  </div>

                  <h2
                    ref={headlineRef}
                    className="mt-6 text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] relative inline-block"
                  >
                    <span className="inline-block">
                      {headline1.split("").map((ch, idx) => (
                        <span
                          key={`h1-${idx}`}
                          data-char
                          className="inline-block"
                        >
                          {ch === " " ? "\u00A0" : ch}
                        </span>
                      ))}
                    </span>
                    <br />
                    <span className="inline-block">
                      {headline2.split("").map((ch, idx) => (
                        <span
                          key={`h2-${idx}`}
                          data-char
                          className="inline-block"
                        >
                          {ch === " " ? "\u00A0" : ch}
                        </span>
                      ))}
                      {" "}
                      <span className="text-emerald inline-block relative">
                        {headline3.split("").map((ch, idx) => (
                          <span
                            key={`h3-${idx}`}
                            data-char
                            className="inline-block"
                          >
                            {ch === " " ? "\u00A0" : ch}
                          </span>
                        ))}
                        <svg
                          className="absolute -bottom-2 left-0 w-full h-2 text-emerald pointer-events-none"
                          viewBox="0 0 200 8"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <path
                            ref={underlineRef}
                            d="M 2 4 Q 50 1 100 4 T 198 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            pathLength={1}
                            style={{ strokeDasharray: "1 1", strokeDashoffset: 1 }}
                          />
                        </svg>
                      </span>
                    </span>
                  </h2>

                  <div className="mt-8 flex flex-wrap gap-10">
                    <div ref={(el) => registerCounter(el, 0)}>
                      <Counter value={1469} label="Total Contributions" />
                    </div>
                    <div ref={(el) => registerCounter(el, 1)}>
                      <Counter value={76} label="Followers" />
                    </div>
                    <div ref={(el) => registerCounter(el, 2)}>
                      <Counter value={58} label="Repositories" />
                    </div>
                    <div ref={(el) => registerCounter(el, 3)}>
                      <Counter value={12} label="Active Projects" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6">
                  <Magnetic strength={0.8}>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open GitHub profile"
                      className="w-14 h-14 rounded-full bg-invert text-invert-foreground grid place-items-center transition-transform hover:scale-110 active:scale-95"
                    >
                      <span aria-hidden="true" className="text-xl">
                        ↗
                      </span>
                    </a>
                  </Magnetic>
                  <p className="text-sm text-muted-foreground leading-relaxed lg:text-right max-w-xs">
                    A verified dashboard of technical milestones, total contributions, and real-time project activity.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>

      <div
        ref={curtainRef}
        className="absolute left-0 right-0 bottom-0 h-[120px] bg-background pointer-events-none z-10"
        aria-hidden="true"
      />
    </section>
  );
}
