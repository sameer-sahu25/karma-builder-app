import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import { MobileSheetMenu } from "@/components/mobile/MobileSheetMenu";
import { MobileNavProvider, useMobileNav } from "@/components/mobile/use-mobile-nav";
import { useIsMobile } from "@/hooks/use-mobile";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("Root boundary error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0e0f11" },
      { title: "Sameer Sahu — AI & ML Engineer" },
      {
        name: "description",
        content: "Applied AI, scalable data platforms and robust software engineering.",
      },
      { name: "author", content: "Sameer Sahu" },
      { property: "og:title", content: "Sameer Sahu — AI & ML Engineer" },
      {
        property: "og:description",
        content: "Applied AI, scalable data platforms and robust software engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@sameersahu" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Caveat:wght@600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "any",
        href: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimalist%20professional%20monogram%20logo%20letters%20SS%20for%20Sameer%20Sahu%20AI%20machine%20learning%20engineer%2C%20deep%20navy%20indigo%20with%20electric%20violet%20accent%2C%20clean%20geometric%20swiss%20design%2C%20subtle%20neural%20network%20nodes%20integrated%20into%20letterforms%2C%20solid%20white%20background%2C%20high%20contrast%2C%20perfect%20square%20icon&image_size=square_hd",
      },
      {
        rel: "apple-touch-icon",
        href: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimalist%20professional%20monogram%20logo%20letters%20SS%20for%20Sameer%20Sahu%20AI%20machine%20learning%20engineer%2C%20deep%20navy%20indigo%20with%20electric%20violet%20accent%2C%20clean%20geometric%20swiss%20design%2C%20subtle%20neural%20network%20nodes%20integrated%20into%20letterforms%2C%20solid%20white%20background%2C%20high%20contrast%2C%20perfect%20square%20icon&image_size=square_hd",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function MobileNavShell() {
  const isMobile = useIsMobile();
  const { activeTab, setActiveTab, sheetOpen, openSheet, closeSheet } = useMobileNav();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const apply = () => {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    if (next === "light") root.classList.add("light");
    else root.classList.remove("light");
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      void 0;
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }, []);

  if (!isMobile) return null;

  return (
    <>
      <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} onOpenMore={openSheet} />
      <MobileSheetMenu
        open={sheetOpen}
        onOpenChange={(v) => (v ? openSheet() : closeSheet())}
        theme={theme}
        onToggleTheme={toggleTheme}
        onToggleFullscreen={toggleFullscreen}
      />
    </>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <MobileNavProvider>
          {children}
          <MobileNavShell />
        </MobileNavProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
