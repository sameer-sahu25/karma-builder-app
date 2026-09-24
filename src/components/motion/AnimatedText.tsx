import { useEffect, useRef, useState, type ElementType } from "react";
import { motion, useInView } from "motion/react";

type Split = "chars" | "words" | "lines";

export function AnimatedText({
  text,
  as: Tag = "span",
  split = "words",
  delay = 0,
  stagger = 0.035,
  className,
  itemClassName,
  itemRef,
}: {
  text: string;
  as?: ElementType;
  split?: Split;
  delay?: number;
  stagger?: number;
  className?: string;
  itemClassName?: string;
  itemRef?: (el: HTMLElement | null, index: number) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const safety = window.setTimeout(() => setForced(true), 1600);
    const raf = window.requestAnimationFrame(() => setForced(true));
    let early: number | undefined;
    if (typeof window !== "undefined" && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 1.2 && rect.bottom >= -120) {
        early = window.requestAnimationFrame(() => setForced(true));
      }
    }
    return () => {
      window.clearTimeout(safety);
      window.cancelAnimationFrame(raf);
      if (early) window.cancelAnimationFrame(early);
    };
  }, []);

  const play = inView || forced;

  const parts =
    split === "chars"
      ? Array.from(text)
      : split === "lines"
        ? text.split("\n")
        : text.split(" ");

  return (
    <Tag className={className}>
      <span ref={ref} className="inline">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className={split === "lines" ? "block" : "inline"}>
          {parts.map((part, i) => (
            <span
              key={`${part}-${i}`}
              className={split === "lines" ? "block overflow-hidden" : "inline-block overflow-hidden align-bottom"}
            >
              <motion.span
                ref={(el) => {
                  if (itemRef) itemRef(el as HTMLElement | null, i);
                }}
                className={`inline-block ${itemClassName ?? ""}`}
                initial={{ y: "0%", opacity: 1, rotateX: 0 }}
                animate={play ? { y: "0%", opacity: 1, rotateX: 0 } : { y: "0%", opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.85,
                  delay: delay + i * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "bottom", transformStyle: "preserve-3d" }}
              >
                {part === " " ? "\u00A0" : part}
                {split === "words" && i < parts.length - 1 ? "\u00A0" : null}
              </motion.span>
            </span>
          ))}
        </span>
      </span>
    </Tag>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>{}[]#$%&*";

export function ScrambleText({
  text,
  className,
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });
  const [forced, setForced] = useState(false);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const safety = window.setTimeout(() => setForced(true), 1600);
    const raf = window.requestAnimationFrame(() => setForced(true));
    let early: number | undefined;
    if (typeof window !== "undefined" && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 1.2 && rect.bottom >= -120) {
        early = window.requestAnimationFrame(() => setForced(true));
      }
    }
    return () => {
      window.clearTimeout(safety);
      window.cancelAnimationFrame(raf);
      if (early) window.cancelAnimationFrame(early);
    };
  }, []);

  const started = inView || forced;

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 2);
      setOut(
        Array.from(text)
          .map((c, i) => (i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (settled >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [started, text, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
