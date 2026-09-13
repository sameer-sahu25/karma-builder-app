import { motion } from "motion/react";

import { AnimatedText, ScrambleText } from "@/components/motion/AnimatedText";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { PendulumCard } from "@/components/motion/PendulumCard";
import { BoltIcon, GithubIcon, InstagramIcon, LinkedinIcon, RobotIcon } from "./icons";

function IdCard() {
  return (
    <motion.div
      className="mt-12 relative w-full flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="text-center mb-6"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
          ✦ <ScrambleText text="MOVE YOUR CURSOR — THE CARD FOLLOWS" /> ✦
        </span>
      </motion.div>

      <PendulumCard>
        <div className="w-[260px] sm:w-[300px] rounded-2xl border border-border-strong bg-surface/90 backdrop-blur-md p-5 shadow-2xl transition-transform duration-500 hover:scale-[1.03]">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-subtle">
            <span>Dev ID</span>
            <span className="text-emerald">Active</span>
          </div>
          <div className="mt-4 h-32 rounded-xl ambient-field border border-border flex items-center justify-center">
            <RobotIcon className="w-14 h-14 text-amber" />
          </div>
          <p className="mt-4 text-lg font-extrabold tracking-tight">Sameer Sahu</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
            AI • Data • Software
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="block w-[2px] bg-foreground/70"
                  style={{ height: `${10 + ((i * 7) % 14)}px` }}
                />
              ))}
            </div>
            <span className="font-signature text-2xl text-muted-foreground">Azril</span>
          </div>
        </div>
      </PendulumCard>
    </motion.div>
  );
}


export function Hero() {
  return (
    <section id="hero" className="relative pt-12 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden hero-glow">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-6 reveal">
          <AnimatedText
            as="p"
            split="lines"
            text={"Hi, I'm Sameer Sahu.\nI build scalable systems\npowered by intelligence."}
            stagger={0.12}
            className="md:col-span-4 text-xs font-mono tracking-widest text-muted-foreground leading-relaxed uppercase"
          />
          <div className="md:col-span-8 flex justify-end">
            <Magnetic strength={0.6}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="block text-muted-foreground hover:text-foreground transition p-2 hover:bg-surface rounded-full hover:scale-110 active:scale-95"
              >
                <GithubIcon className="w-7 h-7" />
              </a>
            </Magnetic>
          </div>
        </div>


        <h1 className="sr-only">Sameer Sahu — AI & ML Engineer</h1>

        <Parallax speed={0.06} className="mt-4 select-none" aria-hidden="true">
          <div className="flex justify-end">
            <AnimatedText text="AI & ML" split="chars" stagger={0.045} className="hero-title "  itemClassName="text-metallic" />
          </div>

          <div className="flex items-center justify-start relative -mt-2 md:-mt-4">
            <Magnetic strength={0.8}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="absolute -top-6 left-2 text-muted-foreground hover:text-foreground transition hover:scale-125"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </Magnetic>
            <div className="flex items-center flex-wrap">
              <AnimatedText
        text="MACHINE"
        split="chars"
        delay={0.15}
        stagger={0.045}
        className="hero-title mr-2 md:mr-4"
        itemClassName="text-metallic" />
              <motion.span
                className="inline-flex items-center px-2"
                animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ rotate: 18, scale: 1.2 }}
              >
                <BoltIcon className="w-12 h-16 md:w-24 md:h-32 text-accent drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]" />
              </motion.span>
              <AnimatedText
        text="LEARNING"
        split="chars"
        delay={0.3}
        stagger={0.045}
        className="hero-title "
        itemClassName="text-metallic" />
            </div>
          </div>

          <div className="flex items-center justify-start -mt-2 md:-mt-4 flex-wrap relative">
            <AnimatedText text="EN" split="chars" delay={0.35} stagger={0.045} className="hero-title "  itemClassName="text-metallic" />
            <span className="mx-2 md:mx-4 inline-flex items-center">
              <motion.span
                className="border-[5px] md:border-[7px] border-amber bg-amber/10 p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-[0_0_35px_rgba(245,158,11,0.35)] inline-flex"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.14, rotate: -8 }}
              >
                <RobotIcon className="w-10 h-10 md:w-16 md:h-16 text-amber" />
              </motion.span>
            </span>
            <AnimatedText
       text="GINEER"
       split="chars"
       delay={0.45}
       stagger={0.045}
       className="hero-title "
       itemClassName="text-metallic" />
            <Magnetic strength={0.8}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-block ml-4 mb-8 text-subtle hover:text-foreground transition hover:scale-125"
              >
                <InstagramIcon className="w-7 h-7" />
              </a>
            </Magnetic>
          </div>
        </Parallax>


        <div className="mt-8 flex justify-end reveal" style={{ "--delay": "0.35s" } as React.CSSProperties}>
          <p className="max-w-xs text-right font-mono text-[11px] tracking-widest text-muted-foreground leading-relaxed uppercase">
            Open to all forms of collaboration, regardless of location and language.
          </p>
        </div>

        <IdCard />
      </div>
    </section>
  );
}
