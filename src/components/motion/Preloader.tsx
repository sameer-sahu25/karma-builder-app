import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

declare global {
  interface Window {
    __preloaderStart?: number;
    __preloaderDone?: boolean;
    __finishPreloader?: () => void;
  }
}

const words = ["APPLIED AI", "SCALABLE DATA", "SOFTWARE", "ENGINEERING"];
const TOTAL_DURATION_MS = 2000;

export function Preloader({ onDone }: { onDone?: () => void }) {
  const [open, setOpen] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLParagraphElement>(null);
  const wordIndexRef = useRef(0);
  const finishCalledRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finish = () => {
      if (finishCalledRef.current) return;
      finishCalledRef.current = true;
      setOpen(false);
      try {
        document.documentElement.dataset["preloaded"] = "true";
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

    window.__finishPreloader = finish;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.__preloaderDone) {
      finish();
      return undefined;
    }

    try {
      document.body.style.overflow = "hidden";
    } catch {
      /* no-op */
    }

    // If inline script didn't run (e.g. client-side SPA navigation), run fallback ticker
    let rafId: number | undefined;
    if (!window.__preloaderStart) {
      const startTime = performance.now();
      window.__preloaderStart = startTime;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / TOTAL_DURATION_MS);
        const percentVal = Math.min(100, Math.round(progress * 100));

        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
        if (percentRef.current) {
          percentRef.current.textContent = `${String(percentVal).padStart(3, "0")}%`;
        }

        const nextWordIndex = Math.min(
          words.length - 1,
          Math.floor(progress * words.length)
        );
        if (nextWordIndex !== wordIndexRef.current) {
          wordIndexRef.current = nextWordIndex;
          setWordIndex(nextWordIndex);
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          if (barRef.current) barRef.current.style.transform = "scaleX(1)";
          if (percentRef.current) percentRef.current.textContent = "100%";
          finish();
        }
      };

      rafId = requestAnimationFrame(tick);
    }

    const safetyTimeout = window.setTimeout(finish, TOTAL_DURATION_MS + 200);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(safetyTimeout);
      try {
        document.body.style.overflow = "";
      } catch {
        /* no-op */
      }
    };
  }, [onDone]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center select-none px-4"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Immediate pre-hydration script: starts on frame 0 with 0ms delay */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function(){
  if (typeof window === "undefined") return;
  var D = 2000;
  var W = 4;
  var start = performance.now();
  window.__preloaderStart = start;
  window.__preloaderDone = false;
  var lastIdx = 0;

  function frame(now){
    if (window.__preloaderDone) return;
    var p = Math.min(1, (now - start) / D);
    var b = document.getElementById("preloader-bar");
    if (b) b.style.transform = "scaleX(" + p + ")";
    var t = document.getElementById("preloader-percent");
    if (t) t.textContent = String(Math.min(100, Math.round(p * 100))).padStart(3, "0") + "%";

    var idx = Math.min(W - 1, Math.floor(p * W));
    if (idx !== lastIdx) {
      lastIdx = idx;
      var els = document.querySelectorAll(".preloader-word");
      for (var i = 0; i < els.length; i++) {
        if (i === idx) {
          els[i].style.opacity = "1";
          els[i].style.transform = "translateY(0) scale(1)";
        } else if (i < idx) {
          els[i].style.opacity = "0";
          els[i].style.transform = "translateY(-8px) scale(0.95)";
        } else {
          els[i].style.opacity = "0";
          els[i].style.transform = "translateY(8px) scale(0.95)";
        }
      }
    }

    if (p < 1) {
      requestAnimationFrame(frame);
    } else {
      window.__preloaderDone = true;
      if (typeof window.__finishPreloader === "function") {
        window.__finishPreloader();
      }
    }
  }

  requestAnimationFrame(frame);
})();
`,
            }}
          />

          {/* Word display — spacious, zero-clipping container */}
          <div className="relative min-h-[4rem] sm:min-h-[5rem] w-full max-w-2xl flex items-center justify-center">
            {words.map((word, i) => (
              <span
                key={word}
                data-index={i}
                className={`preloader-word absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-center text-metallic whitespace-nowrap transition-all duration-300 ease-out ${
                  wordIndex === i
                    ? "opacity-100 scale-100 translate-y-0"
                    : wordIndex > i
                    ? "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                }`}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Blue loader bar and percentage together */}
          <div className="mt-10 flex items-center gap-4 w-64 sm:w-80">
            <div className="flex-1 h-[3px] bg-white/10 relative overflow-hidden rounded-full">
              <div
                id="preloader-bar"
                ref={barRef}
                className="h-full w-full bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              />
            </div>

            <span
              id="preloader-percent"
              ref={percentRef}
              suppressHydrationWarning
              className="font-mono text-xs sm:text-sm tracking-[0.15em] text-blue-400 font-semibold tabular-nums shrink-0 min-w-[4ch] text-right"
            >
              000%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
