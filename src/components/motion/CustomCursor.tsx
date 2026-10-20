import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Custom cursor: instant real-time dot + ultra-responsive tight ring. */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ultra-tight spring tracking: zero lag, locked synchronously to mouse
  const ringX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.05 });
  const ringY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.05 });

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const activeRef = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const el = e.target as HTMLElement | null;
      const isTarget = !!el?.closest?.(
        'a, button, [role="button"], input, textarea, select, .cube-stage, [data-cursor="hover"]'
      );
      if (isTarget !== activeRef.current) {
        activeRef.current = isTarget;
        setActive(isTarget);
      }
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y, visible]);

  if (!enabled) return null;

  return (
    <>
      {/* Real-time Center Dot: zero lag, always precisely at cursor tip */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[150] h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Tight follower ring: moves synchronously with the cursor, expands over interactive targets */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[149] rounded-full border border-blue-400/50 bg-blue-500/10 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: active ? 48 : 24,
          height: active ? 48 : 24,
          opacity: visible ? (active ? 0.9 : 0.6) : 0,
          borderColor: active ? "rgba(96, 165, 250, 0.9)" : "rgba(96, 165, 250, 0.4)",
          backgroundColor: active ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.04)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </>
  );
}
