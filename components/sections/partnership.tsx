"use client";

import type { Partner } from "@/lib/types/landing";
import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/ui/motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type PartnershipSectionProps = {
  title: string;
  description: string;
  partners: Partner[];
};

function MarqueeBanner({
  partners,
  direction = "left",
  speed = 30,
}: {
  partners: Partner[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Double the partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="relative flex gap-8 overflow-hidden py-6 md:gap-12">
      {/* Gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[--rh-background] to-transparent md:w-40" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[--rh-background] to-transparent md:w-40" />

      <div
        className={cn(
          "flex shrink-0 gap-8 md:gap-12",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <a
            key={`${partner.name}-${index}`}
            href={partner.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 transition-all duration-300 hover:border-white/25 hover:bg-white/10 md:h-28 md:w-60 lg:h-32 lg:w-72"
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={60}
                className="h-auto max-h-14 w-auto max-w-full object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-16 lg:max-h-18"
              />
            ) : (
              <span className="font-heading text-lg font-semibold text-white/60 transition-colors duration-300 group-hover:text-white md:text-xl">
                {partner.name}
              </span>
            )}
          </a>
        ))}
      </div>

      {/* Duplicate for seamless loop */}
      <div
        className={cn(
          "flex shrink-0 gap-8 md:gap-12",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
        aria-hidden
      >
        {duplicatedPartners.map((partner, index) => (
          <a
            key={`${partner.name}-dup-${index}`}
            href={partner.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 transition-all duration-300 hover:border-white/25 hover:bg-white/10 md:h-28 md:w-60 lg:h-32 lg:w-72"
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={60}
                className="h-auto max-h-14 w-auto max-w-full object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-16 lg:max-h-18"
              />
            ) : (
              <span className="font-heading text-lg font-semibold text-white/60 transition-colors duration-300 group-hover:text-white md:text-xl">
                {partner.name}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

export function PartnershipSection({
  title,
  description,
  partners,
}: PartnershipSectionProps) {
  return (
    <section
      id="partnership"
      className="relative overflow-hidden bg-[var(--rh-background)] py-20 md:py-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(224,50,58,0.15),_transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(106,94,251,0.12),_transparent_60%)] blur-3xl" />
      </div>

      <Container className="relative z-10">
        <FadeUp>
          <div className="mb-16 text-center md:mb-20">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 md:text-sm">
              Partners
            </span>
            <h2 className="font-heading mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="font-serif mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl lg:text-2xl">
              {description}
            </p>
          </div>
        </FadeUp>
      </Container>

      {/* Full-width marquee */}
      <div className="relative">
        <MarqueeBanner partners={partners} direction="left" speed={35} />
      </div>
    </section>
  );
}
