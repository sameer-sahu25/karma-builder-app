import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Magnetic } from "@/components/motion/Magnetic";
import { TiltCard } from "@/components/motion/TiltCard";
import { GithubIcon } from "./icons";

function ProjectVisual({ mark, stack }: { mark: string; stack: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 p-5 transition-colors group-hover:border-sky-400">
      <div className="absolute inset-0 grid-field opacity-60" aria-hidden="true" />
      <div className="relative flex min-h-36 flex-col justify-between">
        <span className="font-mono text-[10px] uppercase text-zinc-500">github.com / sameer-sahu25</span>
        <strong className="text-5xl font-black text-zinc-100">{mark}</strong>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((item) => <span key={item} className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-[9px] text-zinc-400">{item}</span>)}
        </div>
      </div>
    </div>
  );
}

type Project = {
  index: string;
  category: string;
  blurb: string;
  title: string;
  year: string;
  href: string;
  mark: string;
  stack: string[];
  hover: string;
};

const projects: Project[] = [
  {
    index: "01",
    category: "AI & Network Automation",
    blurb: "Network telemetry, PyATS diagnostics and LLM-powered remediation for safe, self-healing infrastructure.",
    title: "Cisco NetStage AI",
    year: "2026",
    href: "https://github.com/sameer-sahu25/cisco-netstage-ai-",
    mark: "CISCO / AI",
    stack: ["Python", "PyATS", "LLM", "Telemetry"],
    hover: "hover:text-sky-600",
  },
  {
    index: "02",
    category: "AI & Social Impact",
    blurb: "Housing stability and tenant support platform with personalized plans, risk profiling and court preparation.",
    title: "Stability AI",
    year: "2026",
    href: "https://github.com/sameer-sahu25/house-",
    mark: "HOME / AI",
    stack: ["Next.js", "Express", "MongoDB", "Gemini"],
    hover: "hover:text-emerald-600",
  },
  {
    index: "03",
    category: "Frontend Development",
    blurb: "A polished, responsive Jordan-inspired landing page focused on bold visuals and product storytelling.",
    title: "Jordan Landing Page",
    year: "2026",
    href: "https://github.com/sameer-sahu25/jordanlandingpage",
    mark: "JORDAN",
    stack: ["JavaScript", "Responsive UI", "Landing Page"],
    hover: "hover:text-sky-600",
  },
  {
    index: "04",
    category: "Full Stack Commerce",
    blurb: "Premium bakery experience with a product gallery, secure accounts, profiles and WhatsApp ordering.",
    title: "The Cake Company",
    year: "2026",
    href: "https://github.com/sameer-sahu25/FUTURE_FS_03",
    mark: "CAKE / CO.",
    stack: ["React", "Express", "PostgreSQL", "Cloudinary"],
    hover: "hover:text-orange-600",
  },
];

export function Projects() {
  const rootRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        cards.forEach((c) => {
          gsap.set(c, { clearProps: "all" });
        });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 60 });

      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  };

  return (
    <section ref={rootRef} id="projects" className="py-24 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center justify-between gap-4 reveal">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Selected Work / Case Studies
          </h2>
          <span className="font-mono text-xs text-subtle">2024 — 2026</span>
        </div>

        <div className="flex flex-col gap-12">
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={setCardRef(i)}
              className="w-full"
            >
              <TiltCard max={6} lift={18}>
                <article className="interactive-card bg-invert text-invert-foreground rounded-sm p-6 sm:p-10 shadow-2xl group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
                      <div>
                        <span className="font-mono text-sm font-bold tracking-widest">{p.index}</span>
                        <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mt-8 mb-4">
                          {p.category}
                        </p>
                      </div>
                      <p className="font-mono text-xs text-zinc-600 tracking-wide">
                        {p.blurb}
                      </p>
                    </div>

                    <div className="lg:col-span-4">
                      <ProjectVisual mark={p.mark} stack={p.stack} />
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between self-stretch text-left lg:text-right">
                      <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight uppercase leading-tight transition-colors ${p.hover}`}>
                        {p.title}
                      </h3>
                      <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end lg:space-x-8">
                        <span className="font-mono text-xs text-zinc-500">{p.year}</span>
                        <Magnetic strength={0.5}>
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-xs font-bold uppercase tracking-wider hover:opacity-70 transition border-b border-current pb-0.5 inline-block"
                          >
                            <GithubIcon className="mr-1.5 inline h-4 w-4" /> View Repository
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-4 items-center justify-between pt-6 border-t border-border reveal">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-xs tracking-widest text-subtle uppercase">Page</span>
            <div className="w-24 sm:w-40 h-[2px] bg-muted rounded-full overflow-hidden">
              <div className="w-3/5 h-full bg-foreground" />
            </div>
            <span className="font-mono text-xs font-bold tracking-wider">4 / 4</span>
          </div>
          <span className="text-xs font-mono text-subtle">Scroll to explore more ↓</span>
        </div>
      </div>
    </section>
  );
}
