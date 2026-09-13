import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

import { AnimatedText } from "@/components/motion/AnimatedText";
import { BoltIcon, RobotIcon } from "./icons";

const roles = [
  { title: "Software Engineer", sub: "Crafting robust applications" },
  { title: "Data Engineer", sub: "Building scalable pipelines" },
  { title: "AI Engineer", sub: "Shipping intelligent systems" },
  { title: "Systems Architect", sub: "Designing resilient platforms" },
];

/** Floating tech tokens that orbit the box; each reacts to the cursor with its own depth. */
const floaters = [
  { label: "TS", x: -230, y: -60, depth: 1.4, tone: "text-accent" },
  { label: "PY", x: -170, y: 70, depth: 0.9, tone: "text-amber" },
  { label: "GO", x: 210, y: -80, depth: 1.6, tone: "text-emerald" },
  { label: "SQL", x: 190, y: 60, depth: 1.0, tone: "text-danger" },
  { label: "K8s", x: -60, y: -140, depth: 2.0, tone: "text-accent" },
  { label: "RAG", x: 80, y: -160, depth: 1.2, tone: "text-amber" },
  { label: "API", x: -280, y: 10, depth: 0.6, tone: "text-foreground/70" },
  { label: "LLM", x: 280, y: -10, depth: 1.8, tone: "text-emerald" },
];

/** CSS-3D open box that reacts to pointer position, with rotating role pills rising out of it. */
function OpenBox() {
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

  return (
    <div className="relative mt-10 flex justify-center" style={{ perspective: 1100 }} aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        {floaters.map((f) => (
          <Floater key={f.label} {...f} px={px} py={py} />
        ))}
      </div>
      <motion.div className="box-3d" style={{ rotateX: rotX, rotateY: rotY }}>
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

function Floater({
  label,
  x,
  y,
  depth,
  tone,
  px,
  py,
}: {
  label: string;
  x: number;
  y: number;
  depth: number;
  tone: string;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const tx = useTransform(px, (v) => x + v * depth * 34);
  const ty = useTransform(py, (v) => y + v * depth * 26);
  const rot = useTransform(px, (v) => v * depth * 10);
  const scale = useTransform(py, (v) => 1 + v * depth * 0.05);

  return (
    <motion.span
      style={{ x: tx, y: ty, rotate: rot, scale }}
      className={`absolute rounded-xl border border-border bg-surface/80 backdrop-blur-md px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest ${tone}`}
    >
      {label}
    </motion.span>
  );
}


export function DigitalReality() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  const role = roles[i]!;

  return (
    <section id="reality" className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedText
     as="h2"
     text="ARCHITECTING"
     split="chars"
     stagger={0.035}
     className="block text-5xl sm:text-7xl md:text-8xl font-black tracking-tight "
     itemClassName="text-metallic" />
        <AnimatedText
          as="p"
          text="digital reality."
          split="chars"
          delay={0.25}
          stagger={0.03}
          className="block font-signature text-5xl sm:text-7xl md:text-8xl leading-tight text-foreground/90"
        />

        <div className="mt-10 flex justify-center min-h-[76px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-4 rounded-full border border-border bg-surface/85 backdrop-blur-md pl-3 pr-7 py-3"
            >
              <span className="w-11 h-11 rounded-full bg-surface-2 grid place-items-center text-accent">
                {i % 2 === 0 ? <BoltIcon className="w-5 h-6" /> : <RobotIcon className="w-6 h-6" />}
              </span>
              <span className="text-left">
                <span className="block text-base font-bold tracking-tight">{role.title}</span>
                <span className="block text-xs text-muted-foreground">{role.sub}</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <OpenBox />
      </div>
    </section>
  );
}
