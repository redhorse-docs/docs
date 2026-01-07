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
    <div className="bg-[var(--rh-background)] text-white">
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
  );
}
