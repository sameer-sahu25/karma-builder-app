import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, Database, Code2, Layers, Sparkles, Activity } from "lucide-react";

import { AnimatedText } from "@/components/motion/AnimatedText";
import creativeTechBurst from "@/assets/creative-tech-burst.png";

const roles = [
  {
    id: "ai",
    title: "AI Engineer",
    sub: "Architecting intelligent systems & neural platforms",
    icon: Bot,
    tag: "Neural Architecture",
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(56, 189, 248, 0.35)",
    badgeColor: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    pillBg: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    metrics: ["RAG Systems", "Deep Learning", "LLM Fine-Tuning", "Autonomous Agents"],
    highlight: "Autonomous Reasoning & Real-Time Inference",
  },
  {
    id: "data",
    title: "Data Engineer",
    sub: "Building scalable, high-throughput pipelines",
    icon: Database,
    tag: "Data Pipelines",
    color: "from-emerald-500 to-teal-400",
    glowColor: "rgba(52, 211, 153, 0.35)",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    pillBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    metrics: ["Distributed ETL", "Kafka Streaming", "Lakehouse", "ClickHouse"],
    highlight: "Sub-Second Multi-Terabyte Analytics",
  },
  {
    id: "software",
    title: "Software Engineer",
    sub: "Crafting robust, low-latency applications",
    icon: Code2,
    tag: "Core Engineering",
    color: "from-amber-500 to-orange-400",
    glowColor: "rgba(251, 191, 36, 0.35)",
    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    pillBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    metrics: ["Distributed Go", "Next.js", "gRPC / REST", "TypeScript"],
    highlight: "High-Concurrency Fault Tolerance",
  },
  {
    id: "systems",
    title: "Systems Architect",
    sub: "Designing resilient, zero-downtime platforms",
    icon: Layers,
    tag: "Cloud Architecture",
    color: "from-purple-500 to-indigo-400",
    glowColor: "rgba(192, 132, 252, 0.35)",
    badgeColor: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    pillBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    metrics: ["Kubernetes", "Docker Engine", "System Topology", "Observability"],
    highlight: "Self-Healing Distributed Infrastructure",
  },
];

const AUTO_CYCLE_MS = 3800;

export function DigitalReality() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse interactive tilt values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20 };
  const rotX = useSpring(useTransform(my, [-1, 1], [6, -6]), springConfig);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-8, 8]), springConfig);
  const parallaxX = useSpring(useTransform(mx, [-1, 1], [-18, 18]), springConfig);
  const parallaxY = useSpring(useTransform(my, [-1, 1], [-10, 10]), springConfig);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  // Calm auto-rotation when user is not hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % roles.length);
    }, AUTO_CYCLE_MS);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  // GSAP scroll trigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore */
    }

    const ctx = gsap.context(() => {
      gsap.from(section, {
        opacity: 0,
        y: 45,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const currentRole = roles[activeIdx]!;
  const IconComponent = currentRole.icon;

  return (
    <section
      id="reality"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 md:px-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient radial glow matching active role */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 transition-colors duration-1000 -z-10"
        style={{ backgroundColor: currentRole.glowColor }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-surface-2/60 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            Digital Reality Nexus
          </span>
        </div>

        {/* Header Typography */}
        <AnimatedText
          as="h2"
          text="ARCHITECTING"
          split="chars"
          stagger={0.03}
          className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
          itemClassName="text-metallic"
        />
        <AnimatedText
          as="p"
          text="digital reality."
          split="chars"
          delay={0.2}
          stagger={0.025}
          className="block font-signature text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-accent/90"
        />

        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
          Transforming complex algorithms and high-throughput systems into responsive, resilient digital reality.
        </p>

        {/* Interactive Role Switcher Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {roles.map((r, idx) => {
            const isSelected = idx === activeIdx;
            const TabIcon = r.icon;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                  isSelected
                    ? "bg-surface-2 border border-border-strong text-foreground shadow-lg scale-105"
                    : "bg-surface/50 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-surface/80"
                }`}
              >
                <TabIcon className={`w-3.5 h-3.5 transition-colors ${isSelected ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`} />
                <span>{r.title}</span>

                {/* Progress bar line for active tab */}
                {isSelected && !isPaused && (
                  <motion.div
                    key={activeIdx}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTO_CYCLE_MS / 1000, ease: "linear" }}
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Holographic Projection Stage */}
        <motion.div
          className="relative mt-12 sm:mt-16 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[500px]"
          style={{ perspective: 1200 }}
        >
          {/* 3D Tilt Wrapper */}
          <motion.div
            className="relative w-full flex flex-col items-center justify-center"
            style={{
              rotateX: rotX,
              rotateY: rotY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Creative Tech Burst Graphic — floating gracefully behind the showcase card */}
            <motion.div
              style={{ x: parallaxX, y: parallaxY }}
              className="relative z-10 flex justify-center pointer-events-none select-none"
            >
              <motion.img
                src={creativeTechBurst}
                alt=""
                width={800}
                height={800}
                loading="lazy"
                draggable={false}
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-[280px] sm:w-[360px] md:w-[420px] max-w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] opacity-90"
              />
            </motion.div>

            {/* Holographic Pedestal / Stage Rings */}
            <div
              className="relative -mt-16 sm:-mt-24 z-20 w-[300px] sm:w-[420px] md:w-[480px] h-[90px] flex items-center justify-center pointer-events-none"
              style={{ transform: "rotateX(68deg)", transformStyle: "preserve-3d" }}
            >
              {/* Outer dashed radar orbit */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-border-strong/60 animate-spin"
                style={{ animationDuration: "35s" }}
              />
              {/* Middle glowing accent ring */}
              <div
                className="absolute inset-4 rounded-full border border-accent/40 shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-colors duration-700"
                style={{ borderColor: currentRole.glowColor }}
              />
              {/* Inner core grid */}
              <div className="absolute inset-8 rounded-full bg-surface-2/70 border border-white/10 backdrop-blur-md tech-dots" />
            </div>

            {/* Foreground Holographic Role Showcase Card */}
            <div className="relative -mt-8 sm:-mt-10 z-30 w-full max-w-lg px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole.id}
                  initial={{ opacity: 0, y: 22, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl sm:rounded-3xl border border-border-strong bg-surface/90 backdrop-blur-xl p-5 sm:p-7 shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-accent/50 text-left"
                >
                  {/* Top Bar: Icon + Category Badge + Live Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-accent shadow-inner">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`inline-block text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border font-semibold ${currentRole.badgeColor}`}>
                          {currentRole.tag}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mt-0.5">
                          {currentRole.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-[10px] font-mono font-medium">
                      <Activity className="w-3 h-3 animate-pulse" />
                      <span>ONLINE</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {currentRole.sub}
                  </p>

                  {/* Highlight pill */}
                  <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-2 border border-border/80 text-[11px] font-mono text-foreground/90">
                    <span className="text-accent font-bold">FOCUS</span>
                    <span>{currentRole.highlight}</span>
                  </div>

                  {/* Tech stack chips */}
                  <div className="mt-4 pt-3.5 border-t border-border/60 flex flex-wrap gap-1.5">
                    {currentRole.metrics.map((m) => (
                      <span
                        key={m}
                        className={`text-[10px] font-mono tracking-wide px-2.5 py-0.5 rounded-md border ${currentRole.pillBg}`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
