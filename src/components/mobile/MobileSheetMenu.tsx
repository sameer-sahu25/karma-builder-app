import { useCallback, useMemo, type ComponentType } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { usePlatform, type Platform } from "@/hooks/use-platform";
import { useSafeArea } from "@/hooks/use-safe-area";
import {
  ChevronRightIcon,
  CloseIcon,
  CompassIcon,
  ExpandIcon,
  FileIcon,
  GlobeIcon,
  GridIcon,
  HomeIcon,
  MoonIcon,
  RobotIcon,
  SunIcon,
} from "@/components/portfolio/icons";

export interface MobileSheetMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  onToggleFullscreen?: () => void;
}

type SheetAction = {
  id: string;
  label: string;
  detail?: string;
  href?: string;
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  accent?: string;
};

const QUICK_ACTIONS: SheetAction[] = [
  {
    id: "projects",
    label: "Projects",
    detail: "Selected work & case studies",
    href: "#projects",
    Icon: GridIcon,
    accent: "text-sky-400",
  },
  {
    id: "journey",
    label: "Experience",
    detail: "Professional journey",
    href: "#journey",
    Icon: FileIcon,
    accent: "text-amber",
  },
  {
    id: "stack",
    label: "Skills",
    detail: "Technical expertise",
    href: "#tech-stack",
    Icon: CompassIcon,
    accent: "text-emerald",
  },
  {
    id: "certifications",
    label: "Achievements",
    detail: "Certifications & milestones",
    href: "#certifications",
    Icon: RobotIcon,
    accent: "text-fuchsia-400",
  },
];

const iosSpring = { type: "spring" as const, stiffness: 420, damping: 36, mass: 0.9 };
const androidSpring = { type: "spring" as const, stiffness: 520, damping: 40, mass: 0.75 };

function pickSheetTransition(platform: Platform, reduced: boolean) {
  if (reduced) return { duration: 0 };
  return platform === "ios" ? iosSpring : androidSpring;
}

