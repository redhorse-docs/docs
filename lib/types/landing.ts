export type IconName = "spark" | "orbit" | "stack" | "shield" | "wave" | "bolt";

export type HeroContent = {
  title: string;
  subtitle: string;
  ctas: Array<{ label: string; href: string }>;
};

export type KeyPoint = {
  title: string;
  description: string;
  icon?: IconName;
};

export type ProcessStep = {
  name: string;
  description: string;
  icon?: IconName;
};

export type MembershipTier = {
  name: string;
  perks: string[];
  featured?: boolean;
  ctaLabel: string;
  price?: string;
  color?: "bronze" | "silver" | "gold";
};

export type Partner = {
  name: string;
  logo: string;
  href?: string;
};

export type PressItem = {
  source: string;
  logo?: string;
  title: string;
  href: string;
  date?: string;
};

export type TokenCard = {
  title: string;
  description: string;
  highlight?: string;
};

export type TokenAllocationSnapshot = {
  contract: {
    label: string;
    address: string;
    helper: string;
  };
  metrics: Array<{ label: string; value: string }>;
  allocation: Array<{ label: string; value: string }>;
  links: Array<{ label: string; href: string }>;
};

export type SecurityHighlight = {
  title: string;
  description: string;
  badge?: string;
  icon?: IconName;
};

export type RoadmapItem = {
  quarter: string;
  title: string;
  description: string;
  status: "done" | "in-progress" | "planned";
};

export type CommunityChannel = {
  title: string;
  description: string;
  action: string;
  href: string;
  image?: string;
  icon?: IconName;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LandingContent = {
  hero: HeroContent;
  whatIs: {
    title: string;
    description: string;
    items: KeyPoint[];
    banner?: {
      title: string;
      description: string;
    };
  };
  // 기존 DB 호환성을 위해 optional
  howItWorks?: {
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  // 새로 추가된 섹션들 (optional로 기존 DB 호환)
  partnership?: {
    title: string;
    description: string;
    partners: Partner[];
  };
  press?: {
    title: string;
    description: string;
    items: PressItem[];
  };
  membership: {
    title: string;
    description: string;
    tiers: MembershipTier[];
  };
  tokenInfo: TokenAllocationSnapshot;
  security: {
    title: string;
    description: string;
    highlights: SecurityHighlight[];
  };
  roadmap: {
    title: string;
    description: string;
    items: RoadmapItem[];
  };
  community: {
    title: string;
    description: string;
    channels: CommunityChannel[];
  };
  faq: {
    title: string;
    description: string;
    items: FaqItem[];
  };
};
