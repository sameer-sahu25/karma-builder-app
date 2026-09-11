import { FileIcon, MailIcon } from "./icons";

export function CallToAction() {
  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-20 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center reveal">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
          Let's Build Something
          <br />
          Together
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
          Open to strategic collaborations in AI driven systems and scalable full Stack Engineering.
          <br className="hidden sm:inline" />
          Let's transform ambitious ideas into production ready solutions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:contact@azril.dev"
            className="inline-flex items-center space-x-2.5 px-7 py-3 rounded-full bg-invert text-invert-foreground font-semibold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95 duration-200 shadow-xl"
          >
            <MailIcon className="w-4 h-4" />
            <span>Hire Me</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center space-x-2.5 px-7 py-3 rounded-full bg-surface border border-border-strong font-semibold text-sm hover:bg-muted transition-all hover:scale-105 active:scale-95 duration-200 shadow-xl"
          >
            <FileIcon className="w-4 h-4" />
            <span>View My Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}
