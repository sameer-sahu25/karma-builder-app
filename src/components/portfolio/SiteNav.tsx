import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileNav } from "@/components/mobile/use-mobile-nav";
import { getLenis } from "@/components/motion/SmoothScroll";
import { ChevronDownIcon, ExpandIcon, FileIcon, GlobeIcon, MenuIcon, MoonIcon, RobotIcon, SunIcon } from "./icons";

const aboutLinks = [
  { label: "Projects", detail: "Explore my latest builds", id: "projects", icon: "↗" },
  { label: "Experience", detail: "My professional journey", id: "journey", icon: "▣" },
  { label: "Skills", detail: "Technical expertise", id: "tech-stack", icon: "◈" },
  { label: "Achievements", detail: "Milestones reached", id: "certifications", icon: "♜" },
];

function useClock() {
  const [time, setTime] = useState<string>("--:--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const toolButton =
  "w-9 h-9 rounded-full bg-surface/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-110 active:scale-90 transition-all";

export function SiteNav() {
  const time = useClock();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isMobile = useIsMobile();
  const { openSheet } = useMobileNav();
  const location = useLocation();
  const pathname = location.pathname;
  const isHome = pathname === "/" || pathname === "";
  const isContact = pathname.startsWith("/contact");

  const scrollToId = (id: string, e?: React.MouseEvent) => {
    if (isHome) {
      if (e) e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { offset: -90, duration: 1.4 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light") setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  };

  return (
    <header className="sticky top-6 z-50 w-full px-4 sm:px-8">
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="bg-surface/80 backdrop-blur-md border border-border px-4 py-2 rounded-full font-mono text-sm tracking-wider font-semibold text-foreground/90 shadow-lg hover:border-accent/50 transition-colors">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald mr-2 animate-ping align-middle" />
          <span>{time}</span>
        </div>

        {isMobile && (
          <button
            type="button"
            onClick={openSheet}
            className={toolButton}
            title="Open menu"
            aria-label="Open menu"
          >
            <MenuIcon className="w-4 h-4" />
          </button>
        )}

        <div className="hidden sm:flex bg-surface/80 backdrop-blur-md border border-border p-1.5 rounded-full items-center space-x-1 shadow-lg">
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                const lenis = getLenis();
                if (lenis) lenis.scrollTo(0, { duration: 1.2 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition hover:scale-105 active:scale-95 duration-200 ${
              isHome
                ? "bg-muted text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>
          <div className="group relative">
            <Link
              to="/"
              hash="focus"
              onClick={(e) => scrollToId("focus", e)}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition hover:scale-105 duration-200"
            >
              <span>About</span>
              <ChevronDownIcon className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-3 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl">
                {aboutLinks.map((item, index) => (
                  <Link
                    key={item.label}
                    to="/"
                    hash={item.id}
                    onClick={(e) => scrollToId(item.id, e)}
                    className={`${index < 2 ? "min-h-32" : "min-h-24"} relative overflow-hidden rounded-xl border border-border bg-surface/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-muted/70`}
                  >
                    <span className="absolute right-4 top-4 text-xl text-subtle" aria-hidden="true">{item.icon}</span>
                    <span className="flex h-8 w-8 items-center justify-center text-muted-foreground" aria-hidden="true">
                      {index === 0 ? <RobotIcon className="h-6 w-6" /> : index === 1 ? <FileIcon className="h-6 w-6" /> : item.icon}
                    </span>
                    <strong className="mt-5 block text-base text-foreground">{item.label}</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            to="/"
            hash="projects"
            onClick={(e) => scrollToId("projects", e)}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition hover:scale-105 duration-200"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition hover:scale-105 duration-200 ${
              isContact
                ? "bg-muted text-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <button type="button" onClick={toggleFullscreen} className={toolButton} title="Toggle fullscreen" aria-label="Toggle fullscreen">
            <ExpandIcon className="w-4 h-4" />
          </button>
          <button type="button" className={toolButton} title="Language" aria-label="Language">
            <GlobeIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className={toolButton}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
