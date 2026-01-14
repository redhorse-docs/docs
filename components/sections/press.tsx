"use client";

import type { PressItem } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ExternalLink, Newspaper } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type PressSectionProps = {
  title: string;
  description: string;
  items: PressItem[];
};

export function PressSection({
  title,
  description,
  items,
}: PressSectionProps) {
  return (
    <SectionShell
      id="press"
      eyebrow="In The News"
      title={title}
      description={description}
      centered
    >
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {items.map((item, index) => (
          <StaggerItem key={`${item.source}-${index}`}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent transition-all duration-300 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_30px_60px_rgba(2,4,12,0.5)]"
            >
              {/* Top section with logo */}
              <div className="relative flex h-32 items-center justify-center border-b border-white/10 bg-white/5 p-6 md:h-40">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(224,50,58,0.15),_transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.source}
                    width={180}
                    height={60}
                    className="relative h-auto max-h-12 w-auto max-w-[160px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-14 md:max-w-[180px]"
                  />
                ) : (
                  <div className="relative flex items-center gap-3">
                    <Newspaper className="h-8 w-8 text-white/40 transition-colors group-hover:text-white/70" />
                    <span className="font-heading text-xl font-bold text-white/60 transition-colors group-hover:text-white md:text-2xl">
                      {item.source}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                {/* Source name */}
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[--rh-primary]">
                  {item.source}
                </p>

                {/* Title */}
                <h3 className="font-heading mb-4 flex-1 text-lg font-semibold leading-tight text-white transition-colors group-hover:text-white/90 md:text-xl lg:text-2xl">
                  {item.title}
                </h3>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  {item.date && (
                    <span className="text-sm text-white/50">
                      {item.date}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors group-hover:text-[--rh-primary]">
                    Read More
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>

              {/* Hover border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-3xl border-2 border-[--rh-primary]/30" />
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionShell>
  );
}
