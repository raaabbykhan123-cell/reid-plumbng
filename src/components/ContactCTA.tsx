import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { PrimaryButton } from "./buttons";
import { SITE } from "@/lib/site";

export default function ContactCTA() {
  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink">
      {/* energy background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 size-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_55%)] blur-[90px] [animation:spin-slow_24s_linear_infinite]" />
        <svg className="absolute inset-0 size-full opacity-60" viewBox="0 0 1200 600" preserveAspectRatio="none">
          {[120, 240, 360, 480].map((y, i) => (
            <path
              key={y}
              d={`M-20 ${y} Q 300 ${y - 70}, 600 ${y} T 1220 ${y}`}
              fill="none"
              stroke="var(--primary-glow)"
              strokeWidth="1.5"
              strokeDasharray="8 320"
              style={{
                filter: "drop-shadow(0 0 8px var(--primary))",
                animation: `dash-flow ${6 + i * 1.6}s linear infinite`,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-[clamp(6rem,14vw,11rem)] text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.2rem,8vw,6rem)] font-bold uppercase leading-[0.92] text-glow"
        >
          Need a plumber?
          <br />
          Let&apos;s get it moving.
        </motion.h2>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <PrimaryButton href={SITE.tel}>Call Now</PrimaryButton>
          <PrimaryButton href={SITE.mailto}>Send Email</PrimaryButton>
        </div>

        {/* compact contact panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="surface-gloss mx-auto mt-16 grid max-w-3xl gap-px overflow-hidden rounded-2xl sm:grid-cols-3"
        >
          <div className="px-6 py-6">
            <p className="font-display text-[0.55rem] tracking-[0.3em] text-primary-glow">
              Business
            </p>
            <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.1em]">
              {SITE.name} {SITE.suffix}
            </p>
          </div>
          <a
            href={SITE.tel}
            data-cursor="arrow"
            className="group border-y border-border/50 px-6 py-6 transition-colors hover:bg-primary/10 sm:border-x sm:border-y-0"
          >
            <p className="flex items-center justify-center gap-2 font-display text-[0.55rem] tracking-[0.3em] text-primary-glow sm:justify-start">
              <Phone className="size-3" /> Phone
            </p>
            <p className="mt-2 text-sm text-foreground/90 group-hover:text-primary-glow">
              {SITE.phone}
            </p>
          </a>
          <a
            href={SITE.mailto}
            data-cursor="arrow"
            className="group px-6 py-6 transition-colors hover:bg-primary/10"
          >
            <p className="flex items-center justify-center gap-2 font-display text-[0.55rem] tracking-[0.3em] text-primary-glow sm:justify-start">
              <Mail className="size-3" /> Email
            </p>
            <p className="mt-2 break-all text-sm text-foreground/90 group-hover:text-primary-glow">
              {SITE.email}
            </p>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
