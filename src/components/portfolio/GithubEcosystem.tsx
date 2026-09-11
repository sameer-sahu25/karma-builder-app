import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

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
    <div ref={ref}>
      <p className="text-3xl sm:text-4xl font-black tracking-tight text-emerald tabular-nums">
        {n.toLocaleString()}
      </p>
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export function GithubEcosystem() {
  return (
    <section id="open-source" className="py-20 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <Reveal kind="up">
          <TiltCard max={5} lift={14}>
            <div className="relative rounded-3xl border border-border bg-surface/80 backdrop-blur-md p-8 sm:p-12 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald/10 blur-3xl" aria-hidden="true" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-emerald">
                    <GithubIcon className="w-6 h-6" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">Github Ecosystem</span>
                  </div>

                  <h2 className="mt-6 text-3xl sm:text-5xl font-black tracking-tight leading-[1.05]">
                    Creative Engineering,
                    <br />
                    now <span className="text-emerald">Open Source.</span>
                  </h2>

                  <div className="mt-8 flex flex-wrap gap-10">
                    <Counter value={1469} label="Total Contributions" />
                    <Counter value={76} label="Followers" />
                    <Counter value={58} label="Repositories" />
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
    </section>
  );
}
