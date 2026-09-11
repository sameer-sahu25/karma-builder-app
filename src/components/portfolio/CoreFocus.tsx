const corners = ["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];

export function CoreFocus() {
  return (
    <section id="focus" className="relative px-6 md:px-12 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="relative tech-dots border border-border bg-background/60 p-8 md:p-14 rounded-sm interactive-card hover:border-border-strong reveal reveal-scale">
          {corners.map((pos) => (
            <span key={pos} className={`absolute ${pos} w-2.5 h-2.5 bg-danger shadow-[0_0_8px_rgba(239,68,68,0.9)]`} />
          ))}

          <div className="flex flex-wrap gap-4 items-center justify-between border-b border-border pb-6 mb-10">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-danger uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-danger animate-ping" />
              Core Focus
            </span>
            <span className="font-mono text-[11px] tracking-widest text-subtle uppercase">
              AI, Data &amp; Software Engineer
            </span>
          </div>

          <blockquote className="my-8 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15]">
            <span className="text-subtle font-mono text-4xl mr-2">"</span>
            <span className="hover:text-accent transition-colors">Applied AI.</span>{" "}
            <span className="text-muted-foreground hover:text-foreground transition-colors">Scalable Data.</span>
            <br />
            <span className="italic font-normal text-muted-foreground hover:text-foreground transition-colors">
              robust software engineering
            </span>
            <span className="text-subtle font-mono text-4xl">."</span>
          </blockquote>

          <div className="w-full h-px bg-border my-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              <p className="text-base text-foreground/80 leading-relaxed">
                I build intelligent systems and the <span className="italic text-foreground">data infrastructure</span>{" "}
                that makes them reliable at scale.
              </p>
            </div>

            <div className="reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                Scope &amp; Platform
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Focusing on predictive models, optimized data processing, and RAG pipelines designed for production
                environments and measurable performance.
              </p>
              <p className="mt-3 text-xs italic text-danger">Bridging labs and live systems.</p>
            </div>

            <div className="flex flex-col justify-between reveal" style={{ "--delay": "0.3s" } as React.CSSProperties}>
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
                Azril
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
