"use client";

import type { PressItem } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { StaggerItem, motion } from "@/components/ui/motion";
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

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
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollerRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-press-card]");
    const gap = 24;
    const amount = card ? card.offsetWidth + gap : container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <SectionShell
      id="press"
      eyebrow="In The News"
      title={title}
      description={description}
      centered
    >
      <div className="flex items-center justify-end gap-2 pb-4">
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          aria-label="Scroll press items left"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          aria-label="Scroll press items right"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <motion.div
        ref={scrollerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 scrollbar-hide"
      >
        {items.map((item, index) => (
          <StaggerItem key={`${item.source}-${index}`}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              data-press-card
              className="group relative flex h-full w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent transition-all duration-300 hover:border-white/25 hover:shadow-[0_30px_60px_rgba(2,4,12,0.5)] sm:w-[320px] lg:w-[360px]"
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
      </motion.div>
    </SectionShell>
  );
}
