export type HeroContent = {
  title: string;
  subtitle: string;
  ctas: Array<{ label: string; href: string }>;
};

export type KeyPoint = {
  title: string;
  description: string;
  icon?: string;
};

export type ProcessStep = {
  name: string;
  description: string;
};

export type MembershipTier = {
  name: string;
  perks: string[];
  featured?: boolean;
  ctaLabel: string;
};

export type TokenCard = {
  title: string;
  description: string;
  highlight?: string;
};

export type LandingContent = {
  hero: HeroContent;
  whatIs: {
    title: string;
    description: string;
    items: KeyPoint[];
  };
  howItWorks: {
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  membership: {
    title: string;
    description: string;
    tiers: MembershipTier[];
  };
};
