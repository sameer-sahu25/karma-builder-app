import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FileIcon, MailIcon } from "./icons";

export function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  const btn1WrapRef = useRef<HTMLDivElement>(null);
  const btn2WrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll<HTMLElement>("[data-word]");
        if (words.length) {
          words.forEach((word) => {
            const inner = word.querySelector<HTMLElement>("[data-word-inner]");
            if (inner) {
              gsap.fromTo(
                inner,
                { yPercent: 110 },
                {
                  yPercent: 0,
                  duration: 0.9,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 82%",
                    once: true,
                  },
                },
              );
            }
          });
          gsap.fromTo(
            words,
            { opacity: 0 },
            {
              opacity: 1,
              stagger: 0.06,
              duration: 0.2,
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                once: true,
              },
            },
          );
        }
      }

      const setupButton = (
        btn: HTMLAnchorElement | null,
        wrap: HTMLDivElement | null,
      ) => {
        if (!btn) return;

        const icon = btn.querySelector<SVGSVGElement>("svg");
        const underline = wrap?.querySelector<SVGPathElement>("[data-underline]") || null;

        const enterTl = gsap.timeline({ paused: true, defaults: { duration: 0.26, ease: "power2.out" } });

        if (icon) {
          enterTl.to(icon, { x: 4, rotate: 12 }, 0);
        }
        enterTl.to(btn, { scale: 1.04, y: -2 }, 0);
        if (underline) {
          enterTl.fromTo(underline, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.26, ease: "power2.out" }, 0);
        }

        const pressTl = gsap.timeline({ paused: true, defaults: { duration: 0.12, ease: "power2.out" } });
        pressTl.to(btn, { scale: 0.97, y: 1 });

        const onEnter = () => enterTl.play();
        const onLeave = () => {
          enterTl.reverse();
          pressTl.reverse();
        };
        const onDown = () => pressTl.play();
        const onUp = () => pressTl.reverse();

        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        btn.addEventListener("mousedown", onDown);
        btn.addEventListener("mouseup", onUp);
        btn.addEventListener("touchstart", onDown, { passive: true });
        btn.addEventListener("touchend", onUp, { passive: true });

        return () => {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
          btn.removeEventListener("mousedown", onDown);
          btn.removeEventListener("mouseup", onUp);
          btn.removeEventListener("touchstart", onDown);
          btn.removeEventListener("touchend", onUp);
        };
      };

      const cleanup1 = setupButton(btn1Ref.current, btn1WrapRef.current);
      const cleanup2 = setupButton(btn2Ref.current, btn2WrapRef.current);

      return () => {
        cleanup1?.();
        cleanup2?.();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Let's", "Build", "Something", "Together"];

  return (
    <section ref={sectionRef} className="relative py-28 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center reveal">
        <h2
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
        >
          {headlineWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              data-word
              className="inline-block mr-3 md:mr-5 last:mr-0 overflow-hidden align-bottom"
              style={{ display: i === 2 ? "block" : "inline-block" }}
            >
              <span data-word-inner className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
          Open to strategic collaborations in AI driven systems and scalable full Stack Engineering.
          <br className="hidden sm:inline" />
          Let's transform ambitious ideas into production ready solutions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div ref={btn1WrapRef} className="relative">
            <Link
              ref={btn1Ref}
              to="/contact"
              className="inline-flex items-center space-x-2.5 px-7 py-3 rounded-full bg-invert text-invert-foreground font-semibold text-sm shadow-xl"
            >
              <MailIcon className="w-4 h-4" />
              <span>Hire Me</span>
            </Link>
            <svg
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[70%] h-2 pointer-events-none text-accent"
              viewBox="0 0 120 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                data-underline
                d="M 4 4 Q 60 0 116 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                pathLength={1}
                style={{ strokeDasharray: "1 1", strokeDashoffset: 1 }}
              />
            </svg>
          </div>

          <div ref={btn2WrapRef} className="relative">
            <a
              ref={btn2Ref}
              href="/sameersahuresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              type="application/pdf"
              className="inline-flex items-center space-x-2.5 px-7 py-3 rounded-full bg-surface border border-border-strong font-semibold text-sm shadow-xl"
            >
              <FileIcon className="w-4 h-4" />
              <span>View My Resume</span>
            </a>
            <svg
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] h-2 pointer-events-none text-accent"
              viewBox="0 0 160 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                data-underline
                d="M 4 4 Q 80 0 156 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                pathLength={1}
                style={{ strokeDasharray: "1 1", strokeDashoffset: 1 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
