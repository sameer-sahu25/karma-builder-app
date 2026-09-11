import type { ReactNode } from "react";

import { Magnetic } from "@/components/motion/Magnetic";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";


const barHeights = ["h-10", "h-14", "h-8", "h-16", "h-12", "h-10"];
const barColors = ["bg-sky-500", "bg-sky-400", "bg-cyan-400", "bg-teal-400", "bg-emerald-400", "bg-indigo-500"];

function DashboardMock() {
  return (
    <div className="relative bg-zinc-900 rounded-lg p-3 border border-zinc-700 hover:border-sky-400 transition-colors">
      <div className="bg-zinc-950 p-3 rounded font-mono text-[10px] text-zinc-300 space-y-2">
        <div className="flex justify-between border-b border-zinc-800 pb-1 text-zinc-400">
          <span>LOAD TIME: 0.7s</span>
          <span className="text-emerald-400">57.1% BOUNCE</span>
        </div>
        <div className="h-16 flex items-end space-x-1 pt-2">
          {barHeights.map((h, i) => (
            <div key={i} className={`w-1/6 ${h} ${barColors[i]} transition-all`} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-zinc-500 pt-1">
          <span>SESSIONS: 479K</span>
          <span>PAGE VIEWS: 2.7M</span>
        </div>
      </div>
    </div>
  );
}

function LaptopMock() {
  return (
    <div className="w-full max-w-xs mx-auto bg-zinc-900 p-2 rounded-t-lg border-t-2 border-zinc-700 hover:border-amber-400 transition-colors">
      <div className="bg-white p-3 rounded text-center">
        <p className="text-xs font-black text-black">
          The future of writing is <span className="text-orange-600">autonomous.</span>
        </p>
        <p className="text-[9px] text-zinc-500 mt-1">Multi-agent orchestrator for production-grade publishing.</p>
      </div>
      <div className="h-3 bg-zinc-800 mt-2 rounded-b flex items-center justify-center">
        <div className="w-12 h-1 bg-zinc-600 rounded-full" />
      </div>
    </div>
  );
}

function IdentityMock() {
  return (
    <div className="bg-black text-white p-4 rounded border border-zinc-800 hover:border-sky-400 transition-colors">
      <div className="flex items-center justify-between mb-2 text-[9px] font-mono text-zinc-500">
        <span>IDENTITY // ESTABLISHED</span>
        <span className="text-emerald-400">10+ SHIPPED</span>
      </div>
      <p className="text-xs font-black uppercase tracking-wider">
        Architecting <span className="text-cyber font-black">Digital Reality</span>
      </p>
      <p className="text-[8px] text-zinc-400 mt-1 leading-snug">
        Fusing deep technical expertise in Artificial Intelligence with proven strategic leadership.
      </p>
    </div>
  );
}

type Project = {
  index: string;
  category: string;
  blurb: string;
  title: string;
  year: string;
  visual: ReactNode;
  hover: string;
};

const projects: Project[] = [
  {
    index: "01",
    category: "AI & Automation",
    blurb: "ai-driven browser interaction & testing engine.",
    title: "Browser Automation Agent",
    year: "2026",
    visual: <DashboardMock />,
    hover: "hover:text-sky-600",
  },
  {
    index: "02",
    category: "AI & Content",
    blurb: "multi-agent orchestration for research-backed content.",
    title: "Swarm AI Blog Writer",
    year: "2025",
    visual: <LaptopMock />,
    hover: "hover:text-orange-600",
  },
  {
    index: "03",
    category: "Creative Tech",
    blurb: "immersive 3d portfolio with webgl shaders.",
    title: "Creative Portfolio Website",
    year: "2025",
    visual: <IdentityMock />,
    hover: "hover:text-sky-600",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center justify-between gap-4 reveal">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Selected Work / Case Studies
          </h2>
          <span className="font-mono text-xs text-subtle">2024 — 2026</span>
        </div>

        <Stagger className="space-y-12" stagger={0.14}>
          {projects.map((p) => (
            <StaggerItem key={p.title}>
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
                      <p className="font-mono text-xs text-zinc-600 tracking-wide">{p.blurb}</p>
                    </div>

                    <div className="lg:col-span-4 transition-transform duration-500 group-hover:scale-[1.06]">
                      {p.visual}
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-between self-stretch text-left lg:text-right">
                      <h3
                        className={`text-2xl sm:text-3xl font-bold tracking-tight uppercase leading-tight transition-colors ${p.hover}`}
                      >
                        {p.title}
                      </h3>
                      <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end lg:space-x-8">
                        <span className="font-mono text-xs text-zinc-500">{p.year}</span>
                        <Magnetic strength={0.5}>
                          <a
                            href="#focus"
                            className="font-mono text-xs font-bold uppercase tracking-wider hover:opacity-70 transition border-b border-current pb-0.5 inline-block"
                          >
                            View More
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>


        <div className="mt-16 flex flex-wrap gap-4 items-center justify-between pt-6 border-t border-border reveal">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-xs tracking-widest text-subtle uppercase">Page</span>
            <div className="w-24 sm:w-40 h-[2px] bg-muted rounded-full overflow-hidden">
              <div className="w-3/5 h-full bg-foreground" />
            </div>
            <span className="font-mono text-xs font-bold tracking-wider">3 / 5</span>
          </div>
          <span className="text-xs font-mono text-subtle">Scroll to explore more ↓</span>
        </div>
      </div>
    </section>
  );
}
