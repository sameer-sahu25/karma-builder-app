import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Scroll-linked transform: translate / scale / rotate / fade scrubbed by scroll position. */
export function Parallax({
  children,
  speed = 0.25,
  scaleTo = 1,
  rotateTo = 0,
  fade = false,
  className,
}: {
  children: ReactNode;
  /** Positive = moves up faster than scroll, negative = reverse parallax. */
  speed?: number;
  scaleTo?: number;
  rotateTo?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const y = useTransform(p, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  const scale = useTransform(p, [0, 0.5, 1], [1, scaleTo, 1]);
  const rotate = useTransform(p, [0, 1], [-rotateTo, rotateTo]);
  const opacity = useTransform(p, [0, 0.2, 0.8, 1], [0.15, 1, 1, 0.15]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale, rotate, ...(fade ? { opacity } : {}) }}>{children}</motion.div>
    </div>
  );
}

/** Pins a section and scrubs its children's horizontal position with scroll. */
export function ScrollScrubX({
  children,
  distance = 40,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [`${distance}%`, `${-distance}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x }}>{children}</motion.div>
    </div>
  );
}
