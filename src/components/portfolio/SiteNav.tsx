import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ExpandIcon, FileIcon, GlobeIcon, MoonIcon, RobotIcon, SunIcon } from "./icons";

const aboutLinks = [
  { label: "Projects", detail: "Explore my latest builds", href: "#projects", icon: "↗" },
  { label: "Experience", detail: "My professional journey", href: "#journey", icon: "▣" },
  { label: "Skills", detail: "Technical expertise", href: "#tech-stack", icon: "◈" },
  { label: "Achievements", detail: "Milestones reached", href: "#certifications", icon: "♜" },
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

        <div className="hidden sm:flex bg-surface/80 backdrop-blur-md border border-border p-1.5 rounded-full items-center space-x-1 shadow-lg">
          <Link
            to="/"
            className="px-5 py-1.5 rounded-full text-xs font-semibold bg-muted text-foreground transition hover:scale-105 active:scale-95 duration-200"
          >
            Home
          </Link>
          <div className="group relative">
            <a
              href="#focus"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition hover:scale-105 duration-200"
            >
              <span>About</span>
              <ChevronDownIcon className="w-3 h-3 transition-transform group-hover:rotate-180" />
            </a>
            <div className="invisible absolute left-1/2 top-full z-50 w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-3 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl">
                {aboutLinks.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`${index < 2 ? "min-h-32" : "min-h-24"} relative overflow-hidden rounded-xl border border-border bg-surface/75 p-5 transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-muted/70`}
                  >
                    <span className="absolute right-4 top-4 text-xl text-subtle" aria-hidden="true">{item.icon}</span>
                    <span className="flex h-8 w-8 items-center justify-center text-muted-foreground" aria-hidden="true">
                      {index === 0 ? <RobotIcon className="h-6 w-6" /> : index === 1 ? <FileIcon className="h-6 w-6" /> : item.icon}
                    </span>
                    <strong className="mt-5 block text-base text-foreground">{item.label}</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a
            href="#projects"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition hover:scale-105 duration-200"
          >
            Projects
          </a>
          <Link
            to="/contact"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition hover:scale-105 duration-200"
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
          <button type="button" className={toolButton} title="Theme" aria-label="Theme">
            <SunIcon className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
