"use client";

import { getLandingContent } from "@/app/admin/actions";
import { CommunitySection } from "@/components/sections/community";
import { FaqSection } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { MembershipTiersSection } from "@/components/sections/membership-tiers";
import { PartnershipSection } from "@/components/sections/partnership";
import { PressSection } from "@/components/sections/press";
import { RoadmapSection } from "@/components/sections/roadmap";
import { SupportedTokensSection } from "@/components/sections/supported-tokens";
import { SecuritySection } from "@/components/sections/security";
import { TokenInfoSection } from "@/components/sections/token-info";
import { WhatIsSection } from "@/components/sections/what-is";
import { BackgroundPaths } from "@/components/ui/background-paths";
import type { LandingContent } from "@/lib/types/landing";
import { useEffect, useState } from "react";

type LandingRootProps = {
  initialContent: LandingContent;
};

// 기존 DB에 없을 경우를 위한 기본값
const defaultPartnership: NonNullable<LandingContent["partnership"]> = {
  title: "Trusted by Industry Leaders",
  description: "We collaborate with top-tier partners across the blockchain ecosystem.",
  partners: [
    { name: "Partner 1", logo: "", href: "#" },
    { name: "Partner 2", logo: "", href: "#" },
    { name: "Partner 3", logo: "", href: "#" },
    { name: "Partner 4", logo: "", href: "#" },
  ],
};

const defaultPress: NonNullable<LandingContent["press"]> = {
  title: "Featured in Top Publications",
  description: "See what leading media outlets are saying about us.",
  items: [
    { source: "Media 1", title: "Article Title 1", href: "#", date: "2025" },
    { source: "Media 2", title: "Article Title 2", href: "#", date: "2025" },
    { source: "Media 3", title: "Article Title 3", href: "#", date: "2025" },
  ],
};

export function LandingRoot({ initialContent }: LandingRootProps) {
  const [content, setContent] = useState<LandingContent>(initialContent);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const latestContent = await getLandingContent();
        setContent(latestContent);
      } catch (error) {
        console.error("Failed to fetch latest landing content", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // 기존 DB 호환성: partnership/press가 없으면 기본값 사용
  const partnership = content.partnership ?? defaultPartnership;
  const press = content.press ?? defaultPress;

  return (
    <div className="relative overflow-hidden bg-[#050506] text-white">
      {/* Animated background paths */}
      <BackgroundPaths />

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-x-20 top-[-10%] h-[55vw] min-h-[420px] bg-[radial-gradient(circle,_rgba(224,50,58,0.35),_transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute inset-x-0 top-1/3 h-[65vw] min-h-[500px] bg-[radial-gradient(circle,_rgba(224,50,58,0.25),_transparent_65%)] blur-3xl opacity-60" />
        <div className="absolute inset-x-0 bottom-[-20%] h-[60vw] min-h-[480px] bg-[radial-gradient(circle,_rgba(106,94,251,0.18),_transparent_65%)] blur-[220px] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.04),_transparent_55%)]" />
      </div>

      <div className="relative z-10">
        <Hero {...content.hero} />
        <WhatIsSection {...content.whatIs} />
        <SupportedTokensSection />
        <PartnershipSection {...partnership} />
        <PressSection {...press} />
        <MembershipTiersSection {...content.membership} />
        <TokenInfoSection {...content.tokenInfo} />
        <SecuritySection {...content.security} />
        <RoadmapSection {...content.roadmap} />
        <CommunitySection {...content.community} />
        <FaqSection {...content.faq} />
      </div>
    </div>
  );
}
