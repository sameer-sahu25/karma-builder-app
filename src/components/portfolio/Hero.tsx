import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";

import { AnimatedText, ScrambleText } from "@/components/motion/AnimatedText";
import { Magnetic } from "@/components/motion/Magnetic";
import { PendulumCard } from "@/components/motion/PendulumCard";
import { BoltIcon, GithubIcon, InstagramIcon, LinkedinIcon, RobotIcon } from "./icons";

function IdCard() {
  return (
    <div className="mt-12 relative w-full flex flex-col items-center justify-center hero-idcard">
      <motion.div
        className="text-center mb-6"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
          ✦ <ScrambleText text="SUCCES IS THE SUM OF SMALL EFFORTS Repeated DAY IN AND DAY OUT" /> ✦
        </span>
      </motion.div>

      <PendulumCard>
        <div className="w-[260px] sm:w-[300px] rounded-2xl border border-border-strong bg-surface/90 backdrop-blur-md p-5 shadow-2xl hover:scale-[1.03]">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-subtle">
            <span>Dev ID</span>
            <span className="text-emerald">Active</span>
          </div>
          <div className="mt-4 h-32 rounded-xl ambient-field border border-border flex items-center justify-center">
            <RobotIcon className="w-14 h-14 text-amber" />
          </div>
          <p className="mt-4 text-lg font-extrabold tracking-tight">Sameer Sahu</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
            AI • Data • Software
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="block w-[2px] bg-foreground/70"
                  style={{ height: `${10 + ((i * 7) % 14)}px` }}
                />
              ))}
            </div>
            <span className="font-signature text-2xl text-muted-foreground">Sameer</span>
          </div>
        </div>
      </PendulumCard>
    </div>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const introMaskRef = useRef<HTMLDivElement | null>(null);
  const headingsRef = useRef<HTMLDivElement | null>(null);
  const heroBigCharsRef = useRef<HTMLSpanElement[]>([]);
  const ctaNoteRef = useRef<HTMLParagraphElement | null>(null);
  const iconBtnsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: reduced ? 0.1 : 2.35, defaults: { ease: "power3.out" } });

      const introLineEls = introRef.current?.querySelectorAll<HTMLElement>("[data-split='line']");
      if (introMaskRef.current && introLineEls && introLineEls.length) {
        gsap.set(introMaskRef.current, { overflow: "hidden" });
        tl.from(introLineEls, { yPercent: 120, stagger: 0.08, duration: 0.8, ease: "power3.out" }, 0);
        tl.from(introRef.current, { opacity: 0, filter: "blur(10px)", duration: 0.9 }, 0);
      }

      const bigChRows = [
        root.querySelectorAll<HTMLElement>(".hero-head-row-1 .hero-char"),
        root.querySelectorAll<HTMLElement>(".hero-head-row-2 .hero-char"),
        root.querySelectorAll<HTMLElement>(".hero-head-row-3 .hero-char"),
      ];
      if (headingsRef.current) {
        tl.from(headingsRef.current, { opacity: 0, filter: "blur(18px)", duration: 1.2, ease: "power2.out" }, 0.1);
        bigChRows.forEach((row, idx) => {
          if (row && row.length) {
            tl.from(
              row,
              {
                opacity: 0,
                y: 22,
                skewY: -6,
                rotateZ: idx * 0.3,
                filter: "blur(6px)",
                stagger: 0.03,
                duration: 0.9,
                ease: "expo.out",
              },
              0.22 + idx * 0.12,
            );
          }
        });
      }

      if (iconBtnsRef.current.length) {
        tl.from(
          iconBtnsRef.current,
          {
            opacity: 0,
            y: 14,
            rotateZ: -22,
            stagger: 0.08,
            duration: 0.9,
            ease: "back.out(2)",
          },
          0.5,
        );
      }

      if (ctaNoteRef.current) {
        tl.from(ctaNoteRef.current, { opacity: 0, x: 28, duration: 0.9, ease: "power3.out" }, 0.95);
      }

      const idcard = root.querySelector<HTMLElement>(".hero-idcard");
      if (idcard) {
        tl.from(
          idcard,
          { opacity: 0, y: 46, scale: 0.94, filter: "blur(14px)", duration: 1.15, ease: "expo.out" },
          0.85,
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const registerChar = (el: HTMLElement | null, i: number) => {
    if (el) heroBigCharsRef.current[i] = el;
  };

  return (
    <section ref={rootRef} id="hero" className="relative pt-12 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden hero-glow">
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-6 reveal">
          <div ref={introMaskRef} className="md:col-span-4">
            <p ref={introRef} className="text-xs font-mono tracking-widest text-muted-foreground leading-relaxed uppercase">
              {"Hi, I'm Sameer Sahu.\nI build scalable systems\npowered by intelligence."
                .split("\n")
                .map((line, i) => (
                  <span
                    key={i}
                    data-split="line"
                    className="block mb-2 first:mt-0 last:mb-0"
                  >
                    {line}
                  </span>
                ))}
            </p>
          </div>
          <div className="md:col-span-8 flex justify-end">
            <Magnetic strength={0.6}>
              <a
                ref={(el) => { if (el) iconBtnsRef.current[0] = el; }}
                href="https://github.com/sameer-sahu25"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="block text-muted-foreground hover:text-foreground transition p-2 hover:bg-surface rounded-full hover:scale-110 active:scale-95"
              >
                <GithubIcon className="w-7 h-7" />
              </a>
            </Magnetic>
          </div>
        </div>


        <h1 className="sr-only">Sameer Sahu — AI & ML Engineer</h1>

        <div className="mt-4 select-none" aria-hidden="true">
          <div ref={headingsRef}>
            <div className="hero-head-row-1 flex justify-end">
              <AnimatedText text="AI & ML" split="chars" stagger={0.045} className="hero-title" itemClassName="text-metallic hero-char" itemRef={registerChar} />
            </div>

            <div className="hero-head-row-2 flex items-center justify-start relative -mt-2 md:-mt-4">
              <Magnetic strength={0.8}>
                <a
                  ref={(el) => { if (el) iconBtnsRef.current[1] = el; }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="absolute -top-6 left-2 text-muted-foreground hover:text-foreground transition hover:scale-125"
                >
                  <LinkedinIcon className="w-6 h-6" />
                </a>
              </Magnetic>
              <div className="flex items-center flex-wrap">
                <AnimatedText
                  text="MACHINE"
                  split="chars"
                  delay={0.15}
                  stagger={0.045}
                  className="hero-title mr-2 md:mr-4"
                  itemClassName="text-metallic hero-char"
                  itemRef={registerChar}
                />
                <motion.span
                  className="inline-flex items-center px-2"
                  animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ rotate: 18, scale: 1.2 }}
                >
                  <BoltIcon className="w-12 h-16 md:w-24 md:h-32 text-accent drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]" />
                </motion.span>
                <AnimatedText
                  text="LEARNING"
                  split="chars"
                  delay={0.3}
                  stagger={0.045}
                  className="hero-title"
                  itemClassName="text-metallic hero-char"
                  itemRef={registerChar}
                />
              </div>
            </div>

            <div className="hero-head-row-3 flex items-center justify-start -mt-2 md:-mt-4 flex-wrap relative">
              <AnimatedText text="EN" split="chars" delay={0.35} stagger={0.045} className="hero-title" itemClassName="text-metallic hero-char" itemRef={registerChar} />
              <span className="mx-2 md:mx-4 inline-flex items-center">
                <motion.span
                  className="border-[5px] md:border-[7px] border-amber bg-amber/10 p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-[0_0_35px_rgba(245,158,11,0.35)] inline-flex"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.14, rotate: -8 }}
                >
                  <RobotIcon className="w-10 h-10 md:w-16 md:h-16 text-amber" />
                </motion.span>
              </span>
              <AnimatedText
                text="GINEER"
                split="chars"
                delay={0.45}
                stagger={0.045}
                className="hero-title"
                itemClassName="text-metallic hero-char"
                itemRef={registerChar}
              />
              <Magnetic strength={0.8}>
                <a
                  ref={(el) => { if (el) iconBtnsRef.current[2] = el; }}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-block ml-4 mb-8 text-subtle hover:text-foreground transition hover:scale-125"
                >
                  <InstagramIcon className="w-7 h-7" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>


        <div className="mt-8 flex justify-end reveal" style={{ "--delay": "0.35s" } as React.CSSProperties}>
          <p ref={ctaNoteRef} className="max-w-xs text-right font-mono text-[11px] tracking-widest text-muted-foreground leading-relaxed uppercase">
            Open to all forms of collaboration, regardless of location and language.
          </p>
        </div>

        <IdCard />
      </div>
    </section>
  );
}
