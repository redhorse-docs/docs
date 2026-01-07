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
        "border-t border-white/5 bg-[var(--rh-surface)]",
        "bg-gradient-to-b from-white/0 to-white/5",
        className,
      )}
    >
      <Container className="py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-4 md:max-w-3xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              {eyebrow}
            </p>
          )}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-white/70">
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
