import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cube3D, type CubeFace } from "./Cube3D";

type Tone = "accent" | "amber" | "danger";

type Discipline = {
  title: [string, string];
  body: string;
  tags: string[];
  tone: Tone;
  faces: CubeFace[];
};

const disciplines: Discipline[] = [
  {
    title: ["INTELLIGENT", "SYSTEMS"],
    body: "Specializing in architecting intelligent systems and intelligence-driven platforms. From fine-tuning models and engineering RAG architectures to developing deep learning models for Computer Vision and NLP.",
    tags: ["LLM Fine-Tuning", "RAG Systems", "Deep Learning", "MLOps", "Data Analytics"],
    tone: "accent",
    faces: [
      { label: "AI", from: "#b91c1c", to: "#3f1010", icon: "brain" },
      { label: "DATA", from: "#15803d", to: "#052e16", icon: "database" },
      { label: "ML", from: "#0e7490", to: "#062c33", icon: "chart" },
      { label: "NLP", from: "#4338ca", to: "#141453", icon: "layers" },
      { label: "VISION", from: "#7e22ce", to: "#2a0b45", icon: "target" },
      { label: "MLOPS", from: "#0f172a", to: "#020617", icon: "shield" },
    ],
  },
  {
    title: ["SCALABLE", "SYSTEMS"],
    body: "Building the foundation for resilient digital ecosystems. I engineer full-stack solutions with a focus on system architecture, modular design, and high-performance backends using Go, Next.js, and Python.",
    tags: ["System Architecture", "Full-Stack Dev", "Docker & K8s", "API Design", "DevOps"],
    tone: "amber",
    faces: [
      { label: "CODE", from: "#ca8a04", to: "#3f2d02", icon: "code" },
      { label: "ARCH", from: "#b91c1c", to: "#3f1010", icon: "layers" },
      { label: "SECURE", from: "#6d28d9", to: "#25084f", icon: "shield" },
      { label: "SCALE", from: "#0369a1", to: "#052a42", icon: "chart" },
      { label: "OPS", from: "#0f766e", to: "#042f2b", icon: "database" },
      { label: "BUILD", from: "#111827", to: "#030712", icon: "code" },
    ],
  },
  {
    title: ["STRATEGIC", "INNOVATION"],
    body: "Translating complex technical requirements into impactful business solutions through systemic thinking, strategic leadership, and clear communication within cross-functional teams.",
    tags: ["Systemic Thinking", "Leadership", "Problem Solving", "Teamwork", "Communication", "Research"],
    tone: "danger",
    faces: [
      { label: "GOAL", from: "#dc2626", to: "#450a0a", icon: "target" },
      { label: "TEAM", from: "#1d4ed8", to: "#0b1f4d", icon: "users" },
      { label: "IDEA", from: "#d97706", to: "#3a2003", icon: "bulb" },
      { label: "LEAD", from: "#9333ea", to: "#2e0a4f", icon: "users" },
      { label: "GROWTH", from: "#047857", to: "#032b20", icon: "chart" },
      { label: "PLAN", from: "#0f172a", to: "#020617", icon: "layers" },
    ],
  },
];

const toneTitle: Record<Tone, string> = {
  accent: "hover:text-accent",
  amber: "hover:text-amber",
  danger: "hover:text-danger",
};

const toneTag: Record<Tone, string> = {
  accent: "hover:border-accent",
  amber: "hover:border-amber",
  danger: "hover:border-danger",
};

type CubeRefs = {
  cube: React.MutableRefObject<HTMLDivElement | null>;
  row: React.MutableRefObject<HTMLDivElement | null>;
  titleWords: React.MutableRefObject<HTMLSpanElement[]>;
  tags: React.MutableRefObject<HTMLSpanElement[]>;
};

export function Disciplines() {
  const rootRef = useRef<HTMLElement>(null);
  const cubeRefs = useRef<CubeRefs[]>(
    disciplines.map(() => ({
      cube: { current: null },
      row: { current: null },
      titleWords: { current: [] },
      tags: { current: [] },
    })),
  );

  const assignCubeRef = (i: number) => (el: HTMLDivElement | null) => {
    const refs = cubeRefs.current[i];
    if (refs) refs.cube.current = el;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (_) {
      // no-op
    }

    const ctx = gsap.context(() => {
      cubeRefs.current.forEach((refs) => {
        if (refs.cube.current) {
          gsap.set(refs.cube.current, {
            rotateX: -6,
            rotateY: -12,
            translateZ: 20,
            transformStyle: "preserve-3d",
          });
        }
      });

      cubeRefs.current.forEach((refs, i) => {
        ScrollTrigger.create({
          trigger: refs.row.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              refs.row.current,
              { opacity: 0, y: 36 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            );

            gsap.fromTo(
              refs.titleWords.current,
              { opacity: 0, y: 16 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.04,
                ease: "power3.out",
              },
            );

            gsap.fromTo(
              refs.tags.current,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.4)",
              },
            );

            gsap.fromTo(
              refs.cube.current,
              { rotateY: -12 + i * 8, rotateX: -6, scale: 0.9 },
              {
                rotateY: -8,
                rotateX: -6,
                scale: 1,
                duration: 1,
                ease: "power3.out",
              },
            );
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative px-6 md:px-12 lg:px-20 py-24 bg-background/80"
    >
      <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
        {disciplines.map((d, i) => {
          const cubeFirst = i % 2 === 0;
          const refs = cubeRefs.current[i];
          return (
            <div
              key={d.title.join(" ")}
              ref={(el) => {
                if (refs) refs.row.current = el;
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div
                className={`lg:col-span-6 flex justify-center py-10 ${cubeFirst ? "order-2 lg:order-1" : "order-2"}`}
              >
                <Cube3D ref={assignCubeRef(i)} faces={d.faces} />
              </div>

              <div className={`lg:col-span-6 ${cubeFirst ? "order-1 lg:order-2" : "order-1"}`}>
                <h2
                  className={`text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-6 transition-colors ${toneTitle[d.tone]}`}
                >
                  {d.title.map((line, lineIdx) => (
                    <span key={lineIdx} className="block">
                      {line.split(/\s+/).map((w, wIdx) => (
                        <span
                          key={`${lineIdx}-${wIdx}`}
                          ref={(el) => {
                            if (el && refs) refs.titleWords.current.push(el);
                          }}
                          className="inline-block mr-[0.22em] last:mr-0"
                        >
                          {w}
                        </span>
                      ))}
                      {lineIdx === 0 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mb-8">
                  {d.body}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      ref={(el) => {
                        if (el && refs) refs.tags.current.push(el);
                      }}
                      className={`px-4 py-2 rounded-xl bg-surface border border-border text-xs font-mono font-semibold uppercase text-foreground/85 hover:scale-105 cursor-default transition ${toneTag[d.tone]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
