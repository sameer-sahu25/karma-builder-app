import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

import { AnimatedText } from "@/components/motion/AnimatedText";
import { BoltIcon, RobotIcon } from "./icons";

const roles = [
  { title: "Software Engineer", sub: "Crafting robust applications" },
  { title: "Data Engineer", sub: "Building scalable pipelines" },
  { title: "AI Engineer", sub: "Architect intelligent systems" },
  { title: "Systems Architect", sub: "Designing resilient platforms" },
];

/** Tokens that burst out of the box, drift upward, and react to the cursor with their own depth. */
const floaters = [
  { label: "TS", x: -180, drift: -230, depth: 1.4, tone: "text-accent", delay: 0 },
  { label: "PY", x: -110, drift: -300, depth: 0.9, tone: "text-amber", delay: 1.1 },
  { label: "GO", x: 150, drift: -260, depth: 1.6, tone: "text-emerald", delay: 0.6 },
  { label: "SQL", x: 110, drift: -320, depth: 1.0, tone: "text-danger", delay: 2.2 },
  { label: "K8s", x: -40, drift: -340, depth: 2.0, tone: "text-accent", delay: 1.7 },
  { label: "RAG", x: 55, drift: -300, depth: 1.2, tone: "text-amber", delay: 2.8 },
  { label: "API", x: -215, drift: -200, depth: 0.6, tone: "text-foreground/70", delay: 3.3 },
  { label: "LLM", x: 210, drift: -220, depth: 1.8, tone: "text-emerald", delay: 0.3 },
];

function Floater({
  label,
  x,
  drift,
  depth,
  tone,
  delay,
  px,
  py,
}: {
  label: string;
  x: number;
  drift: number;
  depth: number;
  tone: string;
  delay: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const tx = useTransform(px, (v) => x + v * depth * 34);
  const rot = useTransform(px, (v) => v * depth * 12);

  return (
    <motion.span
      style={{ x: tx, rotate: rot }}
      className="absolute bottom-24 left-1/2 will-change-transform"
      initial={false}
    >
      <motion.span
        initial={{ y: 40, opacity: 0, scale: 0.6 }}
        animate={{ y: [40, drift], opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.85] }}
        transition={{ duration: 6, delay, repeat: Infinity, ease: "easeOut", times: [0, 0.18, 0.75, 1] }}
        className={`block rounded-xl border border-border bg-surface/80 backdrop-blur-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest ${tone}`}
      >
        {label}
      </motion.span>
    </motion.span>
  );
}

/** CSS-3D open box: role pills rise out of it and tech tokens burst upward. */
function OpenBox({ index }: { index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18 };
  const rotY = useSpring(useTransform(mx, [-1, 1], [-22, 22]), spring);
  const rotX = useSpring(useTransform(my, [-1, 1], [10, 26]), spring);
  const px = useSpring(mx, { stiffness: 90, damping: 20 });
  const py = useSpring(my, { stiffness: 90, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const role = roles[index]!;

  return (
    <div className="relative mt-24 flex justify-center" style={{ perspective: 1100 }}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[-220px]" aria-hidden="true">
        <div className="relative w-full h-full">
          {floaters.map((f) => (
            <Floater key={f.label} {...f} px={px} py={py} />
          ))}
        </div>
      </div>

      {/* role pills rising out of the box */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-28 z-20 w-full flex justify-center"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 70, scale: 0.7, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: -60, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -190, scale: 0.92, filter: "blur(6px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inline-flex items-center gap-4 rounded-full border border-border bg-surface/85 backdrop-blur-md pl-3 pr-7 py-3 shadow-2xl"
          >
            <span className="w-11 h-11 rounded-full bg-surface-2 grid place-items-center text-accent">
              {index % 2 === 0 ? <BoltIcon className="w-5 h-6" /> : <RobotIcon className="w-6 h-6" />}
            </span>
            <span className="text-left">
              <span className="block text-base font-bold tracking-tight">{role.title}</span>
              <span className="block text-xs text-muted-foreground">{role.sub}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div className="box-3d relative z-30" style={{ rotateX: rotX, rotateY: rotY }} aria-hidden="true">
        <span className="box-face box-front" />
        <span className="box-face box-back" />
        <span className="box-face box-left" />
        <span className="box-face box-right" />
        <span className="box-face box-bottom" />
        <span className="box-flap box-flap-l" />
        <span className="box-flap box-flap-r" />
        <span className="box-glow" />
      </motion.div>
    </div>
  );
}

export function DigitalReality() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="reality" className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedText
          as="h2"
          text="ARCHITECTING"
          split="chars"
          stagger={0.035}
          className="block text-5xl sm:text-7xl md:text-8xl font-black tracking-tight "
          itemClassName="text-metallic"
        />
        <AnimatedText
          as="p"
          text="digital reality."
          split="chars"
          delay={0.25}
          stagger={0.03}
          className="block font-signature text-5xl sm:text-7xl md:text-8xl leading-tight text-foreground/90"
        />

        <OpenBox index={i} />
      </div>
    </section>
  );
}
