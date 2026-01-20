"use client";

import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
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
      description="RH token supply and allocation details for the RedHorse ecosystem."
    >
      <StaggerContainer className="grid gap-8">
        <StaggerItem>
          <article className="flex h-full flex-col rounded-3xl border border-white/20 bg-gradient-to-br from-[rgba(224,50,58,0.28)] via-white/5 to-transparent p-8 shadow-[0_30px_65px_rgba(2,4,12,0.45)] transition-all duration-300 hover:border-[--rh-primary]/50 md:p-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/logo-small.png"
                alt="RH"
                width={56}
                height={56}
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain"
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
                percentage: 35,
                label: "Rewards Program",
                description: "Membership rewards, campaigns, ecosystem programs",
                color: "#FF4757", // 선명한 레드
              },
              {
                percentage: 20,
                label: "Ecosystem & Partnerships",
                description: "Partner initiatives, integrations, grants (if applicable)",
                color: "#7C5CFF", // 선명한 퍼플
              },
              {
                percentage: 15,
                label: "Liquidity & Market Support",
                description: "Initial liquidity provisioning, market operations (policy-defined)",
                color: "#00D9FF", // 시안
              },
              {
                percentage: 15,
                label: "Community Growth & Marketing",
                description: "Community campaigns, KOL/PR budget, growth initiatives",
                color: "#FFB800", // 골드/옐로우
              },
              {
                percentage: 10,
                label: "Team & Contributors",
                description: "Core team and long-term contributors (vested)",
                color: "#00E676", // 그린
              },
              {
                percentage: 5,
                label: "Treasury / Reserve",
                description: "Contingency reserve under treasury policy",
                color: "#A0AEC0", // 밝은 회색
              },
            ]}
          />
        </StaggerItem>
      </StaggerContainer>
    </SectionShell>
  );
}
