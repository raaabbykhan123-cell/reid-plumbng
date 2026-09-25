import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export default function BeforeAfter() {
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);
  const dragging = useRef(false);

  const setFromClient = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(98, Math.max(2, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClient(e.clientX);
    };
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClient]);

  return (
    <section id="before-after" className="section-pad relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <p className="font-display text-[0.6rem] uppercase tracking-[0.4em] text-primary-glow">
          Before &amp; After
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,8vw,5.5rem)] font-bold uppercase leading-[0.9]">
          See the difference.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
          className="mt-12"
        >
          <div
            ref={wrap}
            data-cursor="drag"
            onPointerDown={(e) => {
              dragging.current = true;
              setFromClient(e.clientX);
            }}
            className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-3xl border border-primary/25 shadow-[var(--shadow-deep)] sm:aspect-[16/9]"
          >
            <img
              src={afterImg}
              alt="Newly installed clean plumbing under a sink"
              loading="lazy"
              width={1280}
              height={864}
              className="absolute inset-0 size-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <img
                src={beforeImg}
                alt="Corroded leaking plumbing before repair"
                loading="lazy"
                width={1280}
                height={864}
                className="size-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-ink/25" />
            </div>

            {/* labels */}
            <motion.span
              animate={{ opacity: pos > 14 ? 1 : 0, x: pos > 14 ? 0 : -12 }}
              className="absolute left-5 top-5 rounded-full border border-foreground/25 bg-ink/70 px-4 py-1.5 font-display text-[0.6rem] tracking-[0.3em] backdrop-blur"
            >
              BEFORE
            </motion.span>
            <motion.span
              animate={{ opacity: pos < 86 ? 1 : 0, x: pos < 86 ? 0 : 12 }}
              className="absolute right-5 top-5 rounded-full border border-primary/50 bg-primary/20 px-4 py-1.5 font-display text-[0.6rem] tracking-[0.3em] text-primary-glow backdrop-blur"
            >
              AFTER
            </motion.span>

            {/* divider */}
            <div
              className="absolute inset-y-0 w-px bg-primary-glow"
              style={{
                left: `${pos}%`,
                boxShadow: "0 0 24px 3px color-mix(in oklab, var(--primary) 70%, transparent)",
              }}
            >
              <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/70 bg-ink/80 backdrop-blur">
                <span className="absolute inset-0 rounded-full border border-primary/50 [animation:pulse-ring_2.4s_ease-out_infinite]" />
                <span className="font-display text-[0.55rem] tracking-[0.2em] text-primary-glow">
                  ⇆
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-5 text-center font-display text-[0.58rem] uppercase tracking-[0.35em] text-muted-foreground">
          Drag to compare — placeholder imagery
        </p>
      </div>
    </section>
  );
}
