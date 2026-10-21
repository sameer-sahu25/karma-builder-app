import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SiteNav } from "@/components/portfolio/SiteNav";
import { SiteFooter } from "@/components/portfolio/SiteFooter";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/portfolio/icons";

const title = "Contact — Sameer Sahu, AI & ML Engineer";
const description =
  "Get in touch with Sameer Sahu for AI/ML engineering, data platforms and full-stack collaborations, internships or freelance projects.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

const EMAIL = "contact@azril.dev";

const channels = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: MailIcon },
  { label: "GitHub", value: "github.com", href: "https://github.com", Icon: GithubIcon },
  { label: "LinkedIn", value: "linkedin.com", href: "https://linkedin.com", Icon: LinkedinIcon },
];

const field =
  "w-full rounded-2xl bg-surface/80 border border-border focus:border-border-strong outline-none px-4 py-3 text-sm placeholder:text-subtle transition-colors";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject || "Project enquiry",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-invert selection:text-invert-foreground">
      <div className="fixed inset-0 -z-10 pointer-events-none ambient-field opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 -z-10 pointer-events-none grid-field opacity-50" aria-hidden="true" />

      <SiteNav />

      <main id="contact-main" className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-10">
        <Reveal kind="blur">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent">Get in touch</p>
          <h1 className="mt-4 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Let's talk about
            <br />
            your next build.
          </h1>
          <p className="mt-6 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Open to AI/ML engineering roles, data platform work and full-stack collaborations. Send a
            note and I usually reply within a day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal kind="up" delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-border bg-surface-2/70 backdrop-blur-md p-6 sm:p-8 shadow-2xl space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={`${field} mt-2`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={`${field} mt-2`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                  Subject
                </label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this about?"
                  className={`${field} mt-2`}
                />
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the project, timeline and scope."
                  className={`${field} mt-2 resize-none`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-invert text-invert-foreground font-semibold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95 duration-200 shadow-xl"
              >
                <MailIcon className="w-4 h-4" />
                <span>Send message</span>
              </button>
            </form>
          </Reveal>

          <Stagger className="space-y-4">
            {channels.map(({ label, value, href, Icon }) => (
              <StaggerItem key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface/80 backdrop-blur-md px-5 py-4 hover:border-border-strong hover:scale-[1.02] transition-all shadow-lg"
                >
                  <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">
                      {label}
                    </span>
                    <span className="block text-sm font-semibold">{value}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="rounded-2xl border border-border bg-surface-2/70 backdrop-blur-md px-5 py-5 shadow-lg">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Availability</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Currently open for opportunities. Based in Jabalpur, India — working remotely across
                  time zones.
                </p>
                <Link
                  to="/"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold hover:text-accent transition-colors"
                >
                  ← Back to portfolio
                </Link>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
