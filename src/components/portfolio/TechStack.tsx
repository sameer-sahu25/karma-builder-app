import { useState } from "react";

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

function PillRow({ pills, className }: { pills: Pill[]; className?: string }) {
  const [order, setOrder] = useState(pills.map((_, i) => i));
  const [dragged, setDragged] = useState<number | null>(null);

  const drop = (target: number) => {
    if (dragged === null || dragged === target) return;
    setOrder((prev) => {
      const next = [...prev];
      const from = next.indexOf(dragged);
      const to = next.indexOf(target);
      next.splice(to, 0, next.splice(from, 1)[0]!);
      return next;
    });
    setDragged(null);
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center ${className ?? ""}`}>
      {order.map((idx) => {
        const pill = pills[idx]!;
        return (
          <div
            key={pill.name}
            draggable
            onDragStart={() => setDragged(idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => drop(idx)}
            className="cursor-grab active:cursor-grabbing flex items-center space-x-2.5 p-2 rounded-xl bg-surface-2/70 border border-border hover:border-border-strong transition"
          >
            {pill.mark}
            <span className="text-sm font-semibold tracking-tight text-foreground/85">{pill.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TechStack() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <h2 className="lg:col-span-7 text-2xl sm:text-4xl font-bold tracking-tight leading-snug reveal">
            Architecting Scalable Systems
            <br />
            Where Intelligence Meets Engineering.
          </h2>
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
            ✦ Interactive: Drag to reorder badges ✦
          </span>
        </div>

        <PillRow pills={rowOne} className="py-4" />
        <PillRow pills={rowTwo} className="pt-6 mt-6 border-t border-border" />
      </div>
    </section>
  );
}
