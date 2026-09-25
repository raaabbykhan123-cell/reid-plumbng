import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Search, PencilRuler, Wrench, CheckCircle2 } from "lucide-react";

const STAGES = [
  { n: "01", t: "Identify", icon: Search, d: "Locate the real problem, not just the symptom." },
  { n: "02", t: "Plan", icon: PencilRuler, d: "Agree the fix, the parts and the approach." },
  { n: "03", t: "Solve", icon: Wrench, d: "Carry out the work cleanly and correctly." },
  { n: "04", t: "Done", icon: CheckCircle2, d: "Test, check the system and leave it tidy." },
];

export default function FlowSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="solutions"
      ref={ref}
      className="section-pad grain relative overflow-hidden bg-[linear-gradient(180deg,var(--ink),color-mix(in_oklab,var(--navy)_35%,var(--ink)),var(--ink))]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-display text-[0.6rem] uppercase tracking-[0.4em] text-primary-glow">
          Solutions
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,7vw,5rem)] font-bold uppercase leading-[0.9]">
          From problem to solution
        </h2>

        {/* horizontal flow (md+) */}
        <div className="relative mt-24 hidden md:block">
          <svg viewBox="0 0 1000 160" className="w-full" aria-hidden>
            <path
              d="M20 110 C 160 110, 170 40, 300 40 S 460 120, 620 120 S 800 40, 980 40"
              fill="none"
              stroke="color-mix(in oklab, var(--primary) 18%, transparent)"
              strokeWidth="2"
            />
            <motion.path
              d="M20 110 C 160 110, 170 40, 300 40 S 460 120, 620 120 S 800 40, 980 40"
              fill="none"
              stroke="var(--primary-glow)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength, filter: "drop-shadow(0 0 10px var(--primary))" }}
            />
          </svg>

          <div className="mt-2 grid grid-cols-4 gap-6">
            {STAGES.map((s, i) => {
              const Ic = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0.25, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-25% 0px -35% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={i % 2 ? "pt-10" : ""}
                >
                  <span className="grid size-12 place-items-center rounded-full border border-primary/45 bg-ink/70 text-primary-glow shadow-[0_0_30px_-10px_var(--primary)]">
                    <Ic className="size-5" strokeWidth={1.5} />
                  </span>
                  <p className="mt-5 font-display text-[0.6rem] tracking-[0.35em] text-primary-glow">
                    {s.n}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold uppercase">{s.t}</h3>
                  <p className="mt-2 max-w-[15rem] text-sm text-muted-foreground">{s.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* vertical flow (mobile) */}
        <div className="relative mt-16 md:hidden">
          <span className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
          <div className="space-y-12">
            {STAGES.map((s) => {
              const Ic = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-20"
                >
                  <span className="absolute left-0 top-0 grid size-12 place-items-center rounded-full border border-primary/45 bg-ink text-primary-glow">
                    <Ic className="size-5" strokeWidth={1.5} />
                  </span>
                  <p className="font-display text-[0.6rem] tracking-[0.35em] text-primary-glow">
                    {s.n}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold uppercase">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
