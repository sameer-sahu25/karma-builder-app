import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";

type Role = {
  title: string;
  org: string;
  period: string;
  summary: string;
};

const roles: Role[] = [
  {
    title: "Research Assistant",
    org: "University AI Lab",
    period: "Jan 2024 — Aug 2024",
    summary: "Applied deep learning research on anomaly detection, publishing reproducible training pipelines.",
  },
  {
    title: "AI Developer Intern",
    org: "Nusantara Tech",
    period: "Sep 2024 — Feb 2025",
    summary: "Shipped retrieval-augmented assistants and evaluation harnesses for production LLM features.",
  },
  {
    title: "Computer Network Practicum Assistant",
    org: "Faculty of Informatics",
    period: "Mar 2025 — Aug 2025",
    summary: "Taught routing, subnetting and network security labs to 120+ undergraduate students.",
  },
  {
    title: "HUMIC Engineering",
    org: "Research Center",
    period: "September 2025 — December 2025",
    summary: "Developed and deployed AI-driven threat detection systems in a research-focused environment.",
  },
  {
    title: "Chief Committee",
    org: "Tech Festival",
    period: "Jan 2026 — Apr 2026",
    summary: "Led a 40-person committee delivering a national scale student technology conference.",
  },
  {
    title: "Data Entry Assistant",
    org: "Regional Analytics Unit",
    period: "May 2026 — Present",
    summary: "Automating ingestion and quality checks across high-volume operational datasets.",
  },
];

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform(eased, [0, 1], ["2%", "-62%"]);
  const lineScale = useTransform(eased, [0, 1], [0.05, 1]);

  return (
    <section id="journey" ref={sectionRef} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
          <AnimatedText
      as="h2"
      text="Professional Journey"
      split="chars"
      stagger={0.025}
      className="hero-title block text-4xl sm:text-6xl md:text-7xl"
      itemClassName="text-metallic" />
          <Reveal kind="up" delay={0.15}>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              A timeline of roles, responsibilities, and professional growth across various organizations.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border" aria-hidden="true" />
          <motion.div
            className="absolute left-0 right-0 top-1/2 h-px origin-left bg-linear-to-r from-accent via-foreground to-amber"
            style={{ scaleX: lineScale }}
            aria-hidden="true"
          />

          <motion.ol className="flex items-center gap-0 list-none" style={{ x }}>
            {roles.map((role, i) => (
              <li key={role.title} className="relative shrink-0 w-[340px] sm:w-[420px] group">
                <div className="flex items-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-surface-2 border border-border-strong shrink-0 transition-all duration-300 group-hover:bg-foreground group-hover:scale-125" />
                  <span className="h-px flex-1 bg-transparent" />
                </div>

                <div className={i % 2 === 0 ? "pt-6 pl-6" : "absolute bottom-8 left-6 pr-6"}>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {role.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle mt-2">{role.period}</p>
                  <div className="mt-3 max-w-[320px] overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="text-xs text-muted-foreground leading-relaxed">{role.summary}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mt-2">{role.org}</p>
                  </div>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
