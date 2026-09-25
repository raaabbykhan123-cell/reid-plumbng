import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CallButton } from "./buttons";
import { NAV, SITE, scrollToId } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[400] flex justify-center px-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mt-4 flex w-full max-w-6xl items-center justify-between rounded-full transition-all duration-500",
          scrolled
            ? "surface-gloss bg-ink/80 px-4 py-2.5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_28%,transparent),0_18px_60px_-30px_var(--primary)]"
            : "border border-transparent bg-transparent px-5 py-4",
        )}
      >
        <button
          onClick={() => go("home")}
          data-cursor="arrow"
          className="flex items-baseline gap-2 pl-2"
        >
          <span className="font-display text-sm font-bold uppercase tracking-[0.24em]">
            {SITE.name}
          </span>
          <span className="font-display text-[0.55rem] tracking-[0.35em] text-primary-glow">
            {SITE.suffix}
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                data-cursor="arrow"
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors",
                  active === n.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{n.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CallButton compact className="hidden sm:inline-flex" />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-full border border-primary/35 text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="surface-gloss absolute inset-x-4 top-[5.5rem] rounded-3xl bg-ink/95 p-4 lg:hidden"
          >
            {NAV.map((n, i) => (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => go(n.id)}
                className="flex w-full items-center justify-between border-b border-border/40 px-2 py-3.5 text-left font-display text-sm uppercase tracking-[0.18em] last:border-0"
              >
                {n.label}
                <span className="text-primary-glow">↗</span>
              </motion.button>
            ))}
            <CallButton className="mt-4 w-full justify-center" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
