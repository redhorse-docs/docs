"use client";

import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { SectionShell } from "@/components/ui/section-shell";
import type { TokenAllocationSnapshot } from "@/lib/types/landing";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

type TokenInfoProps = TokenAllocationSnapshot;

export function TokenInfoSection({
  contract,
  metrics,
  allocation,
  links,
}: TokenInfoProps) {
  const allocationVariants = [
    "border-white/15 bg-gradient-to-br from-[rgba(224,50,58,0.18)] via-white/5 to-transparent hover:border-[--rh-primary]/40",
    "border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.16)] via-white/5 to-transparent hover:border-[--rh-secondary]/40",
    "border-white/10 bg-gradient-to-br from-white/12 via-white/5 to-transparent hover:border-white/30",
  ];
  return (
    <SectionShell
      id="token"
      eyebrow="Token"
      title="Token Snapshot"
      description="Placeholder stats and allocation blocks ensure the layout holds before live data."
    >
      {/* Floating token decorations */}
      <div className="pointer-events-none absolute right-4 top-20 hidden opacity-40 lg:block">
        <Image
          src="/tokens/Solana_Camera1.png"
          alt=""
          width={64}
          height={64}
          className="token-float-slow drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="pointer-events-none absolute left-8 top-1/3 hidden opacity-30 lg:block">
        <Image
          src="/tokens/Ethereum_Camera1.png"
          alt=""
          width={48}
          height={48}
          className="token-float-slow drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
      <div className="pointer-events-none absolute bottom-32 right-12 hidden opacity-35 lg:block">
        <Image
          src="/tokens/Bitcoin_Camera1.png"
          alt=""
          width={52}
          height={52}
          className="token-float-slow drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "2.8s" }}
        />
      </div>
      <StaggerContainer className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <StaggerItem>
          <article className="h-full rounded-3xl border border-white/20 bg-gradient-to-br from-[rgba(224,50,58,0.28)] via-white/5 to-transparent p-8 shadow-[0_30px_65px_rgba(2,4,12,0.45)] transition-all duration-300 hover:border-[--rh-primary]/50 md:p-10">
            <div className="flex items-center gap-4">
              <PlaceholderIcon name="stack" className="h-12 w-12 md:h-14 md:w-14" />
              <p className="text-sm uppercase tracking-[0.3em] text-white/40 md:text-base">
                {contract.label}
              </p>
            </div>
            <p className="mt-6 break-all font-mono text-lg text-white md:text-xl">{contract.address}</p>
            <p className="font-serif mt-3 text-base text-white/65 md:text-lg">
              {contract.helper}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="ghost" className="px-6 py-3 text-base">
                Copy
              </Button>
              {links.map((link) => (
                <Button
                  key={link.label}
                  variant="subtle"
                  className="px-6 py-3 text-base"
                  href={link.href}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </article>
        </StaggerItem>
        <StaggerItem>
          <article className="h-full rounded-3xl border border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.2)] via-white/5 to-transparent p-8 shadow-[0_30px_65px_rgba(2,4,12,0.35)] transition-all duration-300 hover:border-[--rh-secondary]/50 md:p-10">
            <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
              Metrics
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="group rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/15 md:p-6"
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                    {metric.label}
                  </p>
                  <p className="font-heading mt-3 text-2xl font-bold text-white md:text-3xl">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </StaggerItem>
      </StaggerContainer>
      <FadeUp delay={0.2}>
        <div className="mt-10 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-[0_30px_65px_rgba(2,4,12,0.35)] md:p-10">
          <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
            Allocation
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {allocation.map((chunk, index) => (
              <div
                key={chunk.label}
                className={cn(
                  "rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 md:p-6",
                  allocationVariants[index % allocationVariants.length],
                )}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                  {chunk.label}
                </p>
                <p className="font-heading mt-3 text-2xl font-bold text-white md:text-3xl">
                  {chunk.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </SectionShell>
  );
}
