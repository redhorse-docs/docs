"use client";

import { useEffect, useState } from "react";
import { landingMock } from "@/lib/data/landing.mock";
import type { LandingContent } from "@/lib/types/landing";
import { Hero } from "@/components/sections/hero";
import { WhatIsSection } from "@/components/sections/what-is";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MembershipTiersSection } from "@/components/sections/membership-tiers";
import { TokenInfoSection } from "@/components/sections/token-info";
import { SecuritySection } from "@/components/sections/security";
import { RoadmapSection } from "@/components/sections/roadmap";
import { CommunitySection } from "@/components/sections/community";
import { FaqSection } from "@/components/sections/faq";

const STORAGE_KEY = "redhorse-landing";

export function LandingRoot() {
  const [content, setContent] = useState<LandingContent>(landingMock);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LandingContent;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setContent(parsed);
      } catch {
        // ignore malformed storage
      }
    }
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
