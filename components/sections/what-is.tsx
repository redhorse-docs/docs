"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { SectionShell } from "@/components/ui/section-shell";
import type { KeyPoint } from "@/lib/types/landing";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type WhatIsProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: KeyPoint[];
  banner?: {
    title: string;
    description: string;
    cta?: {
      label: string;
      href: string;
    };
  };
};

export function WhatIsSection({
  eyebrow = "What is RH",
  title,
  description,
  items,
  banner,
}: WhatIsProps) {
  const cardVariants = [
    "bg-gradient-to-br from-[rgba(224,50,58,0.26)] via-white/5 to-transparent border-white/20 hover:border-[--rh-primary]/50",
    "bg-gradient-to-br from-[rgba(106,94,251,0.2)] via-white/5 to-transparent border-white/15 hover:border-[--rh-secondary]/50",
    "bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-white/30",
  ];
  return (
    <SectionShell
      id="what"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <StaggerContainer className="grid gap-8 md:grid-cols-3">
        {items.map((item, index) => {
          const iconMap: Array<"crown" | "lock" | "coin"> = [
            "crown",
            "lock",
            "coin",
          ];
          const iconName = iconMap[index % 3] || "crown";
          return (
            <StaggerItem key={item.title}>
              <article
                className={cn(
                  "group flex h-full flex-col items-center gap-6 rounded-3xl border p-8 text-center shadow-[0_20px_45px_rgba(2,4,12,0.35)] backdrop-blur-sm transition-all duration-300 md:p-10",
                  "hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(2,4,12,0.5)]",
                  cardVariants[index % cardVariants.length]
                )}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <PlaceholderIcon
                    name={iconName}
                    className="h-14 w-14 md:h-16 md:w-16"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="font-serif mt-3 text-base leading-relaxed text-white/70 md:text-lg">
                    {item.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
      {banner && (
        <FadeUp delay={0.2}>
          <div className="mt-12 rounded-3xl border border-white/20 bg-gradient-to-r from-[rgba(224,50,58,0.25)] via-[rgba(106,94,251,0.18)] to-transparent p-8 shadow-[0_25px_55px_rgba(2,4,12,0.4)] transition-all duration-300 hover:border-white/30 md:p-10">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                  {banner.title}
                </h3>
                <p className="font-serif mt-3 text-base text-white/70 md:text-lg">
                  {banner.description}
                </p>
              </div>
              {banner.cta ? (
                <Link
                  href={banner.cta.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300",
                    "bg-[--rh-primary] shadow-[0_4px_20px_rgba(224,50,58,0.5)]",
                    "hover:bg-[#c42a31] hover:shadow-[0_6px_28px_rgba(224,50,58,0.6)] hover:scale-[1.02]",
                    "active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--rh-primary]",
                    "btn-glow md:text-lg"
                  )}
                >
                  {banner.cta.label}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    //  TODO:페이지 이동
                  }}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300",
                    "bg-[--rh-primary] shadow-[0_4px_20px_rgba(224,50,58,0.5)]",
                    "hover:bg-[#c42a31] hover:shadow-[0_6px_28px_rgba(224,50,58,0.6)] hover:scale-[1.02]",
                    "active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--rh-primary]",
                    "btn-glow md:text-lg"
                  )}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </FadeUp>
      )}
    </SectionShell>
  );
}
