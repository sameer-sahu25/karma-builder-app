import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Pill = { name: string; mark: React.ReactNode };

const rowOne: Pill[] = [
  {
    name: "Scikit-learn",
    mark: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
        <circle cx="9" cy="12" r="5" className="fill-amber" opacity="0.8" />
        <circle cx="15" cy="12" r="4" className="fill-accent" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "LangChain",
    mark: (
      <span className="w-6 h-6 rounded-full border-2 border-emerald flex items-center justify-center text-xs">🦜</span>
    ),
  },
  {
    name: "PyTorch",
    mark: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber" fill="currentColor" aria-hidden="true">
        <path d="M13.5 2.5a.75.75 0 0 0-1.2 0l-5 6.5A.75.75 0 0 0 8 10h8a.75.75 0 0 0 .7-.98l-3.2-6.52zM12 11.5a5.5 5.5 0 1 0 5.5 5.5.75.75 0 0 0-1.5 0 4 4 0 1 1-4-4 .75.75 0 0 0 0-1.5z" />
      </svg>
    ),
  },
  {
    name: "OpenCV",
    mark: (
      <span className="flex space-x-0.5">
        <span className="w-2.5 h-2.5 rounded-full bg-danger inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald inline-block" />
        <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
      </span>
    ),
  },
  {
    name: "Python",
    mark: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-accent" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    mark: (
      <span className="bg-accent text-accent-foreground text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">TS</span>
    ),
  },
];

const rowTwo: Pill[] = [
  { name: "Linux", mark: <span className="text-lg">🐧</span> },
  {
    name: "Postman",
    mark: (
      <span className="w-5 h-5 rounded-full bg-amber text-invert-foreground font-black text-[10px] flex items-center justify-center">
        P
      </span>
    ),
  },
  {
    name: "VS Code",
    mark: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-accent" fill="currentColor" aria-hidden="true">
        <path d="M17.5 2.5L7.2 11l10.3 8.5L22 17.2V4.8L17.5 2.5zM2 9.5l3.8 2.5L2 14.5V9.5z" />
      </svg>
    ),
  },
  { name: "Jupyter", mark: <span className="w-4 h-4 rounded-full border-2 border-amber inline-block" /> },
  {
    name: "Google Colab",
    mark: (
      <span className="w-5 h-5 rounded-full bg-amber/20 text-amber text-[10px] flex items-center justify-center font-bold">
        CO
      </span>
    ),
  },
  {
    name: "Figma",
    mark: (
      <span className="grid grid-cols-2 gap-0.5 w-4 h-5">
        <span className="bg-danger rounded-l-full" />
        <span className="bg-amber rounded-r-full" />
        <span className="bg-accent rounded-l-full" />
        <span className="bg-emerald rounded-full" />
      </span>
    ),
  },
];

function PillRow({
  pills,
  className,
  direction = "left",
  duration = 40,
  pillRefs,
  rowIndex,
}: {
  pills: Pill[];
  className?: string;
  direction?: "left" | "right";
  duration?: number;
  pillRefs: React.MutableRefObject<HTMLDivElement[]>;
  rowIndex: number;
}) {
  const loop = [...pills, ...pills];

  return (
    <div className={`tech-marquee overflow-hidden ${className ?? ""}`}>
      <div
        className="tech-marquee-track flex items-center gap-4 w-max"
        style={{
          animationName: direction === "left" ? "tech-loop-left" : "tech-loop-right",
          animationDuration: `${duration}s`,
        }}
      >
        {loop.map((pill, i) => (
          <div
            key={`${pill.name}-${i}`}
            ref={(el) => {
              if (el) {
                const idx = rowIndex * 100 + i;
                pillRefs.current[idx] = el;
              }
            }}
            className="shrink-0 select-none flex items-center space-x-2.5 p-2 rounded-xl bg-surface-2/70 border border-border hover:border-border-strong transition-colors duration-300"
          >
            {pill.mark}
            <span className="text-sm font-semibold tracking-tight text-foreground/85 whitespace-nowrap">
              {pill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pillRefs = useRef<HTMLDivElement[]>([]);
  const titleLineRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const allPills = pillRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduced) {
        gsap.set(allPills, { opacity: 0, y: 20, filter: "blur(6px)" });

        ScrollTrigger.create({
          trigger: root,
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.to(allPills, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              stagger: 0.04,
              duration: 0.6,
              ease: "power3.out",
            });
          },
        });

        const titleLine = titleLineRef.current;
        if (titleLine) {
          const pathLength = titleLine.getTotalLength?.() ?? 300;
          gsap.set(titleLine, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
          ScrollTrigger.create({
            trigger: root,
            start: "top 75%",
            once: true,
            onEnter: () => {
              gsap.to(titleLine, {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: "power3.inOut",
              });
            },
          });
        }
      }
    }, root);

    allPills.forEach((pill) => {
      const handleEnter = () => {
        gsap.to(pill, {
          rotateZ: 15,
          scale: 1.06,
          y: -4,
          duration: 0.35,
          ease: "back.out(2)",
        });
      };
      const handleLeave = () => {
        gsap.to(pill, {
          rotateZ: 0,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      };
      pill.addEventListener("mouseenter", handleEnter);
      pill.addEventListener("mouseleave", handleLeave);

      ctx.add(() => {
        pill.removeEventListener("mouseenter", handleEnter);
        pill.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="tech-stack" className="py-20 px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-snug reveal inline-block">
              Architecting Scalable Systems
              <br />
              Where Intelligence Meets Engineering.
            </h2>
            <svg className="mt-2 w-full max-w-md" viewBox="0 0 400 6" fill="none" aria-hidden="true">
              <path
                ref={titleLineRef}
                d="M2 3 L398 3"
                stroke="url(#techTitleGradient)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="techTitleGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                  <stop offset="20%" stopColor="rgb(251 191 36)" />
                  <stop offset="80%" stopColor="rgb(56 189 248)" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p
            className="lg:col-span-5 text-xs sm:text-sm text-muted-foreground leading-relaxed reveal"
            style={{ "--delay": "0.15s" } as React.CSSProperties}
          >
            As an Information Technology student specializing in Artificial Intelligence and Software Engineering, I
            focus on building systems that bridge research foundations with production-ready implementation. My work
            combines algorithmic thinking, backend engineering, and scalable architecture to deliver solutions that are
            intelligent, reliable, and built for real-world impact.
          </p>
        </div>

        <div className="mb-10 flex items-center justify-between gap-4">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Tech Stack &amp; Ecosystem
          </span>
          <span className="font-mono text-[10px] text-subtle uppercase hidden sm:inline">
            ✦ Hover to pause the loop ✦
          </span>
        </div>

        <PillRow pills={rowOne} className="py-4" direction="left" duration={32} pillRefs={pillRefs} rowIndex={0} />
        <PillRow
          pills={rowTwo}
          className="pt-6 mt-6 border-t border-border"
          direction="right"
          duration={38}
          pillRefs={pillRefs}
          rowIndex={1}
        />
      </div>
    </section>
  );
}
