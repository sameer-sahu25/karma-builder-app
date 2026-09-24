import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const words = ["APPLIED AI", "SCALABLE DATA", "SOFTWARE", "ENGINEERING"];

export function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finish = () => {
      setOpen(false);
      try {
        document.body.style.overflow = "";
      } catch {
        /* no-op */
      }
      try {
        onDone?.();
      } catch {
        /* no-op */
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(100);
      finish();
      return undefined;
    }

    try {
      document.body.style.overflow = "hidden";
    } catch {
      /* no-op */
    }

    let cancelled = false;
    let value = 0;
    let intervalId: number | undefined;

    const HARD_TIMEOUT_MS = 2800;
    const safetyTimeoutId = window.setTimeout(() => {
      if (cancelled) return;
      cancelled = true;
      if (intervalId !== undefined) window.clearInterval(intervalId);
      setCount(100);
      window.setTimeout(finish, 200);
    }, HARD_TIMEOUT_MS);

    intervalId = window.setInterval(() => {
      if (cancelled) return;
      value = Math.min(100, value + Math.random() * 9 + 3);
      setCount(Math.round(value));
      if (value >= 100) {
        cancelled = true;
        if (intervalId !== undefined) window.clearInterval(intervalId);
        window.clearTimeout(safetyTimeoutId);
        window.setTimeout(finish, 450);
      }
    }, 90);

    return () => {
      cancelled = true;
      if (intervalId !== undefined) window.clearInterval(intervalId);
      window.clearTimeout(safetyTimeoutId);
      try {
        document.body.style.overflow = "";
      } catch {
        /* no-op */
      }
    };
  }, [onDone]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const t = window.setTimeout(() => {
      try {
        document.documentElement.dataset["preloaded"] = "true";
      } catch {
        /* no-op */
      }
    }, 3200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden h-[1.2em]">
            <motion.div
              animate={{ y: ["0%", "-25%", "-50%", "-75%"] }}
              transition={{ duration: 1.8, times: [0, 0.33, 0.66, 1], ease: "easeInOut" }}
              className="flex flex-col text-3xl sm:text-5xl font-black tracking-tight leading-[1.2em]"
            >
              {words.map((w) => (
                <span key={w} className="text-metallic">
                  {w}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="mt-10 w-56 h-px bg-border relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              animate={{ width: `${count}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
          <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-muted-foreground tabular-nums">
            {String(count).padStart(3, "0")}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
