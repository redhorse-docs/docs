"use client";

import { SectionShell } from "@/components/ui/section-shell";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import type { SecurityHighlight } from "@/lib/types/landing";
import { cn } from "@/lib/utils/cn";

type SecuritySectionProps = {
  title: string;
  description: string;
  highlights: SecurityHighlight[];
};

export function SecuritySection({
  title,
  description,
  highlights,
}: SecuritySectionProps) {
  const highlightVariants = [
    "border-white/20 bg-gradient-to-br from-[rgba(224,50,58,0.22)] via-white/5 to-transparent hover:border-[--rh-primary]/50",
    "border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.2)] via-white/5 to-transparent hover:border-[--rh-secondary]/50",
    "border-white/10 bg-gradient-to-br from-white/12 via-white/5 to-transparent hover:border-white/30",
  ];
  return (
    <SectionShell
      id="security"
      eyebrow="Security"
      title={title}
      description={description}
    >
      <StaggerContainer className="grid gap-8 md:grid-cols-3">
        {highlights.map((highlight, index) => (
          <StaggerItem key={highlight.title}>
            <article
              className={cn(
                "group h-full rounded-3xl border p-8 shadow-[0_20px_45px_rgba(2,4,12,0.35)] backdrop-blur-sm transition-all duration-300 md:p-10",
                "hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(2,4,12,0.5)]",
                highlightVariants[index % highlightVariants.length],
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <PlaceholderIcon name={highlight.icon} className="h-12 w-12 md:h-14 md:w-14" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
                    {highlight.title}
                  </h3>
                </div>
                {highlight.badge && (
                  <span className="shrink-0 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80">
                    {highlight.badge}
                  </span>
                )}
              </div>
              <p className="font-serif mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                {highlight.description}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionShell>
  );
}
