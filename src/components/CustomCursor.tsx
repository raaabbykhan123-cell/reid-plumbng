import { useEffect, useState } from "react";

type Mode = "default" | "arrow" | "explore" | "drag";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.innerWidth < 1024) return;
    setEnabled(true);
    document.documentElement.classList.add("no-cursor");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const next = (target?.getAttribute("data-cursor") as Mode) || "default";
      setMode(next);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("no-cursor");
    };
  }, []);

  if (!enabled) return null;

  const label = mode === "explore" ? "EXPLORE" : mode === "drag" ? "DRAG" : "";
  const wide = label.length > 0;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden lg:block"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      aria-hidden
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex items-center justify-center rounded-full border border-primary/70 bg-primary/10 backdrop-blur-[2px] transition-all duration-300 ease-[var(--ease-cine)]"
          style={{
            width: wide ? 76 : mode === "arrow" ? 38 : 26,
            height: wide ? 76 : mode === "arrow" ? 38 : 26,
          }}
        >
          {wide && (
            <span className="font-display text-[0.55rem] font-bold tracking-[0.2em] text-primary-glow">
              {label}
            </span>
          )}
          {mode === "arrow" && <span className="text-xs text-primary-glow">↗</span>}
        </div>
        {mode === "default" && (
          <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-glow shadow-[0_0_14px_var(--primary-glow)]" />
        )}
      </div>
    </div>
  );
}
