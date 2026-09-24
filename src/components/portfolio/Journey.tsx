import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const railLineRef = useRef<SVGPathElement>(null);
  const railDotRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const ctx = gsap.context(() => {
      gsap.set(railLineRef.current, { strokeDashoffset: 1 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(railLineRef.current, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });

      if (railDotRef.current) {
        gsap.set(railDotRef.current, { yPercent: 0 });

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(railDotRef.current, {
              yPercent: 100,
              duration: 1.4,
              ease: "power2.inOut",
            });
          },
        });
      }

      if (cardsRef.current.length) {
        gsap.set(cardsRef.current, { y: 24, opacity: 0, filter: "blur(8px)" });

        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const registerCard = (el: HTMLElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <section id="journey" ref={sectionRef} className="relative py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <AnimatedText
            as="h2"
            text="Professional Journey"
            split="chars"
            stagger={0.025}
            className="hero-title block text-4xl sm:text-6xl md:text-7xl"
            itemClassName="text-metallic"
          />
          <Reveal kind="up" delay={0.15}>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              A timeline of roles, responsibilities, and professional growth across various organizations.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">
          <div className="md:col-span-2 flex md:justify-end">
            <div
              className="relative hidden md:flex flex-col items-center"
              style={{ position: "sticky", top: "20vh", height: "60vh" }}
            >
              <svg width="40" height="100%" viewBox="0 0 40 100" preserveAspectRatio="none" className="h-full">
                <path
                  ref={railLineRef}
                  d="M 20 0 V 100"
                  fill="none"
                  stroke="currentColor"
                  className="text-border-strong"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ strokeDasharray: "1 1", strokeDashoffset: 1 }}
                />
              </svg>
              <span
                ref={railDotRef}
                className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_15px_rgba(56,189,248,0.7)] border-2 border-background z-10"
                style={{ top: 0 }}
              />
            </div>
          </div>

          <div className="md:col-span-10 space-y-8 md:space-y-12">
            {roles.map((role, i) => (
              <article
                key={role.title}
                ref={(el) => registerCard(el, i)}
                className="group relative rounded-2xl border border-border bg-surface/80 backdrop-blur-md p-6 sm:p-8 hover:border-border-strong transition-colors duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {role.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle mt-2">
                      {role.period}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mt-1">
                      {role.org}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {role.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
