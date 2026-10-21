import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { usePlatform, type Platform } from "@/hooks/use-platform";
import { useSafeArea } from "@/hooks/use-safe-area";
import {
  CompassIcon,
  DotsIcon,
  GridIcon,
  HomeIcon,
  UserCircleIcon,
} from "@/components/portfolio/icons";

export type MobileTabId = "home" | "discover" | "projects" | "about" | "more";

export interface MobileTabItem {
  id: MobileTabId;
  label: string;
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
  target?: string;
}

export interface MobileBottomNavProps {
  activeTab: MobileTabId;
  onTabChange?: (tab: MobileTabId) => void;
  onOpenMore?: () => void;
  className?: string;
}

const TABS: MobileTabItem[] = [
  { id: "home", label: "Home", Icon: HomeIcon, href: "#hero" },
  { id: "discover", label: "Explore", Icon: CompassIcon, href: "#focus" },
  { id: "projects", label: "Projects", Icon: GridIcon, href: "#projects" },
  { id: "about", label: "About", Icon: UserCircleIcon, href: "#journey" },
  { id: "more", label: "More", Icon: DotsIcon },
];

const SPRING_IOS = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.7 };
const SPRING_ANDROID = { type: "spring" as const, stiffness: 520, damping: 34, mass: 0.55 };

function selectTransition(platform: Platform, reduced: boolean) {
  if (reduced) return { duration: 0 };
  return platform === "ios" ? SPRING_IOS : SPRING_ANDROID;
}

function Ripple({
  x,
  y,
  keyId,
  onDone,
}: {
  x: number;
  y: number;
  keyId: number;
  onDone: (id: number) => void;
}) {
  useEffect(() => {
    const id = window.setTimeout(() => onDone(keyId), 550);
    return () => window.clearTimeout(id);
  }, [keyId, onDone]);
  return (
    <motion.span
      className="absolute rounded-full bg-accent/30 pointer-events-none"
      style={{ left: x - 48, top: y - 48, width: 96, height: 96 }}
      initial={{ opacity: 0.55, scale: 0.2 }}
      animate={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    />
  );
}

export function MobileBottomNav({
  activeTab,
  onTabChange,
  onOpenMore,
  className,
}: MobileBottomNavProps) {
  const platform = usePlatform();
  const safe = useSafeArea();
  const reduceMotion = !!useReducedMotion();
  const transition = useMemo(() => selectTransition(platform, reduceMotion), [platform, reduceMotion]);
  const isIOS = platform === "ios";
  const isAndroid = platform === "android";

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleCounter = useRef(0);

  const pushRipple = useCallback((ev: React.MouseEvent | React.PointerEvent) => {
    const target = ev.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = "clientX" in ev ? ev.clientX - rect.left : rect.width / 2;
    const y = "clientY" in ev ? ev.clientY - rect.top : rect.height / 2;
    rippleCounter.current += 1;
    const id = rippleCounter.current;
    setRipples((r) => [...r, { id, x, y }]);
  }, []);

  const removeRipple = useCallback((id: number) => {
    setRipples((r) => r.filter((x) => x.id !== id));
  }, []);

  const handleClick = useCallback(
    (tab: MobileTabItem, ev: React.MouseEvent<HTMLButtonElement>) => {
      if (isAndroid && !reduceMotion) pushRipple(ev);
      if (tab.id === "more") {
        onOpenMore?.();
      } else {
        if (tab.href) {
          const anchor = document.querySelector<HTMLElement>(tab.href);
          if (anchor) {
            ev.preventDefault();
            anchor.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
          } else {
            ev.preventDefault();
            if (tab.id === "home") {
              window.location.href = "/";
            } else {
              window.location.href = `/${tab.href}`;
            }
          }
        }
        onTabChange?.(tab.id);
      }
    },
    [isAndroid, reduceMotion, pushRipple, onOpenMore, onTabChange],
  );

  const activeIndex = useMemo(
    () => TABS.findIndex((t) => t.id === activeTab),
    [activeTab],
  );

  const navRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!navRef.current || typeof document === "undefined") return undefined;
    const root = document.documentElement;
    const prev = root.style.getPropertyValue("--mobile-nav-h");
    const h = navRef.current.getBoundingClientRect().height;
    root.style.setProperty("--mobile-nav-h", `${h}px`);
    return () => {
      if (root.style.getPropertyValue("--mobile-nav-h") === `${h}px`) {
        root.style.setProperty("--mobile-nav-h", prev);
      }
    };
  }, [safe.bottom]);

  const showLabels = platform !== "android";

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none h-[calc(64px+env(safe-area-inset-bottom))] sm:hidden"
      />
      <motion.nav
        ref={navRef}
        role="tablist"
        aria-label="Primary navigation"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 sm:hidden",
          "border-t border-border bg-surface/90 backdrop-blur-xl",
          isIOS && "rounded-t-[22px]",
          isAndroid && "rounded-t-none shadow-[0_-4px_18px_rgba(0,0,0,0.35)]",
          className,
        )}
        initial={reduceMotion ? false : { y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ paddingBottom: safe.bottom }}
      >
        <ul className="relative mx-auto grid max-w-[520px] grid-cols-5 items-stretch px-1.5 pt-2 pb-1">
          <AnimatePresence>
            {isIOS && activeIndex >= 0 && !reduceMotion && (
              <motion.li
                aria-hidden="true"
                className="pointer-events-none absolute top-1.5 h-12"
                layoutId="mobile-active-pill"
                initial={false}
                animate={{}}
                transition={transition}
                style={{
                  left: `calc(${activeIndex} * (100% / 5) + 6px)`,
                  width: "calc((100% / 5) - 12px)",
                }}
              >
                <span className="h-full w-full rounded-full bg-accent/12 border border-accent/30" />
              </motion.li>
            )}
          </AnimatePresence>

          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.Icon;
            return (
              <li key={tab.id} className="flex items-stretch justify-center py-0.5">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={tab.label}
                  onClick={(e) => handleClick(tab, e)}
                  className={cn(
                    "group relative isolate flex w-full min-w-[56px] flex-col items-center justify-center gap-1 rounded-2xl outline-none transition-colors",
                    "min-h-[48px] px-1 py-1.5",
                    "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground active:text-accent/80",
                  )}
                >
                  {isAndroid && (
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      {ripples.map((r) => (
                        <Ripple
                          key={r.id}
                          keyId={r.id}
                          x={r.x}
                          y={r.y}
                          onDone={removeRipple}
                        />
                      ))}
                    </span>
                  )}

                  <motion.span
                    className="relative flex h-7 w-7 items-center justify-center"
                    initial={false}
                    animate={
                      isActive && !reduceMotion
                        ? { scale: isIOS ? 1.08 : 1.04 }
                        : { scale: 1 }
                    }
                    transition={transition}
                  >
                    <Icon
                      className={cn(
                        "h-[22px] w-[22px]",
                        isActive && isIOS && "drop-shadow-[0_0_8px_rgba(56,189,248,0.45)]",
                      )}
                      strokeWidth={isActive ? 2.15 : 1.9}
                    />
                    {isAndroid && isActive && !reduceMotion && (
                      <motion.span
                        className="absolute -bottom-1 h-[3px] w-5 rounded-full bg-accent"
                        layoutId="mobile-active-bar"
                        transition={transition}
                      />
                    )}
                  </motion.span>

                  <span
                    className={cn(
                      "text-center font-mono text-[9.5px] leading-none tracking-[0.06em] uppercase transition-opacity",
                      showLabels ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
                      "max-w-[14ch] truncate",
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
