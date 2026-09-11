import { useEffect, useRef, useState, type ElementType } from "react";
import { motion, useInView } from "motion/react";

type Split = "chars" | "words" | "lines";

/** Mask-reveal text: characters / words / lines slide up from behind a clip mask, staggered. */
export function AnimatedText({
  text,
  as: Tag = "span",
  split = "words",
  delay = 0,
  stagger = 0.035,
  className,
  itemClassName,
}: {
  text: string;
  as?: ElementType;
  split?: Split;
  delay?: number;
  stagger?: number;
  className?: string;
  itemClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

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
                className={`inline-block ${itemClassName ?? ""}`}
                initial={{ y: "115%", opacity: 0, rotateX: -55 }}
                animate={inView ? { y: "0%", opacity: 1, rotateX: 0 } : undefined}
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

/** Decode/scramble reveal — settles one character at a time. */
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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, text, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
