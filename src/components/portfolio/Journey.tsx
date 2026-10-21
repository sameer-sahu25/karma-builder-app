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
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const railProgressRef = useRef<HTMLDivElement>(null);
  const railDotRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const pipsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    if (!section || !cardsContainer) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const ctx = gsap.context(() => {
      // 1. Initial entrance for cards
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
              stagger: 0.08,
              duration: 0.75,
              ease: "power3.out",
            });
          },
        });
      }

      // 2. Real-time scroll synchronized timeline for the blue rail and beacon dot
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainer,
          start: "top 35%",
          end: "bottom 70%",
          scrub: 0.25,
          onUpdate: (self) => {
            const p = self.progress;

            // Update step indicator
            if (counterRef.current) {
              const currentStep = Math.min(roles.length, Math.floor(p * roles.length) + 1);
              counterRef.current.textContent = `0${currentStep} / 0${roles.length}`;
            }

            // Update milestone pips
            pipsRef.current.forEach((pip, idx) => {
              if (!pip) return;
              const pipPct = idx / (roles.length - 1);
              if (p >= pipPct - 0.02) {
                pip.classList.add("border-accent", "bg-accent", "shadow-[0_0_10px_rgba(56,189,248,0.85)]", "scale-125");
                pip.classList.remove("border-border", "bg-surface-2", "scale-100");
              } else {
                pip.classList.remove("border-accent", "bg-accent", "shadow-[0_0_10px_rgba(56,189,248,0.85)]", "scale-125");
                pip.classList.add("border-border", "bg-surface-2", "scale-100");
              }
            });

            // Highlight active role card along the scroll path
            const activeCardIdx = Math.min(roles.length - 1, Math.floor(p * roles.length));
            cardsRef.current.forEach((card, idx) => {
              if (!card) return;
              if (idx === activeCardIdx) {
                card.classList.add("border-accent/60", "bg-surface/95", "shadow-[0_0_30px_rgba(56,189,248,0.1)]");
                card.classList.remove("border-border", "bg-surface/80");
              } else {
                card.classList.remove("border-accent/60", "bg-surface/95", "shadow-[0_0_30px_rgba(56,189,248,0.1)]");
                card.classList.add("border-border", "bg-surface/80");
              }
            });
          },
        },
      });

      if (railProgressRef.current) {
        tl.fromTo(
          railProgressRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none" },
          0
        );
      }

      if (railDotRef.current) {
        tl.fromTo(
          railDotRef.current,
          { top: "0%" },
          { top: "100%", ease: "none" },
          0
        );
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
              className="relative hidden md:flex flex-col items-center justify-between"
              style={{ position: "sticky", top: "20vh", height: "58vh" }}
            >
              {/* Top counter */}
              <div className="flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.25em] text-accent select-none mb-3">
                <span className="text-[9px] uppercase tracking-[0.3em] text-subtle">Phase</span>
                <span ref={counterRef} className="font-bold text-foreground">01 / 0{roles.length}</span>
              </div>

              {/* The Rail Track */}
              <div className="relative w-8 flex-1 flex justify-center items-center my-2">
                {/* Background base track */}
                <div className="absolute top-0 bottom-0 w-[2px] bg-border/50 rounded-full" />

                {/* Glowing blue progress line */}
                <div
                  ref={railProgressRef}
                  className="absolute top-0 w-[3px] bg-gradient-to-b from-sky-400 via-accent to-blue-500 rounded-full origin-top shadow-[0_0_12px_rgba(56,189,248,0.85)]"
                  style={{ height: "100%", transform: "scaleY(0)" }}
                />

                {/* Milestone Pips */}
                {roles.map((r, idx) => {
                  const pct = (idx / (roles.length - 1)) * 100;
                  return (
                    <div
                      key={r.title}
                      ref={(el) => { pipsRef.current[idx] = el; }}
                      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-border bg-surface-2 transition-all duration-300 pointer-events-none"
                      style={{ top: `${pct}%` }}
                      title={r.title}
                    />
                  );
                })}

                {/* Glowing blue dot beacon */}
                <div
                  ref={railDotRef}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_18px_rgba(56,189,248,0.95)] border-2 border-background z-20 flex items-center justify-center pointer-events-none"
                  style={{ top: "0%" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                  <span className="absolute -inset-1 rounded-full bg-accent/35 animate-ping pointer-events-none" />
                </div>
              </div>

              {/* Bottom label */}
              <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-subtle select-none">
                Timeline
              </div>
            </div>
          </div>

          <div ref={cardsContainerRef} className="md:col-span-10 space-y-8 md:space-y-12">
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
