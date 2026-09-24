import { useEffect, useRef } from "react";
import * as React from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnimatedText, ScrambleText } from "@/components/motion/AnimatedText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  tag: string;
  accent: string;
  pdf?: string;
};

const certs: Cert[] = [
  {
    title: "AWS Academy Graduate — Machine Learning Foundations",
    issuer: "AWS Academy",
    year: "2026",
    tag: "Training Badge",
    accent: "from-amber/25",
    pdf: "/certs/cert-aws-academy-ml-foundations.pdf",
  },
  {
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "AWS Academy",
    year: "2026",
    tag: "Training Badge",
    accent: "from-accent/25",
    pdf: "/certs/cert-aws-academy-cloud-foundations.pdf",
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    year: "2026",
    tag: "Certificate",
    accent: "from-emerald/25",
    pdf: "/certs/cert-data-analytics-essentials.pdf",
  },
  {
    title: "Learn Python From Scratch",
    issuer: "Certified Program",
    year: "2026",
    tag: "Certificate",
    accent: "from-accent/25",
    pdf: "/certs/cert-learn-python-from-scratch.pdf",
  },
  {
    title: "Programming: Beginner to Advanced",
    issuer: "Accredited Curriculum",
    year: "2026",
    tag: "Certificate",
    accent: "from-amber/25",
    pdf: "/certs/cert-programming-beginner-to-advanced.pdf",
  },
  {
    title: "Programming Fundamentals",
    issuer: "Industry Standard Certification",
    year: "2026",
    tag: "Certificate",
    accent: "from-emerald/25",
    pdf: "/certs/cert-programming-fundamentals.pdf",
  },
  { title: "Deep Learning Specialization", issuer: "BISA AI Academy", year: "2025", tag: "Completion Badge", accent: "from-accent/25" },
  { title: "AWS Educate — Getting Started with Databases", issuer: "Amazon Web Services", year: "2025", tag: "Training Badge", accent: "from-amber/25" },
  { title: "Machine Learning in Production", issuer: "DeepLearning.AI", year: "2024", tag: "Certificate", accent: "from-emerald/25" },
  { title: "Cloud Engineering Foundations", issuer: "Google Cloud", year: "2024", tag: "Certificate", accent: "from-accent/25" },
  { title: "Full-Stack Web Development", issuer: "Dicoding", year: "2024", tag: "Completion Badge", accent: "from-amber/25" },
  { title: "Data Engineering with Python", issuer: "Coursera", year: "2023", tag: "Certificate", accent: "from-emerald/25" },
];

function CertCardContent({
  c,
  hasPdf,
  isActive,
  cardRef,
}: {
  c: Cert;
  hasPdf: boolean;
  isActive: boolean;
  cardRef?: React.RefCallback<HTMLDivElement>;
}) {
  const accentLineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const card = cardRef ? null : accentLineRef.current?.parentElement;
    const line = accentLineRef.current;
    if (!line) return;

    const target = card ?? line.parentElement;
    if (!target) return;

    const handleEnter = () => {
      gsap.to(line, { width: "100%", duration: 0.35, ease: "power3.out" });
    };
    const handleLeave = () => {
      gsap.to(line, { width: "0%", duration: 0.25, ease: "power3.in" });
    };

    target.addEventListener("mouseenter", handleEnter);
    target.addEventListener("mouseleave", handleLeave);

    return () => {
      target.removeEventListener("mouseenter", handleEnter);
      target.removeEventListener("mouseleave", handleLeave);
    };
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative min-h-[320px] rounded-2xl border-2 bg-surface/85 backdrop-blur-md p-6 overflow-hidden group transition-colors duration-400 flex flex-col",
        hasPdf && [
          "cursor-pointer",
          isActive
            ? "border-accent/70 shadow-2xl shadow-accent/20 bg-surface/95"
            : "border-border-strong hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/15 hover:bg-surface/90",
        ],
        !hasPdf && [
          "border-border-strong bg-surface/85 hover:border-border-strong",
        ],
      )}
      style={isActive ? { transform: "scale(1.02)", boxShadow: "0 0 0 2px rgb(56 189 248 / 0.3), 0 25px 50px -12px rgb(0 0 0 / 0.25)" } : undefined}
    >
      <span
        ref={accentLineRef}
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 h-full bg-gradient-to-b from-accent via-amber to-emerald z-10"
        style={{ width: "0%", maxWidth: "4px", borderRadius: "2px 0 0 2px" }}
      />
      <div
        className={cn(
          `h-28 sm:h-32 rounded-xl bg-linear-to-br ${c.accent} to-transparent border border-border flex items-end p-3 sm:p-4 transition-all duration-500 group-hover:scale-[1.03]`,
          hasPdf && "group-hover:shadow-lg group-hover:shadow-black/20",
        )}
      >
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-foreground/80 drop-shadow-sm">
          {c.tag}
        </span>
      </div>
      <div className="flex-1 flex flex-col mt-5">
        <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug min-h-[3.25rem] text-foreground">
          {c.title}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
          <span className="min-w-0 truncate pr-2" title={c.issuer}>{c.issuer}</span>
          <span className="text-accent shrink-0 font-semibold">{c.year}</span>
        </div>
      </div>
      <div
        className={cn(
          "mt-4 flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
          hasPdf && isActive
            ? "opacity-100 text-accent translate-y-0"
            : hasPdf
              ? "opacity-70 text-accent/80 translate-y-0 group-hover:opacity-100 group-hover:text-accent"
              : "opacity-60 text-subtle translate-y-0",
        )}
      >
        <span>
          {hasPdf
            ? isActive
              ? "Viewing Now"
              : "View Certificate"
            : "Credential Verified"}
        </span>
        <span aria-hidden="true" className={cn("transition-transform duration-300", hasPdf && "group-hover:translate-x-0.5")}>
          {hasPdf ? (isActive ? "●" : "↗") : "✓"}
        </span>
      </div>
    </div>
  );
}

