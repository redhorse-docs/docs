"use client";

import { getLandingContent } from "@/app/admin/actions";
import { CommunitySection } from "@/components/sections/community";
import { FaqSection } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MembershipTiersSection } from "@/components/sections/membership-tiers";
import { RoadmapSection } from "@/components/sections/roadmap";
import { SecuritySection } from "@/components/sections/security";
import { TokenInfoSection } from "@/components/sections/token-info";
import { WhatIsSection } from "@/components/sections/what-is";
import type { LandingContent } from "@/lib/types/landing";
import { useEffect, useState } from "react";

type LandingRootProps = {
  initialContent: LandingContent;
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

  return (
    <div className="relative overflow-hidden bg-[#050506] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-x-20 top-[-10%] h-[55vw] min-h-[420px] bg-[radial-gradient(circle,_rgba(224,50,58,0.35),_transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute inset-x-0 top-1/3 h-[65vw] min-h-[500px] bg-[radial-gradient(circle,_rgba(224,50,58,0.25),_transparent_65%)] blur-3xl opacity-60" />
        <div className="absolute inset-x-0 bottom-[-20%] h-[60vw] min-h-[480px] bg-[radial-gradient(circle,_rgba(106,94,251,0.18),_transparent_65%)] blur-[220px] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.04),_transparent_55%)]" />
      </div>
      <div className="relative z-10">
        <Hero {...content.hero} />
        <WhatIsSection {...content.whatIs} />
        <HowItWorksSection {...content.howItWorks} />
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
