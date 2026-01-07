"use client";

import type { DocsContent } from "@/lib/types/docs";
import type { ReactNode } from "react";

type DocsEditorProps = {
  content: DocsContent;
  onChange: (content: DocsContent) => void;
};

export function DocsEditor({ content, onChange }: DocsEditorProps) {
  return (
    <div className="space-y-8">
      <SectionCard title="Header">
        <TextField
          label="Title"
          value={content.header.title}
          onChange={(value) =>
            onChange({
              ...content,
              header: { ...content.header, title: value },
            })
          }
        />
        <TextArea
          label="Description"
          value={content.header.description}
          onChange={(value) =>
            onChange({
              ...content,
              header: { ...content.header, description: value },
            })
          }
        />
        <TextField
          label="Search Placeholder"
          value={content.header.searchPlaceholder}
          onChange={(value) =>
            onChange({
              ...content,
              header: { ...content.header, searchPlaceholder: value },
            })
          }
        />
        <TextArea
          label="Tags (한 줄 당 하나)"
          value={content.header.tags.join("\n")}
          onChange={(value) =>
            onChange({
              ...content,
              header: {
                ...content.header,
                tags: value.split("\n").map((tag) => tag.trim()).filter(Boolean),
              },
            })
          }
        />
      </SectionCard>

      <SectionCard title="Quickstart">
        <TextField
          label="Title"
          value={content.quickstart.title}
          onChange={(value) =>
            onChange({
              ...content,
              quickstart: { ...content.quickstart, title: value },
            })
          }
        />
        <TextArea
          label="Description"
          value={content.quickstart.description}
          onChange={(value) =>
            onChange({
              ...content,
              quickstart: { ...content.quickstart, description: value },
            })
          }
        />
        <div className="space-y-4">
          {content.quickstart.steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
                Step {step.number}
              </p>
              <TextArea
                label="Step Text"
                value={step.text}
                onChange={(value) => {
                  const steps = [...content.quickstart.steps];
                  steps[index] = { ...steps[index], text: value };
                  onChange({
                    ...content,
                    quickstart: { ...content.quickstart, steps },
                  });
                }}
              />
            </div>
          ))}
        </div>
        <TextField
          label="CTA Label"
          value={content.quickstart.ctaLabel}
          onChange={(value) =>
            onChange({
              ...content,
              quickstart: { ...content.quickstart, ctaLabel: value },
            })
          }
        />
        <TextField
          label="CTA Href"
          value={content.quickstart.ctaHref}
          onChange={(value) =>
            onChange({
              ...content,
              quickstart: { ...content.quickstart, ctaHref: value },
            })
          }
        />
      </SectionCard>

      <SectionCard title="Navigation">
        <div className="space-y-6">
          {content.nav.map((group, groupIndex) => (
            <div
              key={group.title + groupIndex}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Group Title"
                value={group.title}
                onChange={(value) => {
                  const nav = [...content.nav];
                  nav[groupIndex] = { ...nav[groupIndex], title: value };
                  onChange({ ...content, nav });
                }}
              />
              <div className="space-y-3 mt-4">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={item.label + itemIndex}
                    className="rounded-xl border border-white/5 p-3"
                  >
                    <TextField
                      label="Item Label"
                      value={item.label}
                      onChange={(value) => {
                        const nav = [...content.nav];
                        const items = [...nav[groupIndex].items];
                        items[itemIndex] = { ...items[itemIndex], label: value };
                        nav[groupIndex] = { ...nav[groupIndex], items };
                        onChange({ ...content, nav });
                      }}
                    />
                    <TextField
                      label="Status (updated/new/빈 값)"
                      value={item.status || ""}
                      onChange={(value) => {
                        const nav = [...content.nav];
                        const items = [...nav[groupIndex].items];
                        items[itemIndex] = {
                          ...items[itemIndex],
                          status:
                            value === "updated" || value === "new"
                              ? value
                              : null,
                        };
                        nav[groupIndex] = { ...nav[groupIndex], items };
                        onChange({ ...content, nav });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Article">
        <TextField
          label="Title"
          value={content.article.title}
          onChange={(value) =>
            onChange({
              ...content,
              article: { ...content.article, title: value },
            })
          }
        />
        <TextField
          label="Updated"
          value={content.article.updated}
          onChange={(value) =>
            onChange({
              ...content,
              article: { ...content.article, updated: value },
            })
          }
        />
        <TextArea
          label="Body (빈 줄로 문단 구분)"
          value={content.article.body.join("\n\n")}
          onChange={(value) =>
            onChange({
              ...content,
              article: {
                ...content.article,
                body: value.split("\n\n").filter(Boolean),
              },
            })
          }
        />
        <div className="space-y-4 mt-4">
          {content.article.callouts.map((callout, index) => (
            <div
              key={callout.title + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Callout Title"
                value={callout.title}
                onChange={(value) => {
                  const callouts = [...content.article.callouts];
                  callouts[index] = { ...callouts[index], title: value };
                  onChange({
                    ...content,
                    article: { ...content.article, callouts },
                  });
                }}
              />
              <TextArea
                label="Callout Content"
                value={callout.content}
                onChange={(value) => {
                  const callouts = [...content.article.callouts];
                  callouts[index] = { ...callouts[index], content: value };
                  onChange({
                    ...content,
                    article: { ...content.article, callouts },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Highlights">
        <div className="space-y-4">
          {content.highlights.map((highlight, index) => (
            <div
              key={highlight.title + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Title"
                value={highlight.title}
                onChange={(value) => {
                  const highlights = [...content.highlights];
                  highlights[index] = { ...highlights[index], title: value };
                  onChange({ ...content, highlights });
                }}
              />
              <TextArea
                label="Description"
                value={highlight.description}
                onChange={(value) => {
                  const highlights = [...content.highlights];
                  highlights[index] = {
                    ...highlights[index],
                    description: value,
                  };
                  onChange({ ...content, highlights });
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// 공통 컴포넌트들
type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextField({ label, value, onChange }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <input
        className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextArea({ label, value, onChange }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <textarea
        className="min-h-[96px] rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

