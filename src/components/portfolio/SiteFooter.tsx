import { ArrowUpIcon, CameraIcon, GithubIcon, InstagramIcon, LinkedinIcon, RedditIcon } from "./icons";

const dock =
  "w-9 h-9 rounded-full bg-surface/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border-strong hover:scale-110 active:scale-95 transition-all";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative py-12 px-4 sm:px-8 max-w-6xl mx-auto mb-6 text-muted-foreground">
      <div className="bg-surface-2/90 border border-border rounded-3xl md:rounded-full px-6 py-3.5 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] font-mono tracking-widest uppercase">© 2026 All rights reserved.</p>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className={dock} title="GitHub" aria-label="GitHub">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={dock} title="LinkedIn" aria-label="LinkedIn">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={dock} title="Instagram" aria-label="Instagram">
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a href="#projects" className={dock} title="Gallery" aria-label="Gallery">
            <CameraIcon className="w-4 h-4" />
          </a>
          <a href="https://reddit.com" target="_blank" rel="noreferrer" className={dock} title="Reddit" aria-label="Reddit">
            <RedditIcon className="w-4 h-4" />
          </a>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-surface border border-border-strong font-mono text-[10px] font-bold tracking-widest hover:text-foreground hover:scale-105 active:scale-95 transition-all flex items-center space-x-1"
          >
            <span>MORE</span>
            <span className="text-[8px]">▲</span>
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-9 h-9 bg-invert text-invert-foreground rounded-full shadow-lg flex items-center justify-center transition hover:scale-110 active:scale-95 duration-200"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