function PdfPanel({
  cert,
  onClose,
}: {
  cert: Cert;
  onClose: () => void;
}) {
  if (!cert.pdf) return null;

  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const node = panelRef.current;
    if (node && typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [cert.pdf]);

  return (
    <div
      ref={panelRef}
      className="mt-10 w-full rounded-3xl border border-border-strong bg-surface/80 p-4 backdrop-blur-xl shadow-2xl shadow-black/30 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-background/60 px-4 py-3 sm:px-5 sm:py-4">
        <div className="min-w-0 flex flex-col">
          <h3 className="truncate text-lg font-bold tracking-tight sm:text-xl">
            {cert.title}
          </h3>
          <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            {cert.issuer} · {cert.tag} · {cert.year}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button asChild size="sm" variant="outline">
            <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
          </Button>
          <Button asChild size="sm" variant="default">
            <a href={cert.pdf} download className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onClose}
            aria-label="Close preview"
            className="h-9 w-9 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      <div className="relative mt-4 h-[70vh] min-h-[520px] w-full overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-inner">
        <object
          data={cert.pdf}
          type="application/pdf"
          className="h-full w-full"
          aria-label={`${cert.title} — PDF viewer`}
        >
          <iframe
            src={cert.pdf}
            title={cert.title}
            className="h-full w-full border-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/95 p-8 text-center">
            <p className="text-sm font-semibold">Your browser cannot preview this PDF inline.</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button asChild size="sm" variant="default">
                <a href={cert.pdf} download className="gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
}

export function Certifications() {
  const [openCert, setOpenCert] = React.useState<Cert | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const titleLineRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch {
      /* ignore double registration */
    }

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduced) {
        gsap.set(cards, { y: 28, scale: 0.94, opacity: 0 });

        ScrollTrigger.create({
          trigger: root,
          start: "top 65%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              scale: 1,
              opacity: 1,
              stagger: 0.08,
              duration: 0.7,
              ease: "expo.out",
              onComplete: () => {
                gsap.set(cards, { clearProps: "y,scale,opacity" });
              },
            });
          },
        });

        const titleLine = titleLineRef.current;
        if (titleLine) {
          const pathLength = titleLine.getTotalLength?.() ?? 500;
          gsap.set(titleLine, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
          ScrollTrigger.create({
            trigger: root,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(titleLine, {
                strokeDashoffset: 0,
                duration: 1.3,
                ease: "power3.inOut",
              });
            },
          });
        }
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="certifications"
      className="py-28 px-6 md:px-12 lg:px-20 relative"
    >
      <div className="max-w-7xl mx-auto text-center">
        <Reveal kind="fade">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
            Certifications &amp; Achievements
          </p>
        </Reveal>

        <div className="inline-block">
          <AnimatedText
            as="h2"
            text="Validating Excellence through Global Standards."
            split="words"
            stagger={0.05}
            className="mt-6 block text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] "
            itemClassName="text-metallic"
          />
          <svg className="mt-3 mx-auto w-full max-w-xl" viewBox="0 0 600 6" fill="none" aria-hidden="true">
            <path
              ref={titleLineRef}
              d="M2 3 L598 3"
              stroke="url(#certTitleGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="certTitleGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="20%" stopColor="rgb(56 189 248)" />
                <stop offset="50%" stopColor="rgb(251 191 36)" />
                <stop offset="80%" stopColor="rgb(16 185 129)" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <Reveal kind="up" delay={0.2}>
          <p className="mt-6 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
            A collection of my professional certifications in AI, Web Development, and Cloud Engineering from industry
            leaders.
          </p>
        </Reveal>

        <Reveal kind="scale" delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Magnetic strength={0.7}>
              <a
                href="#certifications"
                className="inline-flex items-center gap-2 rounded-full bg-invert text-invert-foreground px-8 py-4 font-bold text-sm tracking-wide transition-transform hover:scale-105 active:scale-95"
              >
                <ScrambleText text="View Credentials" />
                <span aria-hidden="true">↓</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {certs.map((c, i) => (
            <TiltCard key={c.title} max={9} lift={16}>
              {c.pdf ? (
                <button
                  type="button"
                  onClick={() => setOpenCert(openCert?.pdf === c.pdf ? null : c)}
                  aria-expanded={openCert?.pdf === c.pdf}
                  className="block w-full text-left"
                >
                  <CertCardContent
                    c={c}
                    hasPdf
                    isActive={openCert?.pdf === c.pdf}
                    cardRef={(el) => { if (el) cardRefs.current[i] = el; }}
                  />
                </button>
              ) : (
                <CertCardContent
                  c={c}
                  hasPdf={false}
                  isActive={false}
                  cardRef={(el) => { if (el) cardRefs.current[i] = el; }}
                />
              )}
            </TiltCard>
          ))}
        </div>

        {openCert?.pdf && (
          <div className="mt-8">
            <Reveal kind="up" key={openCert.pdf}>
              <PdfPanel cert={openCert} onClose={() => setOpenCert(null)} />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
