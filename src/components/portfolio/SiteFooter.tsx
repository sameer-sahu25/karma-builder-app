import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpIcon, CameraIcon, GithubIcon, InstagramIcon, LinkedinIcon, RedditIcon } from "./icons";

const dock =
  "w-9 h-9 rounded-full bg-surface/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong hover:scale-110 active:scale-95 transition-all";

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const iconsRef = useRef<HTMLAnchorElement[]>([]);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const arrowBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = footerRef.current;
    if (!footer) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const ctx = gsap.context(() => {
      const rawIcons = [
        ...iconsRef.current,
        moreBtnRef.current,
        arrowBtnRef.current,
      ];
      const allIcons: HTMLElement[] = [];
      rawIcons.forEach((el) => {
        if (el) allIcons.push(el as HTMLElement);
      });

      if (allIcons.length) {
        gsap.fromTo(
          allIcons,
          { opacity: 0, y: 18, rotateZ: -12, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            scale: 1,
            stagger: 0.07,
            duration: 0.75,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: footer,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      const setupHover = (el: HTMLElement, idx: number) => {
        const hoverTl = gsap.timeline({ paused: true, defaults: { duration: 0.28, ease: "back.out(2)" } });
        hoverTl.to(el, { y: -5, rotate: 8 + (idx % 3) * 4 });

        const onEnter = () => hoverTl.play();
        const onLeave = () => hoverTl.reverse();

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        };
      };

      const cleanups: (() => void)[] = [];
      allIcons.forEach((icon, idx) => {
        const c = setupHover(icon, idx);
        if (c) cleanups.push(c);
      });

      return () => {
        cleanups.forEach((c) => c());
      };
    }, footer);

    return () => ctx.revert();
  }, []);

  const registerIcon = (el: HTMLAnchorElement | null, idx: number) => {
    if (el) iconsRef.current[idx] = el;
  };

  return (
    <footer ref={footerRef} id="contact" className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto mb-6 text-muted-foreground">
      <div className="bg-surface-2/90 border border-border rounded-3xl md:rounded-full px-6 py-3.5 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-mono tracking-widest uppercase">© 2026 All rights reserved.</p>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a ref={(el) => registerIcon(el, 0)} href="https://github.com" target="_blank" rel="noreferrer" className={dock} title="GitHub" aria-label="GitHub">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a ref={(el) => registerIcon(el, 1)} href="https://linkedin.com" target="_blank" rel="noreferrer" className={dock} title="LinkedIn" aria-label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a ref={(el) => registerIcon(el, 2)} href="https://instagram.com" target="_blank" rel="noreferrer" className={dock} title="Instagram" aria-label="Instagram">
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a ref={(el) => registerIcon(el, 3)} href="/#projects" className={dock} title="Gallery" aria-label="Gallery">
            <CameraIcon className="w-4 h-4" />
          </a>
          <a ref={(el) => registerIcon(el, 4)} href="https://reddit.com" target="_blank" rel="noreferrer" className={dock} title="Reddit" aria-label="Reddit">
            <RedditIcon className="w-4 h-4" />
          </a>
          <button
            ref={moreBtnRef}
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-surface border border-border-strong font-mono text-[10px] font-bold tracking-widest hover:text-foreground hover:scale-105 active:scale-95 transition-all flex items-center space-x-1"
          >
            <span>MORE</span>
            <span className="text-[8px]">▲</span>
          </button>
          <button
            ref={arrowBtnRef}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-9 h-9 bg-invert text-invert-foreground rounded-full shadow-lg flex items-center justify-center transition hover:scale-110 active:scale-95 duration-200"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
