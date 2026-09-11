import type { ReactNode } from "react";
import { motion, type TargetAndTransition, type Variants } from "motion/react";

type Kind = "fade" | "up" | "down" | "left" | "right" | "scale" | "rotate" | "blur";

const hidden: Record<Kind, TargetAndTransition> = {
  fade: { opacity: 0 },
  up: { opacity: 0, y: 48 },
  down: { opacity: 0, y: -48 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  scale: { opacity: 0, scale: 0.9 },
  rotate: { opacity: 0, rotate: -8, y: 40 },
  blur: { opacity: 0, filter: "blur(14px)", y: 24 },
};

const shown: Record<Kind, TargetAndTransition> = {
  fade: { opacity: 1 },
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  rotate: { opacity: 1, rotate: 0, y: 0 },
  blur: { opacity: 1, filter: "blur(0px)", y: 0 },
};

/** Scroll-triggered entrance. Wrap several in <Stagger> for sequenced choreography. */
export function Reveal({
  children,
  kind = "up",
  delay = 0,
  duration = 0.9,
  once = true,
  className,
}: {
  children: ReactNode;
  kind?: Kind;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={hidden[kind]}
      whileInView={shown[kind]}
      viewport={{ once, margin: "-10% 0px -8% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  shown: (stagger: number) => ({ transition: { staggerChildren: stagger, delayChildren: 0.08 } }),
};

const child: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/** Staggered/sequential entrance for a list of children. */
export function Stagger({
  children,
  stagger = 0.09,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={child}>
      {children}
    </motion.div>
  );
}
