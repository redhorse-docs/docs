import { DocsContent, DocsNavGroup } from "@/lib/types/docs";

export const docsNav = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", status: "updated" },
      { label: "Installation", status: "new" },
      { label: "Concepts", status: null },
    ],
  },
  {
    title: "Guides",
    items: [
      { label: "Membership Recipes", status: null },
      { label: "Token Integrations", status: null },
      { label: "Security Hardening", status: null },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Components", status: null },
      { label: "API Surface", status: null },
      { label: "CLI", status: null },
    ],
  },
];

export const docsHighlights = [
  {
    title: "Launch Checklist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis.",
  },
  {
    title: "Security Notes",
    description:
      "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor.",
  },
];

export const docsArticle = {
  title: "Introduction",
  updated: "Updated 4 days ago",
  body: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat rhoncus velit, id rutrum metus dictum et.",
    "Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis.",
    "Donec id elit non mi porta gravida at eget metus sed posuere consectetur est at lobortis.",
  ],
  callouts: [
    {
      title: "Note",
      content:
        "Praesent commodo cursus magna vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis.",
    },
  ],
};

export const docsMock: DocsContent = {
  header: {
    title: "RedHorse Knowledge Base",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue suspendisse vitae.",
    searchPlaceholder: "Search guides, API reference, roadmap...",
    tags: ["Overview", "Membership", "Token", "Security"],
  },
  quickstart: {
    title: "Build a Landing in 3 Steps",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.",
    steps: [
      { number: 1, text: "Lorem ipsum step content." },
      { number: 2, text: "Lorem ipsum step content." },
      { number: 3, text: "Lorem ipsum step content." },
    ],
    ctaLabel: "View Templates",
    ctaHref: "/",
  },
  nav: docsNav as DocsNavGroup[],
  article: docsArticle,
  highlights: docsHighlights,
};
