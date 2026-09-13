import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useReveal } from "@/hooks/use-reveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/motion/Preloader";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ShaderBackground } from "@/components/motion/ShaderBackground";
import { SiteNav } from "@/components/portfolio/SiteNav";
import { Hero } from "@/components/portfolio/Hero";
import { CoreFocus } from "@/components/portfolio/CoreFocus";
import { Stats } from "@/components/portfolio/Stats";
import { TechStack } from "@/components/portfolio/TechStack";
import { Disciplines } from "@/components/portfolio/Disciplines";
import { Projects } from "@/components/portfolio/Projects";
import { Journey } from "@/components/portfolio/Journey";
import { Certifications } from "@/components/portfolio/Certifications";
import { GithubEcosystem } from "@/components/portfolio/GithubEcosystem";
import { DigitalReality } from "@/components/portfolio/DigitalReality";
import { Marquee } from "@/components/portfolio/Marquee";
import { CallToAction } from "@/components/portfolio/CallToAction";
import { SiteFooter } from "@/components/portfolio/SiteFooter";


const title = "Sameer Sahu — AI & ML Engineer";
const description =
  "Portfolio of Sameer Sahu: applied AI, scalable data platforms and robust software engineering — RAG systems, deep learning and full-stack architecture.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-linear-to-r from-accent via-foreground to-amber transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Index() {
  useReveal();

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-invert selection:text-invert-foreground">
      <SmoothScroll />
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <ShaderBackground className="fixed inset-0 -z-20 pointer-events-none w-full h-full opacity-70" />
      <div className="fixed inset-0 -z-10 pointer-events-none ambient-field opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 -z-10 pointer-events-none grid-field opacity-50" aria-hidden="true" />

      <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center" aria-hidden="true">
        <div className="bg-invert text-invert-foreground text-[10px] font-bold tracking-[0.22em] uppercase py-5 px-2 rounded-r-2xl shadow-2xl vertical-badge select-none transition-all duration-300 hover:pl-3">
          Available For Opportunity
        </div>
      </aside>

      <SiteNav />

      <main>
        <Hero />
        <CoreFocus />
        <Stats />
        <TechStack />
        <Disciplines />
        <DigitalReality />
        <Projects />
        <Journey />
        <Certifications />
        <GithubEcosystem />
      </main>

      <Marquee />
      <CallToAction />
      <SiteFooter />

    </div>
  );
}
