import { useEffect, useState } from "react";

export interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const ZERO: SafeAreaInsets = { top: 0, right: 0, bottom: 0, left: 0 };

function parsePx(value: string | undefined | null): number {
  if (!value || value === "env(safe-area-inset-)" || value === "0px") return 0;
  const match = value.match(/^(-?\d*\.?\d+)px$/);
  if (!match || !match[1]) return 0;
  return parseFloat(match[1]);
}

export function useSafeArea(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>(ZERO);

  useEffect(() => {
    if (typeof window === "undefined") {
      setInsets(ZERO);
      return;
    }

    let probe: HTMLDivElement | null = document.createElement("div");
    probe.setAttribute(
      "style",
      "position:fixed;visibility:hidden;pointer-events:none;" +
        "top:env(safe-area-inset-top);" +
        "right:env(safe-area-inset-right);" +
        "bottom:env(safe-area-inset-bottom);" +
        "left:env(safe-area-inset-left);",
    );
    document.body.appendChild(probe);

    const measure = () => {
      if (!probe) return;
      const style = window.getComputedStyle(probe);
      setInsets({
        top: parsePx(style.top),
        right: parsePx(style.right),
        bottom: parsePx(style.bottom),
        left: parsePx(style.left),
      });
    };

    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (probe && probe.parentNode) probe.parentNode.removeChild(probe);
      probe = null;
    };
  }, []);

  return insets;
}
