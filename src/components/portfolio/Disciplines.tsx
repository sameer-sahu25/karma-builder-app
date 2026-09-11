type Tone = "accent" | "amber" | "danger";

type Discipline = {
  title: [string, string];
  body: string;
  tags: string[];
  tone: Tone;
  faces: [string, string, string];
  labels: [string, string, string];
};

const disciplines: Discipline[] = [
  {
    title: ["INTELLIGENT", "SYSTEMS"],
    body: "Specializing in architecting intelligent systems and intelligence-driven platforms. From fine-tuning models and engineering RAG architectures to developing deep learning models for Computer Vision and NLP.",
    tags: ["LLM Fine-Tuning", "RAG Systems", "Deep Learning", "MLOps", "Data Analytics"],
    tone: "accent",
    faces: ["#0e7490", "#065f46", "#0b1220"],
    labels: ["AI", "DATA", "ML"],
  },
  {
    title: ["SCALABLE", "SYSTEMS"],
    body: "Building the foundation for resilient digital ecosystems. I engineer full-stack solutions with a focus on system architecture, modular design, and high-performance backends using Go, Next.js, and Python.",
    tags: ["System Architecture", "Full-Stack Dev", "Docker & K8s", "API Design", "DevOps"],
    tone: "amber",
    faces: ["#a16207", "#7f1d1d", "#0b0b0d"],
    labels: ["CODE", "ARCH", "OPS"],
  },
  {
    title: ["STRATEGIC", "INNOVATION"],
    body: "Translating complex technical requirements into impactful business solutions through systemic thinking, strategic leadership, and clear communication within cross-functional teams.",
    tags: ["Systemic Thinking", "Leadership", "Problem Solving", "Teamwork", "Communication", "Research"],
    tone: "danger",
    faces: ["#c2410c", "#1e3a8a", "#0b0b0d"],
    labels: ["LEAD", "IDEA", "TEAM"],
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

function Cube({ faces, labels }: { faces: [string, string, string]; labels: [string, string, string] }) {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 select-none animate-float-slow">
      <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" aria-hidden="true">
        <polygon points="150,30 260,95 150,160 40,95" fill={faces[0]} stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" />
        <polygon points="40,95 150,160 150,280 40,215" fill={faces[1]} stroke="rgba(255,255,255,0.28)" strokeWidth="1.6" />
        <polygon points="150,160 260,95 260,215 150,280" fill={faces[2]} stroke="rgba(255,255,255,0.2)" strokeWidth="1.6" />
        <text
          x="150"
          y="98"
          textAnchor="middle"
          fill="rgba(255,255,255,0.92)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="14"
          fontWeight="800"
          letterSpacing="3"
        >
          {labels[0]}
        </text>
        <text
          x="95"
          y="205"
          textAnchor="middle"
          fill="rgba(255,255,255,0.8)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="12"
          fontWeight="800"
          letterSpacing="2"
          transform="rotate(-30, 95, 205)"
        >
          {labels[1]}
        </text>
        <text
          x="205"
          y="205"
          textAnchor="middle"
          fill="rgba(255,255,255,0.65)"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="12"
          fontWeight="800"
          letterSpacing="2"
          transform="rotate(30, 205, 205)"
        >
          {labels[2]}
        </text>
      </svg>
    </div>
  );
}

export function Disciplines() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-background/80 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        {disciplines.map((d, i) => {
          const cubeFirst = i % 2 === 0;
          return (
            <div key={d.title.join(" ")} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center reveal">
              <div
                className={`lg:col-span-6 flex justify-center ${cubeFirst ? "order-2 lg:order-1" : "order-2"}`}
              >
                <Cube faces={d.faces} labels={d.labels} />
              </div>
              <div className={`lg:col-span-6 ${cubeFirst ? "order-1 lg:order-2" : "order-1"}`}>
                <h2
                  className={`text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none mb-6 transition-colors ${toneTitle[d.tone]}`}
                >
                  {d.title[0]}
                  <br />
                  {d.title[1]}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mb-8">{d.body}</p>
                <div className="flex flex-wrap gap-2.5">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-4 py-2 rounded-xl bg-surface border border-border text-xs font-mono font-semibold uppercase text-foreground/85 hover:scale-105 transition cursor-default ${toneTag[d.tone]}`}
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
