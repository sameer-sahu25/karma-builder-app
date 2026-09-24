import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  hasPlus?: boolean;
};

const metrics: Metric[] = [
  { label: "Current GPA", value: 7.1, suffix: "/10.0" },
  { label: "Projects Completed", value: 20, hasPlus: true },
  { label: "Professional Exp", value: 2, suffix: " Years" },
  { label: "Tech & Tools", value: 34, hasPlus: true },
];

function formatNumber(v: number, metric: Metric): string {
  const isFloat = metric.value % 1 !== 0;
  const base = isFloat ? v.toFixed(1) : Math.floor(v).toString();
  const plus = metric.hasPlus ? "+" : "";
  return `${base}${plus}`;
}

export function Stats() {
  const rootRef = useRef<HTMLElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<HTMLSpanElement[]>([]);
  const metricPanelsRef = useRef<HTMLDivElement[]>([]);
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));
  const hasAnimatedRef = useRef(false);
  const numberNodesRef = useRef<HTMLParagraphElement[]>([]);

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
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            chipRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          );

          gsap.fromTo(
            headingWordsRef.current,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.03,
              ease: "power3.out",
            },
          );

          gsap.fromTo(
            metricPanelsRef.current,
            { opacity: 0, y: 20, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "back.out(1.4)",
            },
          );

          if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const durations = [1800, 1800, 1500, 2000];
            metrics.forEach((m, i) => {
              const start = performance.now();
              const duration = durations[i] ?? 1800;
              const tick = (now: number) => {
                const raw = (now - start) / duration;
                const t = Math.min(1, raw);
                const eased = 1 - Math.pow(1 - t, 3);
                const val = m.value * eased;
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = val;
                  return next;
                });
                if (t < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            });
          }
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const headingParts = [
    { text: "Data", accent: false },
    { text: "that", accent: false },
    { text: "speaks.", accent: false },
    { text: "AI", accent: false },
    { text: "that", accent: false },
    { text: "reasons.", accent: false, lineBreak: true },
    { text: "Software", accent: false },
    { text: "that", accent: false },
    { text: "ships.", accent: false, lineBreak: true },
    { text: "Three", muted: true },
    { text: "disciplines,", muted: true },
    { text: "one", muted: true },
    { text: "engineer", muted: true },
    { text: "and", muted: true },
    { text: "the", muted: true },
    { text: "numbers", muted: true },
    { text: "behind", muted: true },
    { text: "the", muted: true },
    { text: "work.", muted: true },
  ];

  return (
    <section ref={rootRef} className="relative px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-6xl mx-auto w-full text-center">
        <div
          ref={chipRef}
          className="inline-flex items-center space-x-2 bg-surface border border-border px-4 py-1.5 rounded-full mb-8 shadow-lg hover:border-emerald/40 transition"
        >
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/80">
            Professional Statistics
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight mb-16">
          {headingParts.map((p, i) => (
            <span key={i} className="inline-flex flex-wrap justify-center">
              <span
                ref={(el) => {
                  if (el) headingWordsRef.current.push(el);
                }}
                className={`inline-block mr-[0.28em] last:mr-0 ${
                  p.muted ? "text-muted-foreground" : ""
                }`}
              >
                {p.text}
              </span>
              {p.lineBreak && <br className="hidden sm:inline w-full" />}
            </span>
          ))}
        </h2>

        <div className="bg-surface-2 border border-border rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl interactive-card hover:border-border-strong">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                ref={(el) => {
                  if (el) metricPanelsRef.current[i] = el;
                }}
                className="pt-4 md:pt-0 md:pl-4 group hover:bg-muted/40 p-2 rounded-xl"
              >
                <p className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">
                  {m.label}
                </p>
                <p
                  ref={(el) => {
                    if (el) numberNodesRef.current[i] = el;
                  }}
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight group-hover:scale-105 transition-transform"
                >
                  {formatNumber(counts[i] ?? 0, m)}
                  {m.suffix ? <span className="text-xl text-subtle font-medium">{m.suffix}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
