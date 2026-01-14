import type { LandingContent } from "@/lib/types/landing";

export const landingMock: LandingContent = {
  hero: {
    title: "RedHorse Protocol",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus amet lacus nec rutrum ultrices.",
    ctas: [
      { label: "Launch App", href: "/app" },
      {
        label: "Explore Docs",
        href: "https://rh-project.gitbook.io/red-horse-rh/",
      },
    ],
  },
  whatIs: {
    title: "Lorem ipsum primis in faucibus",
    description:
      "Cras rhoncus lectus nisl, eget posuere lorem aliquet vitae. Pellentesque sed dolor vitae lorem ultricies auctor.",
    items: [
      {
        title: "Strata Layouts",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.",
        icon: "spark",
      },
      {
        title: "Token Snapshot",
        description:
          "Vivamus viverra mi in lorem hendrerit, vel convallis urna facilisis.",
        icon: "orbit",
      },
      {
        title: "Docs-Ready Layout",
        description:
          "Integer feugiat, lorem quis vehicula elementum, dolor mauris congue mi.",
        icon: "stack",
      },
    ],
    banner: {
      title: "Sed posuere consectetur est at lobortis",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero a pharetra augue vehicula.",
    },
  },
  partnership: {
    title: "Trusted by Industry Leaders",
    description:
      "We collaborate with top-tier partners across the blockchain ecosystem to deliver exceptional value.",
    partners: [
      { name: "Binance", logo: "/partners/binance.svg", href: "https://binance.com" },
      { name: "Coinbase", logo: "/partners/coinbase.svg", href: "https://coinbase.com" },
      { name: "Ethereum", logo: "/partners/ethereum.svg", href: "https://ethereum.org" },
      { name: "Polygon", logo: "/partners/polygon.svg", href: "https://polygon.technology" },
      { name: "Chainlink", logo: "/partners/chainlink.svg", href: "https://chain.link" },
      { name: "OpenSea", logo: "/partners/opensea.svg", href: "https://opensea.io" },
      { name: "Uniswap", logo: "/partners/uniswap.svg", href: "https://uniswap.org" },
      { name: "Aave", logo: "/partners/aave.svg", href: "https://aave.com" },
    ],
  },
  press: {
    title: "Featured in Top Publications",
    description:
      "See what leading media outlets are saying about RedHorse Protocol.",
    items: [
      {
        source: "CoinDesk",
        logo: "/press/coindesk.svg",
        title: "RedHorse Protocol Announces Strategic Partnership with Major Exchange",
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
        title: "Top 10 DeFi Projects to Watch in 2025 - RedHorse Leads the Pack",
        href: "#",
        date: "Aug 2024",
      },
    ],
  },
  membership: {
    title: "Tiered Lorem Modules",
    description:
      "Praesent sed pellentesque erat. Aliquam sodales lorem sit amet orci volutpat sagittis.",
    tiers: [
      {
        name: "Bronze",
        color: "bronze",
        price: "$99/mo",
        perks: [
          "Basic portfolio tracking & alerts",
          "Access to community channels",
          "Monthly market reports",
          "Standard customer support",
        ],
        ctaLabel: "Get Started",
      },
      {
        name: "Silver",
        color: "silver",
        price: "$249/mo",
        perks: [
          "All Bronze benefits included",
          "Priority trading signals",
          "Weekly 1-on-1 consultations",
          "Early access to new features",
          "Dedicated account manager",
        ],
        ctaLabel: "Upgrade Now",
      },
      {
        name: "Gold",
        color: "gold",
        featured: true,
        price: "$599/mo",
        perks: [
          "All Silver benefits included",
          "VIP whale alerts & analytics",
          "Exclusive investment opportunities",
          "Personal wealth strategist",
          "Priority liquidity access",
          "Annual summit invitation",
        ],
        ctaLabel: "Go Premium",
      },
    ],
  },
  tokenInfo: {
    contract: {
      label: "Contract",
      address: "0xabc0...cafe",
      helper: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    metrics: [
      { label: "Total Supply", value: "120M RH" },
      { label: "Initial Float", value: "15.0%" },
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
    title: "Praesidium indicia",
    description:
      "Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero a pharetra augue.",
    highlights: [
      {
        title: "Audit Ready",
        description:
          "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis.",
        badge: "Placeholder",
        icon: "shield",
      },
      {
        title: "Multisig Treasury",
        description:
          "Sed posuere consectetur est at lobortis lorem ipsum dolor sit amet.",
        badge: "5 of 9",
        icon: "orbit",
      },
      {
        title: "Risk Primer",
        description:
          "Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor.",
        icon: "wave",
      },
    ],
  },
  roadmap: {
    title: "Via Lorem",
    description:
      "Sed posuere consectetur est at lobortis. Nulla vitae elit libero a pharetra augue.",
    items: [
      {
        quarter: "Q1",
        title: "Design freeze",
        description:
          "Praesent commodo cursus magna vel scelerisque nisl consectetur.",
        status: "done",
      },
      {
        quarter: "Q2",
        title: "Token dummy data",
        description:
          "Duis mollis est non commodo luctus nisi erat porttitor ligula.",
        status: "in-progress",
      },
      {
        quarter: "Q3",
        title: "Membership live",
        description:
          "Donec sed odio dui. Sed posuere consectetur est at lobortis elit.",
        status: "planned",
      },
      {
        quarter: "Q4",
        title: "Docs migration",
        description:
          "Morbi leo risus porta ac consectetur ac vestibulum at eros.",
        status: "planned",
      },
    ],
  },
  community: {
    title: "Communitas rhythmus",
    description:
      "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    channels: [
      {
        title: "Telegram",
        description:
          "Catch trade alerts and community bulletins the instant they publish.",
        action: "Join Telegram",
        href: "https://t.me/RedHorse_RHcoin",
        icon: "wave",
      },
      {
        title: "X (Twitter)",
        description:
          "Follow real-time roadmap drops and team insights through curated threads.",
        action: "Follow on X",
        href: "https://x.com/RedHorse_RH",
        icon: "spark",
      },
    ],
  },
  faq: {
    title: "Quaestiones communes",
    description:
      "Aenean lacinia bibendum nulla sed consectetur pharetra augue fusce.",
    items: [
      {
        question: "Quando timeline parata est?",
        answer:
          "Vestibulum id ligula porta felis euismod semper. Pellentesque ornare sem lacinia quam venenatis.",
      },
      {
        question: "Mutantur gradus post initium?",
        answer:
          "Nulla vitae elit libero a pharetra augue. Fusce dapibus tellus ac cursus commodo tortor mauris.",
      },
      {
        question: "Praevisus app sine ratione?",
        answer:
          "Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus.",
      },
      {
        question: "Estne venditio aperta?",
        answer:
          "Cras justo odio dapibus ac facilisis in egestas eget quam. Nulla vitae elit libero a pharetra augue.",
      },
    ],
  },
};
