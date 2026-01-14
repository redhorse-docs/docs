import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils/cn";

type SectionShellProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-[var(--rh-surface)]/90",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,50,58,0.28),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,_rgba(224,50,58,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(106,94,251,0.12),_transparent_60%)]" />
      </div>
      <Container className="py-16 md:py-24">
        <div className="relative mb-12 flex flex-col gap-5 md:max-w-3xl">
          {eyebrow && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
              <span className="inline-block size-1.5 rounded-full bg-white/60" />
              {eyebrow}
            </span>
          )}
          <div>
            <h2 className="font-heading text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="font-serif mt-4 text-base leading-relaxed text-white/65 md:text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
}
