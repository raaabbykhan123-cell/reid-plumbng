import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Common = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

function Base({
  href,
  onClick,
  className,
  children,
}: Common & { className: string }) {
  if (href) {
    return (
      <a href={href} className={className} data-cursor="arrow">
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className} data-cursor="arrow">
      {children}
    </button>
  );
}

/* PRIMARY — black body, electric-blue edge with traveling energy */
export function PrimaryButton({ children, className, href, onClick }: Common) {
  return (
    <Base
      href={href}
      onClick={onClick}
      className={cn(
        "edge-run group relative inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4",
        "font-display text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-foreground",
        "shadow-[0_10px_40px_-18px_var(--primary)] transition-all duration-500",
        "hover:scale-[1.04] hover:shadow-[0_22px_70px_-20px_var(--primary)]",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 inline-block text-primary-glow transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
        ↗
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(60%_120%_at_50%_120%,color-mix(in_oklab,var(--primary)_45%,transparent),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Base>
  );
}

/* SECONDARY — thin blue outline, fills from the left */
export function SecondaryButton({ children, className, href, onClick }: Common) {
  return (
    <Base
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full",
        "border border-primary/45 bg-transparent px-7 py-4",
        "font-display text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-foreground/85",
        "transition-colors duration-500 hover:text-primary-foreground",
        className,
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 ease-[var(--ease-cine)] group-hover:translate-x-0" />
      <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
        {children}
      </span>
      <span className="relative z-10 transition-transform duration-500 group-hover:translate-y-1">
        ↓
      </span>
    </Base>
  );
}

/* CALL NOW — solid electric blue with pulsing phone icon */
export function CallButton({
  className,
  compact,
  label = "Call Now",
}: {
  className?: string;
  compact?: boolean;
  label?: string;
}) {
  return (
    <a
      href="tel:+19288991366"
      data-cursor="arrow"
      className={cn(
        "group relative inline-flex items-center gap-2.5 rounded-full bg-primary text-primary-foreground",
        "font-display font-semibold uppercase tracking-[0.2em] transition-all duration-400",
        "shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary-glow)_60%,transparent),0_14px_45px_-16px_var(--primary)]",
        "hover:bg-primary-glow hover:shadow-[0_18px_60px_-14px_var(--primary-glow)]",
        compact ? "px-5 py-2.5 text-[0.65rem]" : "px-7 py-4 text-[0.78rem]",
        className,
      )}
    >
      <span className="relative flex size-4 items-center justify-center">
        <Phone className="size-3.5" strokeWidth={2.4} />
        <span className="absolute inset-0 rounded-full border border-primary-foreground/70 [animation:pulse-ring_1.8s_ease-out_infinite]" />
      </span>
      {label}
      <span className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}
