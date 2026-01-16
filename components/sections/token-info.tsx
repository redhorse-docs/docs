"use client";

import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { SectionShell } from "@/components/ui/section-shell";
import { TokenAllocationChart } from "@/components/ui/token-allocation-chart";
import type { TokenAllocationSnapshot } from "@/lib/types/landing";
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
      <StaggerContainer className="grid gap-8">
        <StaggerItem>
          <article className="flex h-full flex-col rounded-3xl border border-white/20 bg-gradient-to-br from-[rgba(224,50,58,0.28)] via-white/5 to-transparent p-8 shadow-[0_30px_65px_rgba(2,4,12,0.45)] transition-all duration-300 hover:border-[--rh-primary]/50 md:p-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <PlaceholderIcon
                name="stack"
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
              />
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40 sm:text-sm md:text-base">
                {contract.label}
              </p>
            </div>
            <p
              className="mt-4 truncate font-mono text-sm text-white sm:mt-6 sm:text-lg md:text-xl"
              title={contract.address}
            >
              {contract.address}
            </p>
            <p
              className="font-serif mt-2 truncate text-xs leading-relaxed text-white/65 sm:mt-3 sm:text-base md:text-lg"
              title={contract.helper}
            >
              {contract.helper}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-6 sm:gap-3 sm:pt-8">
              <Button
                variant="subtle"
                className="px-4 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-base"
                href="#"
              >
                View Explorer
              </Button>
            </div>
          </article>
        </StaggerItem>
        <StaggerItem>
          <TokenAllocationChart
            totalSupply="10,000,000,000 RH"
            allocations={[
              {
                percentage: 25,
                label: "Community & Rewards",
                description: "Epochs, campaigns, and member programs",
                color: "#e0323a", // --rh-primary
              },
              {
                percentage: 20,
                label: "Liquidity & Market Support",
                description: "Liquidity provisioning and market operations",
                color: "#6a5efb", // --rh-secondary
              },
              {
                percentage: 20,
                label: "Treasury",
                description: "Operations, reserves, sustainability",
                color: "#8b8b9f", // 회색 계열
              },
              {
                percentage: 20,
                label: "Team & Contributors",
                description: "Long-term alignment",
                color: "#c92a2f", // 더 어두운 빨강
              },
              {
                percentage: 15,
                label: "Ecosystem",
                description: "Strategic initiatives and collaborations",
                color: "#4c44d7", // 더 어두운 보라
              },
            ]}
          />
        </StaggerItem>
      </StaggerContainer>
    </SectionShell>
  );
}
