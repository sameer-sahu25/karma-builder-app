import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ExpandIcon, GlobeIcon, SunIcon } from "./icons";

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
          <a
            href="#focus"
            className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition hover:scale-105 duration-200 group"
          >
            <span>About</span>
            <ChevronDownIcon className="w-3 h-3 transition-transform group-hover:rotate-180" />
          </a>
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
