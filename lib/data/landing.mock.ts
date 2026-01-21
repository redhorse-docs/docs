import type { LandingContent } from "@/lib/types/landing";

export const landingMock: LandingContent = {
  hero: {
    title: "Red Horse: RH Coin",
    subtitle:
      "Join!! On-chain Membership & Participation Rewards",
    ctas: [
      { label: "Whitepaper",
        href: "https://rh-project.gitbook.io/red-horse-rh/", },
      {
        label: "Join Community",
        href: "https://t.me/RedHorse_RHcoin",
      },
    ],
  },
  whatIs: {
    title: "Tiered Membership System",
    description:
      "Membership functions as a locking-based access and incentives layer enabling users to lock RH tokens in exchange for tiered access, rewards, and participation rights.",
    items: [
      {
        title: "Membership Tiers",
        description:
          "Derived from on-chain locking state, not discretionary decisions.",
        icon: "spark",
      },
      {
        title: "Locking Rules",
        description:
          "Fixed-term locking with snapshot-based accounting minimizing manipulation.",
        icon: "orbit",
      },
      {
        title: "Rewards Program",
        description:
          "Epoch and campaign rewards distributed under explicit budgets and transparent rules.",
        icon: "stack",
      },
    ],
    banner: {
      title: "Activate Your Membership",
      description:
        "Lock your RH tokens to unlock tiered access, rewards, and participation rights in the RedHorse ecosystem.",
      cta: {
        label: "Get Started",
        href: "/app",
      },
    },
  },
  partnership: {
    title: "Built with Trusted Infrastructure",
    description:
      "We collaborate with top-tier partners across the blockchain ecosystem to deliver exceptional value.",
    partners: [
      {
        name: "Binance",
        logo: "/partners/binance.svg",
        href: "https://binance.com",
      },
      {
        name: "Coinbase",
        logo: "/partners/coinbase.svg",
        href: "https://coinbase.com",
      },
      {
        name: "Ethereum",
        logo: "/partners/ethereum.svg",
        href: "https://ethereum.org",
      },
      {
        name: "Polygon",
        logo: "/partners/polygon.svg",
        href: "https://polygon.technology",
      },
      {
        name: "Chainlink",
        logo: "/partners/chainlink.svg",
        href: "https://chain.link",
      },
      {
        name: "OpenSea",
        logo: "/partners/opensea.svg",
        href: "https://opensea.io",
      },
      {
        name: "Uniswap",
        logo: "/partners/uniswap.svg",
        href: "https://uniswap.org",
      },
      {
        name: "Aave",
        logo: "/partners/aave.svg",
        href: "https://aave.com",
      },
    ],
  },
  press: {
    title: "Updates & Publications",
    description:
      "See what leading media outlets are saying about RedHorse Protocol.",
    items: [
      {
        source: "CoinDesk",
        logo: "/press/coindesk.svg",
        title:
          "RedHorse Protocol Announces Strategic Partnership with Major Exchange",
        href: "#",
        date: "Jan 2025",
      },
      {
        source: "Cointelegraph",
        logo: "/press/cointelegraph.svg",
        title: "How RedHorse is Revolutionizing DeFi Membership Models",
        href: "#",
        date: "Dec 2024",
      },
      {
        source: "The Block",
        logo: "/press/theblock.svg",
        title: "RedHorse Secures $10M in Series A Funding Round",
        href: "#",
        date: "Nov 2024",
      },
      {
        source: "Decrypt",
        logo: "/press/decrypt.svg",
        title: "Inside RedHorse: The Protocol Bridging TradFi and DeFi",
        href: "#",
        date: "Oct 2024",
      },
      {
        source: "Bloomberg Crypto",
        logo: "/press/bloomberg.svg",
        title: "RedHorse Token Sees 300% Growth Following Platform Launch",
        href: "#",
        date: "Sep 2024",
      },
      {
        source: "Forbes Digital",
        logo: "/press/forbes.svg",
        title:
          "Top 10 DeFi Projects to Watch in 2025 - RedHorse Leads the Pack",
        href: "#",
        date: "Aug 2024",
      },
    ],
  },
  membership: {
    title: "Membership Tiers",
    description:
      "Lock RH tokens to access tiered membership benefits, rewards, and participation rights.",
    tiers: [
      {
        name: "Base",
        color: "bronze",
        price: "Tier 1",
        perks: [
          "Snapshot-based eligibility for member campaigns",
          "Early access to public updates and announcements",
          "Baseline rewards across participating epochs",
        ],
        ctaLabel: "Get Started",
      },
      {
        name: "Plus",
        color: "silver",
        featured: true,
        price: "Tier 2",
        perks: [
          "Priority eligibility across campaigns",
          "Boosted allocation and reward weighting",
          "Expanded participation and governance scope",
        ],
        ctaLabel: "Upgrade Now",
      },
      {
        name: "Prime",
        color: "gold",
        price: "Tier 3",
        perks: [
          "Highest-priority eligibility where applicable",
          "Access to limited campaigns and curated opportunities",
          "Dedicated support route via official channels",
        ],
        ctaLabel: "Go Premium",
      },
    ],
  },
  tokenInfo: {
    contract: {
      label: "RH Mint Address",
      address: "A3rk5gtQ2S24Fhz8Ctfhjj2bDgK1SZF7fXvbH1Jty5Bp",
      helper: "The official RH token mint address on Solana.",
    },
    metrics: [
      { label: "Total Supply", value: "10B RH" },
      { label: "Rewards Program", value: "35%" },
      { label: "Ecosystem & Partnerships", value: "20%" },
      { label: "Chain", value: "Solana" },
    ],
    allocation: [
      { label: "Rewards Program", value: "35%" },
      { label: "Ecosystem & Partnerships", value: "20%" },
      { label: "Liquidity & Market Support", value: "15%" },
      { label: "Community Growth & Marketing", value: "15%" },
      { label: "Team & Contributors", value: "10%" },
      { label: "Treasury / Reserve", value: "5%" },
    ],
    links: [
      // { label: "View Explorer", href: "#" },
      // { label: "Audit PDF", href: "#" },
    ],
  },
  security: {
    title: "Security for RH Locking",
    description:
      "RH locking is enforced on-chain using transparent rules with minimized administrative trust requirements.",
    highlights: [
      {
        title: "Non-Custodial Locking",
        description:
          "Locking is program-enforced—no discretionary withdrawals or manual control.",
        icon: "shield",
      },
      {
        title: "Snapshot Integrity",
        description:
          "Snapshot rules are deterministic and verifiable, reducing distribution-time manipulation.",
        icon: "orbit",
      },
      {
        title: "Controlled Privileges",
        description:
          "Critical parameters and treasury actions are gated by multisig (and timelocks where applicable).",
        icon: "wave",
      },
    ],
  },
  roadmap: {
    title: "Implementation Roadmap",
    description:
      "Our development milestones and planned features for the RedHorse ecosystem.",
    items: [
      {
        quarter: "Q1",
        title: "RH Locking Foundation",
        description:
          "Launch contract-governed RH locking establishing verifiable membership state.",
        status: "done",
      },
      {
        quarter: "Q2",
        title: "Token & Listing Readiness",
        description:
          "Finalize SPL issuance, liquidity operations, and disclosure standards supporting market integration.",
        status: "in-progress",
      },
      {
        quarter: "Q3",
        title: "Bounded Parameters / Reporting",
        description:
          "Operate rewards by epoch budgets, publish regular reports, and expand governance within bounded parameters.",
        status: "planned",
      },
      {
        quarter: "Q4",
        title: "Epoch Settlement & Governance",
        description:
          "Settle rewards by epoch budgets and expand governance controls and ecosystem integrations.",
        status: "planned",
      },
    ],
  },
  community: {
    title: "Join Our Community",
    description:
      "Connect with the RedHorse community for updates, support, and announcements.",
    channels: [
      {
        title: "Telegram",
        description:
          "Realtime announcements, support, and campaign alerts.",
        action: "Join Telegram",
        href: "https://t.me/RedHorse_RHcoin",
        icon: "wave",
      },
      {
        title: "X (Twitter)",
        description:
          "Official updates, release notes, and snapshot notices.",
        action: "Follow on X",
        href: "https://x.com/RedHorse_RH",
        icon: "spark",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Common questions about the RedHorse Protocol and RH token.",
    items: [
      {
        question: "When will the timeline be published?",
        answer:
          "We share milestones first and add dates once dependencies are confirmed. Follow our channels for the latest status updates.",
      },
      {
        question: "Can my tier change after I lock?",
        answer:
          "Tiers are derived from locked RH at snapshot points and can change when on-chain locking state changes and new snapshots occur.",
      },
      {
        question: "How are snapshots used?",
        answer:
          "Snapshots read on-chain locking state to determine eligibility and accounting for campaigns and epoch settlement using transparent rules.",
      },
      {
        question: "Is there a public token sale?",
        answer:
          "If a public sale is planned, details will be announced with eligibility rules, allocation method, and schedule.",
      },
    ],
  },
};
