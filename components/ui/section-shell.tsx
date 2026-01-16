"use client";

import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/ui/motion";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  centered = false,
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
      <Container className="py-20 md:py-32 lg:py-40">
        <FadeUp>
          <div
            className={cn(
              "relative mb-16 flex flex-col gap-6 md:mb-20",
              centered ? "items-center text-center" : "md:max-w-4xl",
            )}
          >
            {eyebrow && (
              <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 md:text-sm">
                {eyebrow}
              </span>
            )}
            <div>
              <h2 className="font-heading text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
                {title}
              </h2>
              {description && (
                <p
                  className={cn(
                    "font-serif mt-6 text-lg leading-relaxed text-white/65 md:text-xl lg:text-2xl",
                    centered ? "mx-auto max-w-3xl" : "",
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </FadeUp>
        {children}
      </Container>
    </section>
  );
}
