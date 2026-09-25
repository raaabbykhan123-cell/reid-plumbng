import { motion } from "motion/react";

const NODES = [
  { label: "FLOW", x: 16, y: 26, d: 7 },
  { label: "PRESSURE", x: 63, y: 16, d: 9 },
  { label: "PIPE", x: 38, y: 58, d: 6 },
  { label: "DRAIN", x: 78, y: 62, d: 8 },
  { label: "WATER", x: 22, y: 82, d: 10 },
];

const LINKS: Array<[number, number]> = [
  [0, 2],
  [2, 1],
  [2, 3],
  [2, 4],
  [1, 3],
];

export default function Blueprint() {
  return (
    <section className="section-pad relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--primary) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 40%, transparent) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage: "radial-gradient(70% 60% at 50% 50%, #000, transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center font-display text-[clamp(1.9rem,6vw,4.4rem)] font-bold uppercase leading-[0.95]"
        >
          A better way to think about plumbing.
        </motion.h2>

        <div className="relative mx-auto mt-16 h-[26rem] w-full max-w-4xl sm:h-[30rem]">
          <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {LINKS.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a]!.x}
                y1={NODES[a]!.y}
                x2={NODES[b]!.x}
                y2={NODES[b]!.y}
                stroke="color-mix(in oklab, var(--primary) 45%, transparent)"
                strokeWidth="0.18"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.15 }}
              />
            ))}
          </svg>

          {NODES.map((n) => (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                animation: `drift-y ${n.d}s ease-in-out infinite`,
              }}
            >
              <div className="surface-gloss flex items-center gap-2.5 rounded-full px-4 py-2">
                <span className="size-1.5 rounded-full bg-primary-glow shadow-[0_0_10px_var(--primary-glow)]" />
                <span className="font-display text-[0.58rem] tracking-[0.3em] text-foreground/85">
                  {n.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Every home and building is a connected system. Reid Plumbing LLC treats it
          that way — understanding how flow, pressure and drainage work together
          before making a single repair.
        </p>
      </div>
    </section>
  );
}
