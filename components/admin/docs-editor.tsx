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
      <SectionCard
        title="Header"
        description="Docs 상단 헤더와 검색 영역을 설정합니다."
      >
        <TextField
          label="Title"
          value={content.header.title}
          placeholder="Docs 제목"
          helperText="상단에 크게 표시됩니다."
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
          placeholder="문서 소개 한두 줄을 입력하세요."
          helperText="검색창 위에 표시되는 요약 문장입니다."
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
          placeholder="문서에서 검색"
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
          placeholder={"Getting Started\nAPI Reference\nRelease Notes"}
          helperText="태그는 한 줄에 하나씩 입력하세요."
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

      <SectionCard
        title="Quickstart"
        description="Docs 상단 우측 카드에 표시됩니다."
      >
        <TextField
          label="Title"
          value={content.quickstart.title}
          placeholder="Quickstart"
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
          placeholder="처음 방문한 사용자가 빠르게 시작할 수 있게 안내합니다."
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
                placeholder="예: 계정 만들기"
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
          placeholder="시작하기"
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
          placeholder="/docs/getting-started"
          helperText="버튼을 눌렀을 때 이동할 주소입니다."
          onChange={(value) =>
            onChange({
              ...content,
              quickstart: { ...content.quickstart, ctaHref: value },
            })
          }
        />
      </SectionCard>

      <SectionCard
        title="Navigation"
        description="좌측 사이드바 네비게이션 그룹입니다."
      >
        <div className="space-y-6">
          {content.nav.map((group, groupIndex) => (
            <div
              key={group.title + groupIndex}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Group Title"
                value={group.title}
                placeholder="Getting Started"
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
                      placeholder="Installation"
                      onChange={(value) => {
                        const nav = [...content.nav];
                        const items = [...nav[groupIndex].items];
                        items[itemIndex] = { ...items[itemIndex], label: value };
                        nav[groupIndex] = { ...nav[groupIndex], items };
                        onChange({ ...content, nav });
                      }}
                    />
                    <SelectField
                      label="배지 상태"
                      value={item.status || ""}
                      helperText="사이드바에 작은 배지를 표시합니다."
                      options={[
                        { value: "", label: "표시 안 함" },
                        { value: "updated", label: "Updated" },
                        { value: "new", label: "New" },
                      ]}
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

      <SectionCard
        title="Article"
        description="문서 본문 영역을 구성합니다."
      >
        <TextField
          label="Title"
          value={content.article.title}
          placeholder="문서 제목"
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
          placeholder="2024-05-01"
          helperText="문서 상단에 노출되는 날짜입니다."
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
          placeholder={"첫 번째 문단입니다.\n\n두 번째 문단입니다."}
          helperText="문단 사이에 빈 줄을 한 번 넣어주세요."
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
                placeholder="Tip"
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
                placeholder="강조하고 싶은 내용을 입력하세요."
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

      <SectionCard
        title="Highlights"
        description="본문 아래 강조 카드 영역입니다."
      >
        <div className="space-y-4">
          {content.highlights.map((highlight, index) => (
            <div
              key={highlight.title + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Title"
                value={highlight.title}
                placeholder="Feature Highlight"
                onChange={(value) => {
                  const highlights = [...content.highlights];
                  highlights[index] = { ...highlights[index], title: value };
                  onChange({ ...content, highlights });
                }}
              />
              <TextArea
                label="Description"
                value={highlight.description}
                placeholder="한 줄 요약을 입력하세요."
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
  helperText?: string;
  placeholder?: string;
};

function TextField({ label, value, onChange, placeholder, helperText }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <input
        className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText && <p className="text-xs text-white/40">{helperText}</p>}
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, helperText }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <textarea
        className="min-h-[96px] rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText && <p className="text-xs text-white/40">{helperText}</p>}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  helperText?: string;
};

function SelectField({
  label,
  value,
  options,
  onChange,
  helperText,
}: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <select
        className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white focus:border-white/40 focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value || option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p className="text-xs text-white/40">{helperText}</p>}
    </label>
  );
}

type SectionCardProps = {
  title: string;
  children: ReactNode;
  description?: string;
};

function SectionCard({ title, children, description }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {description && <p className="text-sm text-white/60">{description}</p>}
      {children}
    </section>
  );
}
