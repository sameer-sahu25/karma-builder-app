import { useEffect, useState } from "react";

export type Platform = "ios" | "android" | "desktop";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent || "";
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
      ?.platform ||
    (navigator.platform ?? "");

  const isIOS =
    /iPad|iPhone|iPod/.test(platform) ||
    /iPhone|iPad|iPod/.test(ua) ||
    /CriOS|FxiOS|EdgiOS|OPiOS/.test(ua) ||
    (platform === "MacIntel" && typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1);

  if (isIOS) return "ios";

  if (/Android/.test(ua) || /Silk|Kindle/.test(ua)) return "android";

  return "desktop";
}

export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>("desktop");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return platform;
}
