import { useEffect, useRef, useState } from "react";
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
    title: "Senior Secondary Education (12th)",
    org: "Small Wonder Senior Secondary School, Jabalpur",
    period: "Completed",
    summary: "Higher secondary education with a focus on Physics, Chemistry and Mathematics.",
  },
  {
    title: "B.Tech in Computer Science",
    org: "Shree Ram Institute of Science and Technology, Jabalpur",
    period: "2024 — 2028",
    summary:
      "Coursework: Data Structures & Algorithms, Web Development, Database Management Systems, Software Engineering.",
  },
  {
    title: "WeatherApp",
    org: "React, OpenWeather API, RESTful Integration",
    period: "2024",
    summary:
      "Glassmorphism weather dashboard with dynamic backgrounds by condition, responsive layouts, location search, caching and error boundaries.",
  },
  {
    title: "Web Developer Intern — React JS",
    org: "Alfido Tech",
    period: "Internship",
    summary: "Built and shipped React interfaces, reusable components and responsive layouts.",
  },
  {
    title: "Full Stack Developer Intern",
    org: "CodSoft",
    period: "Internship",
    summary: "Developed full-stack features across frontend, backend APIs and database layers.",
  },
  {
    title: "Jabalpur Stays",
    org: "React, Express.js, Node.js, PostgreSQL",
    period: "2025",
    summary:
      "Full-stack hotel platform with real-time booking, property listings, secure auth, role-based admin dashboard and optimized queries.",
  },
  {
    title: "Smart Inbox Guard",
    org: "React, Node.js, Python, Machine Learning",
    period: "2026",
    summary:
      "AI email security system: TensorFlow/scikit-learn spam and phishing detection served through a Node.js REST API with a React threat-monitoring dashboard.",
  },
  {
    title: "Open Source Connect India",
    org: "Currently Working",
    period: "2026 — Present",
    summary: "Contributing to open source projects and community-driven engineering initiatives.",
  },
];


export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform(eased, [0, 1], [24, -distance]);
  const lineScale = useTransform(eased, [0, 1], [0.05, 1]);

  return (
    <section id="journey" ref={sectionRef} className="relative" style={{ height: "520vh" }}>

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

          <motion.ol ref={trackRef} className="flex items-center gap-0 list-none w-max" style={{ x }}>
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
