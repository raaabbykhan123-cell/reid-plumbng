import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Droplets,
  Waves,
  Wrench,
  ShowerHead,
  Toilet,
  Flame,
  Siren,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  n: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  spec: string;
};

const SERVICES: Service[] = [
  {
    id: "leak",
    n: "01",
    title: "Leak Detection & Repair",
    icon: Droplets,
    desc: "Tracking hidden leaks back to the source and sealing them properly instead of patching the symptom.",
    spec: "PRESSURE / MOISTURE / JOINTS",
  },
  {
    id: "drain",
    n: "02",
    title: "Drain Cleaning",
    icon: Waves,
    desc: "Clearing slow and blocked drains, then checking the line so the blockage does not simply return.",
    spec: "FLOW / BLOCKAGE / LINE",
  },
  {
    id: "pipe",
    n: "03",
    title: "Pipe Repair",
    icon: Wrench,
    desc: "Repairing and replacing damaged, corroded or burst pipework with clean, durable connections.",
    spec: "CORROSION / SECTION / SEAL",
  },
  {
    id: "faucet",
    n: "04",
    title: "Faucet & Fixture Repair",
    icon: ShowerHead,
    desc: "Fixing drips and worn fixtures, or installing new ones with correct fit and finish.",
    spec: "CARTRIDGE / SEAT / FIT",
  },
  {
    id: "toilet",
    n: "05",
    title: "Toilet Repair & Replacement",
    icon: Toilet,
    desc: "Running, leaking or failing toilets repaired — or fully replaced and resealed.",
    spec: "VALVE / FLANGE / SEAL",
  },
  {
    id: "heater",
    n: "06",
    title: "Water Heater Services",
    icon: Flame,
    desc: "Diagnosis, repair, maintenance and replacement for water heaters of all common types.",
    spec: "TEMP / SUPPLY / UNIT",
  },
  {
    id: "emergency",
    n: "07",
    title: "Emergency Plumbing",
    icon: Siren,
    desc: "Urgent plumbing failures handled quickly to limit damage and restore water service.",
    spec: "SHUTOFF / CONTAIN / REPAIR",
  },
  {
    id: "general",
    n: "08",
    title: "General Plumbing",
    icon: Hammer,
    desc: "Everyday plumbing work, installations and maintenance across the whole system.",
    spec: "INSPECT / SERVICE / INSTALL",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  const Icon = current.icon;

  return (
    <section
      id="services"
      data-cursor="explore"
      className="section-pad relative overflow-hidden bg-[radial-gradient(90%_70%_at_50%_50%,color-mix(in_oklab,var(--navy)_45%,transparent),transparent_70%)]"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[0.6rem] uppercase tracking-[0.4em] text-primary-glow">
              Services / Control Panel
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-none">
              Select a system.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Eight plumbing systems, one command center. Choose a module to bring it
            online.
          </p>
        </div>

        {/* ---- desktop radial control panel ---- */}
        <div className="relative mx-auto mt-20 hidden aspect-square w-full max-w-[640px] lg:block">
          <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" aria-hidden>
            {SERVICES.map((s, i) => {
              const a = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <line
                  key={s.id}
                  x1="50"
                  y1="50"
                  x2={50 + Math.cos(a) * 42}
                  y2={50 + Math.sin(a) * 42}
                  stroke={
                    i === active
                      ? "var(--primary-glow)"
                      : "color-mix(in oklab, var(--primary) 22%, transparent)"
                  }
                  strokeWidth={i === active ? 0.45 : 0.2}
                  strokeDasharray={i === active ? "none" : "1 2"}
                  className="transition-all duration-500"
                />
              );
            })}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="color-mix(in oklab, var(--primary) 18%, transparent)"
              strokeWidth="0.2"
            />
          </svg>

          {/* center element */}
          <div className="absolute left-1/2 top-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute inset-0 rounded-full border border-primary/40"
              style={{ animation: "spin-slow 26s linear infinite" }}
            >
              <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-glow shadow-[0_0_14px_var(--primary-glow)]" />
            </div>
            <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--primary)_40%,transparent),transparent_70%)] blur-xl" />
            <div className="surface-gloss absolute inset-3 grid place-items-center rounded-full px-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05, rotate: 4 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon
                    className="mx-auto size-8 text-primary-glow"
                    strokeWidth={1.4}
                    style={{ filter: "drop-shadow(0 0 12px var(--primary))" }}
                  />
                  <p className="mt-4 font-display text-[0.6rem] tracking-[0.3em] text-primary-glow">
                    {current.n}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold uppercase leading-tight">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {current.desc}
                  </p>
                  <p className="mt-4 font-display text-[0.5rem] tracking-[0.3em] text-foreground/45">
                    {current.spec}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* modules */}
          {SERVICES.map((s, i) => {
            const a = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * 45;
            const y = 50 + Math.sin(a) * 45;
            const isActive = i === active;
            const Ic = s.icon;
            return (
              <button
                key={s.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="explore"
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl px-4 py-3 text-left transition-all duration-500",
                  isActive
                    ? "surface-gloss scale-105 shadow-[var(--shadow-glow)]"
                    : "border border-border/50 bg-ink/60 opacity-45 hover:opacity-90",
                )}
                style={{ left: `${x}%`, top: `${y}%`, width: 168 }}
              >
                <div className="flex items-center gap-2">
                  <Ic
                    className={cn(
                      "size-4 transition-colors",
                      isActive ? "text-primary-glow" : "text-muted-foreground",
                    )}
                    strokeWidth={1.6}
                  />
                  <span className="font-display text-[0.55rem] tracking-[0.25em] text-primary-glow">
                    {s.n}
                  </span>
                </div>
                <p className="mt-1.5 text-[0.7rem] font-medium leading-snug">{s.title}</p>
              </button>
            );
          })}
        </div>

        {/* ---- mobile / tablet vertical system ---- */}
        <div className="mt-14 space-y-3 lg:hidden">
          {SERVICES.map((s, i) => {
            const isActive = i === active;
            const Ic = s.icon;
            return (
              <div
                key={s.id}
                className={cn(
                  "relative overflow-hidden rounded-2xl transition-all duration-500",
                  isActive
                    ? "surface-gloss shadow-[var(--shadow-glow)]"
                    : "border border-border/50 bg-ink/50",
                )}
              >
                <button
                  onClick={() => setActive(isActive ? -1 : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border transition-colors",
                      isActive
                        ? "border-primary bg-primary/15 text-primary-glow"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <Ic className="size-4" strokeWidth={1.6} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[0.55rem] tracking-[0.3em] text-primary-glow">
                      {s.n}
                    </span>
                    <span className="block text-sm font-medium">{s.title}</span>
                  </span>
                  <span
                    className={cn(
                      "text-primary-glow transition-transform duration-500",
                      isActive && "rotate-90",
                    )}
                  >
                    ↗
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 pl-[4.5rem]">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {s.desc}
                        </p>
                        <p className="mt-3 font-display text-[0.5rem] tracking-[0.3em] text-foreground/45">
                          {s.spec}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
