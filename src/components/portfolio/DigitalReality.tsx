import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { AnimatedText } from "@/components/motion/AnimatedText";
import creativeTechBurst from "@/assets/creative-tech-burst.png";
import { BoltIcon, RobotIcon } from "./icons";

const roles = [
  { title: "Software Engineer", sub: "Crafting robust applications" },
  { title: "Data Engineer", sub: "Building scalable pipelines" },
  { title: "AI Engineer", sub: "Architect intelligent systems" },
  { title: "Systems Architect", sub: "Designing resilient platforms" },
];

/** Open box with a cursor-driven creative burst, matching the reference interaction. */
function OpenBox({ index }: { index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18 };
  const rotY = useSpring(useTransform(mx, [-1, 1], [-22, 22]), spring);
  const rotX = useSpring(useTransform(my, [-1, 1], [10, 26]), spring);
  const px = useSpring(mx, { stiffness: 90, damping: 20 });
  const py = useSpring(my, { stiffness: 90, damping: 20 });
  const burstX = useTransform(px, [-1, 1], [-300, 300]);
  const burstY = useTransform(py, [-1, 1], [-105, 105]);
  const burstRotate = useTransform(px, [-1, 1], [-8, 8]);
  const pillX = useTransform(px, [-1, 1], [-24, 24]);
  const pillY = useTransform(py, [-1, 1], [-12, 12]);

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
    <div className="relative mt-20 flex min-h-[360px] justify-center" style={{ perspective: 1100 }}>
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={role.title}
          src={creativeTechBurst}
          alt=""
          width={1200}
          height={1200}
          loading="lazy"
          aria-hidden="true"
          draggable={false}
          style={{ x: burstX, y: burstY, rotate: burstRotate }}
          initial={{ opacity: 0, scale: 0.4, y: 150 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.28, y: 190, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            stiffness: 95,
            damping: 17,
            mass: 0.8,
            opacity: { duration: 0.45 },
          }}
          className="pointer-events-none absolute bottom-24 left-1/2 z-10 h-auto w-[310px] -translate-x-1/2 select-none drop-shadow-2xl sm:w-[390px] md:w-[460px]"
        />
      </AnimatePresence>

      {/* role pills rising out of the box */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-28 z-20 w-full flex justify-center"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={role.title}
            style={{ x: pillX, y: pillY }}
            initial={{ opacity: 0, y: 70, scale: 0.7, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -85, scale: 0.92, filter: "blur(6px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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

      <motion.div className="box-3d relative z-30 mt-24" style={{ rotateX: rotX, rotateY: rotY }} aria-hidden="true">
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
    const id = window.setInterval(() => setI((v) => (v + 1) % roles.length), 1450);
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
