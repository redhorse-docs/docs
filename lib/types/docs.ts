export type DocsNavItem = {
  label: string;
  status: "updated" | "new" | null;
};

export type DocsNavGroup = {
  title: string;
  items: DocsNavItem[];
};

export type DocsHighlight = {
  title: string;
  description: string;
};

export type DocsCallout = {
  title: string;
  content: string;
};

export type DocsArticle = {
  title: string;
  updated: string;
  body: string[];
  callouts: DocsCallout[];
};

export type DocsContent = {
  header: {
    title: string;
    description: string;
    searchPlaceholder: string;
    tags: string[];
  };
  quickstart: {
    title: string;
    description: string;
    steps: Array<{ number: number; text: string }>;
    ctaLabel: string;
    ctaHref: string;
  };
  // 네비게이션
  nav: DocsNavGroup[];
  // 메인 아티클
  article: DocsArticle;
  // 하이라이트
  highlights: DocsHighlight[];
};

export type DocDocument = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: DocsArticle;
  order: number;
  published: boolean;
  updatedAt: string;
  createdAt: string;
};
