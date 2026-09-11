import { AnimatedText, ScrambleText } from "@/components/motion/AnimatedText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  tag: string;
  accent: string;
};

const certs: Cert[] = [
  { title: "Deep Learning Specialization", issuer: "BISA AI Academy", year: "2025", tag: "Completion Badge", accent: "from-accent/25" },
  { title: "AWS Educate — Getting Started with Databases", issuer: "Amazon Web Services", year: "2025", tag: "Training Badge", accent: "from-amber/25" },
  { title: "Machine Learning in Production", issuer: "DeepLearning.AI", year: "2024", tag: "Certificate", accent: "from-emerald/25" },
  { title: "Cloud Engineering Foundations", issuer: "Google Cloud", year: "2024", tag: "Certificate", accent: "from-accent/25" },
  { title: "Full-Stack Web Development", issuer: "Dicoding", year: "2024", tag: "Completion Badge", accent: "from-amber/25" },
  { title: "Data Engineering with Python", issuer: "Coursera", year: "2023", tag: "Certificate", accent: "from-emerald/25" },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto text-center">
        <Reveal kind="fade">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
            Certifications &amp; Achievements
          </p>
        </Reveal>

        <AnimatedText
     as="h2"
     text="Validating Excellence through Global Standards."
     split="words"
     stagger={0.05}
     className="mt-6 block text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] "
     itemClassName="text-metallic" />

        <Reveal kind="up" delay={0.2}>
          <p className="mt-6 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            A collection of my professional certifications in AI, Web Development, and Cloud Engineering from industry
            leaders.
          </p>
        </Reveal>

        <Reveal kind="scale" delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Magnetic strength={0.7}>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-invert text-invert-foreground px-8 py-4 font-bold text-sm tracking-wide transition-transform hover:scale-105 active:scale-95"
              >
                <ScrambleText text="View Credentials" />
                <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left" stagger={0.09}>
          {certs.map((c) => (
            <StaggerItem key={c.title}>
              <TiltCard max={9} lift={16}>
                <article className="h-full rounded-2xl border border-border bg-surface/70 backdrop-blur-sm p-6 overflow-hidden group">
                  <div
                    className={`h-28 rounded-xl bg-linear-to-br ${c.accent} to-transparent border border-border flex items-end p-3 transition-transform duration-500 group-hover:scale-[1.04]`}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold tracking-tight leading-snug">{c.title}</h3>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                    <span>{c.issuer}</span>
                    <span className="text-accent">{c.year}</span>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
