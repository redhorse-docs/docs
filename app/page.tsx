import { Hero } from "@/components/sections/hero";
import { WhatIsSection } from "@/components/sections/what-is";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { MembershipTiersSection } from "@/components/sections/membership-tiers";
import { TokenInfoSection } from "@/components/sections/token-info";
import { SecuritySection } from "@/components/sections/security";
import { RoadmapSection } from "@/components/sections/roadmap";
import { CommunitySection } from "@/components/sections/community";
import { FaqSection } from "@/components/sections/faq";
import { landingMock } from "@/lib/data/landing.mock";

export default function Home() {
  return (
    <div className="bg-[var(--rh-background)] text-white">
      <Hero {...landingMock.hero} />

      <WhatIsSection {...landingMock.whatIs} />

      <HowItWorksSection {...landingMock.howItWorks} />

      <MembershipTiersSection {...landingMock.membership} />

      <TokenInfoSection {...landingMock.tokenInfo} />

      <SecuritySection {...landingMock.security} />

      <RoadmapSection {...landingMock.roadmap} />

      <CommunitySection {...landingMock.community} />

      <FaqSection {...landingMock.faq} />
    </div>
  );
}
