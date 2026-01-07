import type { LandingContent } from "@/lib/types/landing";

export const landingMock: LandingContent = {
  hero: {
    title: "RedHorse Protocol",
    subtitle:
      "Composable membership and token rails for communities that need progressive access control.",
    ctas: [
      { label: "Launch App", href: "/app" },
      { label: "Explore Docs", href: "/docs" },
    ],
  },
  whatIs: {
    title: "What is RedHorse?",
    description:
      "Settle tokenized memberships, lock perks behind programmatic tiers, and orchestrate drops with one layout-first stack.",
    items: [
      {
        title: "Membership Rail",
        description: "Composable cards for allowlists, phased unlocks, and perks.",
      },
      {
        title: "Token Snapshot",
        description: "Surface key contract stats before switching to live data.",
      },
      {
        title: "Docs-Ready Layout",
        description: "Landing + docs shell so teams can drop in MDX or CMS later.",
      },
    ],
  },
  howItWorks: {
    title: "How It Works",
    description:
      "Three simple sections illustrate the flow before any backend wiring exists.",
    steps: [
      {
        name: "Create",
        description: "Authors drop placeholder copy and tier metadata into mock data.",
      },
      {
        name: "Preview",
        description: "Landing auto-renders cards with responsive grids and tokens.",
      },
      {
        name: "Go Live",
        description: "Swap mock imports for CMS/contract feeds without rebuilding UI.",
      },
    ],
  },
  membership: {
    title: "Membership tiers",
    description:
      "Three column grid with optional featured tier. Replace bullet copy without shifting layout.",
    tiers: [
      {
        name: "Signal",
        perks: [
          "Early changelog access",
          "Monthly governance digest",
          "Discord badge placeholder",
        ],
        ctaLabel: "Reserve",
      },
      {
        name: "Velocity",
        featured: true,
        perks: [
          "Priority support lane",
          "Snapshot voting weight",
          "Invite-only drops",
        ],
        ctaLabel: "Join Waitlist",
      },
      {
        name: "Origin",
        perks: [
          "Private research feed",
          "Advisory syncs",
          "Collector dashboard",
        ],
        ctaLabel: "Contact Team",
      },
    ],
  },
  tokenInfo: {
    contract: {
      label: "Contract",
      address: "0xabc0...cafe",
      helper: "Placeholder address until mainnet deploy",
    },
    metrics: [
      { label: "Total Supply", value: "100M RH" },
      { label: "Initial Float", value: "12.5%" },
      { label: "Vesting", value: "18 month linear" },
      { label: "Chain", value: "OP Mainnet" },
    ],
    allocation: [
      { label: "Community", value: "40%" },
      { label: "Core Team", value: "25%" },
      { label: "Treasury", value: "20%" },
      { label: "Advisors", value: "15%" },
    ],
    links: [
      { label: "View Explorer", href: "#" },
      { label: "Audit PDF", href: "#" },
    ],
  },
  security: {
    title: "Security Signals",
    description:
      "Highlight audits, multisig guardians, and general risk disclosures before real docs drop in.",
    highlights: [
      {
        title: "Audit Ready",
        description: "Reserved section for audit notes. Swap with firm + date later.",
        badge: "Placeholder",
      },
      {
        title: "Multisig Treasury",
        description: "Describe signer count and rotation policies in a single card.",
        badge: "5 of 9",
      },
      {
        title: "Risk Primer",
        description:
          "Link to potential risk disclosures so visitors understand program constraints.",
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    description: "Four-phase outline keeps the layout ready for milestone content.",
    items: [
      {
        quarter: "Q1",
        title: "Design freeze",
        description: "Lock landing + docs shell, gather copy, and align tokens.",
        status: "done",
      },
      {
        quarter: "Q2",
        title: "Token dummy data",
        description: "Swap placeholder stats for simulated numbers + graphs.",
        status: "in-progress",
      },
      {
        quarter: "Q3",
        title: "Membership live",
        description: "Wire CMS + deliver tier gating logic with toggles.",
        status: "planned",
      },
      {
        quarter: "Q4",
        title: "Docs migration",
        description: "Drop MDX docs + interactive examples into the stub.",
        status: "planned",
      },
    ],
  },
  community: {
    title: "Community pulse",
    description:
      "Two updatable cards for channels or resources the team wants to show.",
    channels: [
      {
        title: "Signal Radio",
        description: "Bi-weekly Twitter Spaces recaps. Replace with actual handles later.",
        action: "Follow Channel",
      },
      {
        title: "Builders Forum",
        description: "Discourse-style hub with updates, RFCs, and operator Q&A.",
        action: "Enter Forum",
      },
    ],
  },
  faq: {
    title: "FAQ",
    description: "Sample questions so accordions can be styled pre-content.",
    items: [
      {
        question: "When will the mainnet contract ship?",
        answer: "Timeline sits in Q2 of the roadmap. Swap once a date is final.",
      },
      {
        question: "Can tiers change after launch?",
        answer:
          "Yes. Copy explains how perks, gating logic, and snapshots update without redeploys.",
      },
      {
        question: "Do I need a wallet to preview the app?",
        answer:
          "Landing is public; Launch App can open a wallet-gated flow later. Keep CTA stable.",
      },
      {
        question: "Is there a token sale?",
        answer:
          "Use this response to clarify distribution or redirect to docs once numbers are public.",
      },
    ],
  },
};
