import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "./buttons";
import { SITE, scrollToId } from "@/lib/site";

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 61) % 100,
  d: 5 + (i % 7),
  s: 1 + (i % 3) * 0.6,
}));

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const layer1x = useTransform(sx, (v) => v * 26);
  const layer1y = useTransform(sy, (v) => v * 18);
  const layer2x = useTransform(sx, (v) => v * -14);
  const layer2y = useTransform(sy, (v) => v * -10);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const line = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: { delay: 2.45 + i * 0.13, duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section
      id="home"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
      style={{ background: "var(--gradient-abyss)" }}
    >
      {/* technical pipe network */}
      <motion.svg
        style={{ x: layer1x, y: layer1y }}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full opacity-70"
        aria-hidden
      >
        <defs>
          <linearGradient id="pipeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary-deep)" />
            <stop offset="100%" stopColor="var(--primary-glow)" />
          </linearGradient>
        </defs>
        {[
          "M-50 620 H280 L360 540 H620 L700 460 H1250",
          "M-50 200 H180 L260 280 H540 L640 180 H1250",
          "M140 850 V600 L220 520 V180",
          "M980 -40 V240 L900 320 V700",
        ].map((d, i) => (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke="oklch(1 0 0 / 6%)"
              strokeWidth="10"
              strokeLinejoin="round"
            />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#pipeGrad)"
              strokeWidth="2"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 2.2 + i * 0.18, duration: 1.8, ease: "easeOut" }}
            />
            <path
              d={d}
              fill="none"
              stroke="var(--primary-glow)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="6 380"
              style={{
                filter: "drop-shadow(0 0 10px var(--primary))",
                animation: `dash-flow ${7 + i * 2}s linear infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          </g>
        ))}
      </motion.svg>

      {/* pressure rings */}
      <motion.div
        style={{ x: layer2x, y: layer2y }}
        className="pointer-events-none absolute right-[-12%] top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        {[560, 420, 290, 170].map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.5 - i * 0.07, scale: 1 }}
            transition={{ delay: 2.4 + i * 0.12, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35"
            style={{
              width: s,
              height: s,
              animation: `spin-slow ${30 + i * 12}s linear infinite`,
              borderStyle: i % 2 ? "dashed" : "solid",
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
      </motion.div>

      {/* particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-primary-glow/70"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              boxShadow: "0 0 8px var(--primary-glow)",
              animation: `drift-y ${p.d}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* light sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_16%,transparent),transparent)]"
        initial={{ x: "-60%" }}
        animate={{ x: "320%" }}
        transition={{ delay: 2.6, duration: 2.6, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-32 pb-24">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.7em" }}
          animate={{ opacity: 1, letterSpacing: "0.34em" }}
          transition={{ delay: 2.25, duration: 1 }}
          className="mb-6 font-display text-[0.62rem] uppercase text-primary-glow sm:text-[0.7rem]"
        >
          {SITE.name} {SITE.suffix}
        </motion.p>

        <h1 className="font-display text-[clamp(2.7rem,10vw,7.5rem)] font-bold uppercase leading-[0.9]">
          {["Plumbing", "Built different."].map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
                className="block text-glow"
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.9 }}
          className="mt-7 max-w-md text-base text-muted-foreground sm:text-lg"
        >
          Professional plumbing solutions built around your needs.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { delayChildren: 3.05, staggerChildren: 0.14 } } }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {[
            <PrimaryButton key="a" href={SITE.tel}>
              Call Now
            </PrimaryButton>,
            <SecondaryButton key="b" onClick={() => scrollToId("services")}>
              Explore Services
            </SecondaryButton>,
          ].map((btn, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
            >
              {btn}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
}
