const metrics = [
  { label: "Current GPA", value: "7.1", suffix: "/10.0" },
  { label: "Projects Completed", value: "20+" },
  { label: "Professional Exp", value: "2", suffix: " Years" },
  { label: "Tech & Tools", value: "34+" },
];

export function Stats() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-surface border border-border px-4 py-1.5 rounded-full mb-8 shadow-lg hover:border-emerald/40 transition reveal">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/80">
            Professional Statistics
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight mb-16 reveal">
          Data that speaks. AI that reasons.
          <br className="hidden sm:inline" /> Software that ships.
          <br />
          <span className="text-muted-foreground">
            Three disciplines, one engineer and the numbers behind the work.
          </span>
        </h2>

        <div className="bg-surface-2 border border-border rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl interactive-card hover:border-border-strong reveal reveal-scale">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
            {metrics.map((m) => (
              <div key={m.label} className="pt-4 md:pt-0 md:pl-4 group hover:bg-muted/40 p-2 rounded-xl transition duration-300">
                <p className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">
                  {m.label}
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {m.value}
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
