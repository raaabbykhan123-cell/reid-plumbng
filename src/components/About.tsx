import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const fade = useTransform(scrollYProgress, [0, 0.35, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad grain relative overflow-hidden bg-ink"
    >
      {/* animated blue line-art */}
      <motion.svg
        style={{ y: drift }}
        viewBox="0 0 1000 600"
        className="pointer-events-none absolute inset-0 size-full opacity-55"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {[
          "M60 520 C 260 520, 240 300, 430 300 S 640 120, 900 120",
          "M0 380 C 220 380, 300 470, 520 470 S 760 300, 1000 300",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="color-mix(in oklab, var(--primary) 55%, transparent)"
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2.2, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
        {[
          [430, 300],
          [520, 470],
          [900, 120],
        ].map(([cx, cy]) => (
          <circle key={`${cx}`} cx={cx} cy={cy} r="4" fill="var(--primary-glow)">
            <animate attributeName="r" values="3;7;3" dur="3.5s" repeatCount="indefinite" />
          </circle>
        ))}
      </motion.svg>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto max-w-6xl px-5"
      >
        <div className="flex flex-col gap-3 font-display text-[0.6rem] uppercase tracking-[0.4em] text-primary-glow sm:flex-row sm:items-center sm:gap-6">
          <span>About</span>
          <span className="hidden h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent sm:block" />
        </div>

        <h2 className="mt-8 font-display text-[clamp(2.6rem,11vw,8rem)] font-bold uppercase leading-[0.88]">
          {["Plumbing", "with purpose."].map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={
                  i === 1
                    ? "block bg-gradient-to-r from-foreground via-primary-glow to-foreground bg-clip-text text-transparent"
                    : "block"
                }
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-14 grid gap-10 border-t border-border/50 pt-10 md:grid-cols-[1.1fr_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Reid Plumbing LLC is a professional plumbing company focused on clean,
            careful work and straightforward service. From a small leak to a full
            fixture replacement, every job is approached the same way — diagnose
            properly, explain clearly, and fix it right.
          </motion.p>

          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="grid gap-4 self-start"
          >
            {[
              ["Approach", "Diagnose first, then solve."],
              ["Service", "Residential & commercial plumbing."],
              ["Availability", "Emergency plumbing support."],
            ].map(([k, v]) => (
              <div
                key={k}
                className="surface-gloss flex items-baseline justify-between gap-6 rounded-xl px-5 py-4"
              >
                <dt className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-primary-glow">
                  {k}
                </dt>
                <dd className="text-right text-sm text-foreground/85">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
