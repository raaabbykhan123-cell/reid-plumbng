import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpen(false);
      onDone();
    }, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-ink grain"
          exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.6 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="font-display text-[clamp(1.8rem,6vw,3.4rem)] font-bold uppercase leading-none tracking-[0.18em] text-glow">
              {SITE.name}
            </h1>
            <p className="mt-2 font-display text-[0.7rem] tracking-[0.7em] text-primary-glow">
              {SITE.suffix}
            </p>
          </motion.div>

          <svg
            viewBox="0 0 400 40"
            className="mt-10 w-[min(70vw,400px)]"
            aria-hidden
          >
            <path
              d="M0 20 H120 L140 6 L170 34 L200 20 H400"
              fill="none"
              stroke="color-mix(in oklab, var(--primary) 20%, transparent)"
              strokeWidth="1.5"
            />
            <motion.path
              d="M0 20 H120 L140 6 L170 34 L200 20 H400"
              fill="none"
              stroke="var(--primary-glow)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 8px var(--primary))" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
