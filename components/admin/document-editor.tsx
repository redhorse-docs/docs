"use client";

import { Button } from "@/components/ui/button";
import type { DocDocument, DocsArticle } from "@/lib/types/docs";
import type { ReactNode } from "react";

type DocumentEditorProps = {
  document: DocDocument;
  onChange: (document: DocDocument) => void;
  onBack: () => void;
};

export function DocumentEditor({
  document,
  onChange,
  onBack,
}: DocumentEditorProps) {
  const updateContent = (updates: Partial<DocsArticle>) => {
    onChange({
      ...document,
      content: {
        ...document.content,
        ...updates,
      },
    });
  };

  const updateDocument = (updates: Partial<DocDocument>) => {
    onChange({
      ...document,
      ...updates,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{document.title}</h2>
          <p className="mt-1 text-sm text-white/60">Slug: /docs/{document.slug}</p>
        </div>
        <Button variant="ghost" onClick={onBack}>
          ← 목록으로
        </Button>
      </div>

      <SectionCard title="문서 정보">
        <TextField
          label="Slug (URL 경로)"
          value={document.slug}
          onChange={(value) =>
            updateDocument({
              slug: value.trim().toLowerCase().replace(/\s+/g, "-"),
            })
          }
        />
        <p className="text-xs text-white/40">
          URL에 사용될 경로입니다. (예: /docs/getting-started)
        </p>
        <TextField
          label="제목"
          value={document.title}
          onChange={(value) => updateDocument({ title: value })}
        />
        <TextField
          label="설명 (선택)"
          value={document.description || ""}
          onChange={(value) => updateDocument({ description: value || undefined })}
        />
        <TextField
          label="문서 제목 (본문)"
          value={document.content.title}
          onChange={(value) => updateContent({ title: value })}
        />
        <TextField
          label="업데이트 날짜"
          value={document.content.updated}
          onChange={(value) => updateContent({ updated: value })}
        />
      </SectionCard>

      <SectionCard title="본문">
        <TextArea
          label="본문 (빈 줄로 문단 구분)"
          value={document.content.body.join("\n\n")}
          onChange={(value) =>
            updateContent({
              body: value.split("\n\n").filter(Boolean),
            })
          }
        />
      </SectionCard>

      <SectionCard title="Callouts">
        <div className="space-y-4">
          {document.content.callouts.map((callout, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Callout Title"
                value={callout.title}
                onChange={(value) => {
                  const callouts = [...document.content.callouts];
                  callouts[index] = { ...callouts[index], title: value };
                  updateContent({ callouts });
                }}
              />
              <TextArea
                label="Callout Content"
                value={callout.content}
                onChange={(value) => {
                  const callouts = [...document.content.callouts];
                  callouts[index] = { ...callouts[index], content: value };
                  updateContent({ callouts });
                }}
              />
              <Button
                variant="ghost"
                onClick={() => {
                  const callouts = document.content.callouts.filter(
                    (_, i) => i !== index
                  );
                  updateContent({ callouts });
                }}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                삭제
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              const callouts = [
                ...document.content.callouts,
                { title: "Note", content: "" },
              ];
              updateContent({ callouts });
            }}
          >
            + Callout 추가
          </Button>
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


