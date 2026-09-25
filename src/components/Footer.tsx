import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { NAV, SITE, scrollToId } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-[linear-gradient(180deg,var(--ink),color-mix(in_oklab,var(--charcoal)_55%,var(--ink)))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold uppercase tracking-[0.18em]">
            {SITE.name}
          </p>
          <p className="mt-1 font-display text-[0.6rem] tracking-[0.5em] text-primary-glow">
            {SITE.suffix}
          </p>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Professional plumbing solutions.
          </p>
        </div>

        <div>
          <p className="font-display text-[0.55rem] uppercase tracking-[0.35em] text-primary-glow">
            Contact
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={SITE.tel}
                data-cursor="arrow"
                className="text-foreground/85 transition-colors hover:text-primary-glow"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={SITE.mailto}
                data-cursor="arrow"
                className="break-all text-foreground/85 transition-colors hover:text-primary-glow"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-[0.55rem] uppercase tracking-[0.35em] text-primary-glow">
            Navigation
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollToId(n.id)}
                  data-cursor="arrow"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border/50 px-5 py-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name} {SITE.suffix}. All rights reserved.
        </p>
        <motion.button
          whileHover={{ y: -4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-cursor="arrow"
          className="group flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 font-display text-[0.55rem] uppercase tracking-[0.3em] text-foreground/85 transition-colors hover:border-primary hover:text-primary-glow"
        >
          Back to top
          <ArrowUp className="size-3 transition-transform duration-500 group-hover:-translate-y-0.5" />
        </motion.button>
      </div>
    </footer>
  );
}