export function MobileSheetMenu({
  open,
  onOpenChange,
  theme = "dark",
  onToggleTheme,
  onToggleFullscreen,
}: MobileSheetMenuProps) {
  const platform = usePlatform();
  const safe = useSafeArea();
  const reduceMotion = !!useReducedMotion();
  const transition = useMemo(() => pickSheetTransition(platform, reduceMotion), [platform, reduceMotion]);
  const dragControls = useDragControls();
  const isIOS = platform === "ios";
  const isAndroid = platform === "android";

  const closeByDrag = useCallback(() => onOpenChange(false), [onOpenChange]);

  const handleAction = useCallback(
    (action: SheetAction) => {
      onOpenChange(false);
      const targetId = action.id === "stack" ? "tech-stack" : action.id;
      const el = document.getElementById(targetId);
      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }, isAndroid ? 180 : 280);
      } else {
        window.setTimeout(() => {
          window.location.href = `/#${targetId}`;
        }, 150);
      }
    },
    [onOpenChange, reduceMotion, isAndroid],
  );

  const radiusClass = isIOS ? "rounded-t-[28px]" : "rounded-t-[18px]";
  const snapHeight = isIOS ? "min-h-[62vh]" : "min-h-[58vh]";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal>
      <DialogPrimitive.Portal forceMount>
        <AnimatePresence>
          {open && (
            <>
              <DialogPrimitive.Overlay
                asChild
                onClick={() => onOpenChange(false)}
              >
                <motion.div
                  key="sheet-overlay"
                  className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm sm:hidden"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
                />
              </DialogPrimitive.Overlay>

              <DialogPrimitive.Content asChild aria-describedby={undefined}>
                <motion.div
                  key="sheet-panel"
                  className={cn(
                    "fixed inset-x-0 bottom-0 z-[61] sm:hidden",
                    "border-t border-border bg-surface/95 backdrop-blur-xl",
                    radiusClass,
                    "shadow-[0_-20px_60px_rgba(0,0,0,0.45)]",
                    snapHeight,
                    "flex flex-col",
                  )}
                  initial={reduceMotion ? false : { y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={transition}
                  drag="y"
                  dragControls={dragControls}
                  dragListener={!reduceMotion && isIOS}
                  dragConstraints={{ top: 0 }}
                  dragElastic={{ top: 0.05, bottom: 0.6 }}
                  onDragEnd={(_e, info) => {
                    if (info.offset.y > 120 || info.velocity.y > 420) {
                      closeByDrag();
                    }
                  }}
                  style={{ paddingBottom: safe.bottom, willChange: "transform" }}
                >
                  <div
                    className="flex w-full items-center justify-center pt-3 pb-1 touch-none"
                    onPointerDown={(e) => dragControls.start(e)}
                  >
                    <span
                      className={cn(
                        "h-1.5 rounded-full bg-muted-foreground/30",
                        isIOS ? "w-10" : "w-8",
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex items-center justify-between px-5 pt-1.5 pb-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                        Navigation
                      </p>
                      <h2 className="mt-1 text-lg font-bold tracking-tight">
                        Sameer Sahu
                      </h2>
                    </div>
                    <DialogPrimitive.Close asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full",
                          "bg-surface-2 border border-border text-muted-foreground",
                          "hover:text-foreground hover:border-border-strong",
                          "active:scale-95 transition-colors",
                        )}
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </DialogPrimitive.Close>
                  </div>

                  <div className="px-4 pb-3">
                    <ul className="grid grid-cols-1 gap-2.5">
                      {QUICK_ACTIONS.map((a, i) => (
                        <li key={a.id}>
                          <button
                            type="button"
                            onClick={() => handleAction(a)}
                            className={cn(
                              "group flex w-full items-center gap-3 rounded-2xl border border-border",
                              "bg-surface/80 px-3.5 py-3 text-left",
                              "transition hover:border-border-strong hover:bg-muted/60",
                              "active:scale-[0.992]",
                            )}
                            style={{
                              transitionDelay: reduceMotion ? undefined : `${i * 20}ms`,
                            }}
                          >
                            <span
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                "bg-surface-2 border border-border",
                                a.accent,
                              )}
                            >
                              <a.Icon className="h-5 w-5" strokeWidth={1.9} />
                            </span>
                            <span className="flex min-w-0 flex-1 flex-col">
                              <span className="text-sm font-semibold tracking-tight">
                                {a.label}
                              </span>
                              {a.detail && (
                                <span className="truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-subtle">
                                  {a.detail}
                                </span>
                              )}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mx-4 my-1 h-px bg-border" role="separator" />

                  <div className="px-4 pt-3 pb-2">
                    <p className="px-1 font-mono text-[10px] uppercase tracking-[0.24em] text-subtle">
                      Quick settings
                    </p>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      <a
                        href="/"
                        onClick={() => onOpenChange(false)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface/80 px-1.5 py-3",
                          "transition hover:border-border-strong hover:bg-muted/60 active:scale-95 text-center",
                        )}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-foreground">
                          <HomeIcon className="h-4 w-4" />
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-subtle">
                          Home
                        </span>
                      </a>

                      <a
                        href="/contact"
                        onClick={() => onOpenChange(false)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface/80 px-1.5 py-3",
                          "transition hover:border-border-strong hover:bg-muted/60 active:scale-95 text-center",
                        )}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-foreground">
                          <GlobeIcon className="h-4 w-4" />
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-subtle">
                          Contact
                        </span>
                      </a>

                      <button
                        type="button"
                        onClick={onToggleTheme}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface/80 px-1.5 py-3",
                          "transition hover:border-border-strong hover:bg-muted/60 active:scale-95 text-center",
                        )}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-foreground">
                          {theme === "dark" ? (
                            <SunIcon className="h-4 w-4" />
                          ) : (
                            <MoonIcon className="h-4 w-4" />
                          )}
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-subtle">
                          {theme === "dark" ? "Light" : "Dark"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={onToggleFullscreen}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface/80 px-1.5 py-3",
                          "transition hover:border-border-strong hover:bg-muted/60 active:scale-95 text-center",
                        )}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 border border-border text-muted-foreground">
                          <ExpandIcon className="h-4 w-4" />
                        </span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-subtle truncate">
                          Screen
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-auto px-5 pb-3 pt-4">
                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-subtle">
                      v2026.09 · Obsidian Tech
                    </p>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
