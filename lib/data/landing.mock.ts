import type { LandingContent } from "@/lib/types/landing";

export const landingMock: LandingContent = {
  hero: {
    title: "RedHorse Protocol",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus amet lacus nec rutrum ultrices.",
    ctas: [
      { label: "Launch App", href: "/app" },
      { label: "Explore Docs", href: "/docs" },
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
  howItWorks: {
    title: "Processus in tribus passibus",
    description:
      "Mauris lacinia bibendum arcu eget maximus. Etiam ut lacus non augue porta vulputate.",
    steps: [
      {
        name: "Frame",
        description:
          "Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis.",
        icon: "spark",
      },
      {
        name: "Compose",
        description:
          "Sed posuere consectetur est at lobortis. Maecenas faucibus mollis interdum.",
        icon: "bolt",
      },
      {
        name: "Hand Off",
        description:
          "Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis.",
        icon: "orbit",
      },
    ],
  },
  membership: {
    title: "Tiered Lorem Modules",
    description:
      "Praesent sed pellentesque erat. Aliquam sodales lorem sit amet orci volutpat sagittis.",
    tiers: [
      {
        name: "Signal",
        perks: [
          "Praesent dictum feugiat turpis fermentum.",
          "Integer mollis nec ligula sit amet mattis.",
          "Etiam ultricies libero at enim iaculis.",
        ],
        ctaLabel: "Reserve",
      },
      {
        name: "Velocity",
        featured: true,
        perks: [
          "Mauris commodo libero vitae justo faucibus.",
          "Curabitur auctor lacus id massa porta.",
          "Vestibulum imperdiet nisl vitae tempus blandit.",
        ],
        ctaLabel: "Join Waitlist",
      },
      {
        name: "Origin",
        perks: [
          "Aenean in gravida metus sed luctus.",
          "Suspendisse potenti integer non felis.",
          "Nam aliquam nisl ut lectus hendrerit.",
        ],
        ctaLabel: "Contact Team",
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
        title: "Signal Radio",
        description:
          "Nullam quis risus eget urna mollis ornare vel eu leo aliquam.",
        action: "Follow Channel",
        image: "/project_wireframe.png",
        icon: "wave",
      },
      {
        title: "Builders Forum",
        description:
          "Etiam porta sem malesuada magna mollis euismod condimentum.",
        action: "Enter Forum",
        icon: "stack",
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
