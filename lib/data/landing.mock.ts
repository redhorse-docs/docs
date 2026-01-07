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
};
