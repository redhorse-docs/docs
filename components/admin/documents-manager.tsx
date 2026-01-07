"use client";

import {
  createDocDocument,
  deleteDocDocument,
  getDocDocuments,
  updateDocDocument,
} from "@/app/admin/docs-actions";
import type { DocDocument } from "@/lib/types/docs";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

type DocumentsManagerProps = {
  onSelectDocument?: (document: DocDocument) => void;
  refreshTrigger?: number; // 목록 새로고침 트리거
};

export function DocumentsManager({
  onSelectDocument,
  refreshTrigger,
}: DocumentsManagerProps) {
  const [documents, setDocuments] = useState<DocDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const flashStatus = (message: string) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 2500);
  };

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await getDocDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to load documents", error);
      flashStatus("문서 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [refreshTrigger]);

  const handleCreate = async (data: {
    slug: string;
    title: string;
    description?: string;
  }) => {
    startTransition(async () => {
      const result = await createDocDocument({
        ...data,
        content: {
          title: data.title,
          updated: new Date().toLocaleDateString("ko-KR"),
          body: [],
          callouts: [],
        },
      });

      if (result.success && result.document) {
        flashStatus(result.message);
        setShowCreateForm(false);
        await loadDocuments();
        if (onSelectDocument) {
          onSelectDocument(result.document);
        }
      } else {
        flashStatus(result.message);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 이 문서를 삭제하시겠습니까?")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteDocDocument(id);
      flashStatus(result.message);
      if (result.success) {
        await loadDocuments();
      }
    });
  };

  const handleTogglePublished = async (document: DocDocument) => {
    startTransition(async () => {
      const result = await updateDocDocument(document.id, {
        published: !document.published,
      });
      flashStatus(result.message);
      if (result.success) {
        await loadDocuments();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm text-white/70">문서 목록을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">독스 문서 관리</h2>
          <p className="mt-1 text-sm text-white/60">
            총 {documents.length}개의 문서
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={isPending}
        >
          {showCreateForm ? "취소" : "+ 새 문서 추가"}
        </Button>
      </div>

      {status && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <p className="text-sm text-emerald-300">{status}</p>
        </div>
      )}

      {showCreateForm && (
        <CreateDocumentForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateForm(false)}
          isPending={isPending}
        />
      )}

      {documents.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-white/60">아직 문서가 없습니다.</p>
          <p className="mt-2 text-sm text-white/40">
            "+ 새 문서 추가" 버튼을 눌러 첫 문서를 만들어보세요.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onEdit={() => {
                if (onSelectDocument) {
                  onSelectDocument(document);
                }
              }}
              onDelete={() => handleDelete(document.id)}
              onTogglePublished={() => handleTogglePublished(document)}
              isPending={isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type CreateDocumentFormProps = {
  onSubmit: (data: { slug: string; title: string; description?: string }) => void;
  onCancel: () => void;
  isPending: boolean;
};

function CreateDocumentForm({
  onSubmit,
  onCancel,
  isPending,
}: CreateDocumentFormProps) {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const normalizeSlug = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, "-");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug.trim() || !title.trim()) {
      return;
    }

    onSubmit({
      slug: normalizeSlug(slug),
      title: title.trim(),
      description: description.trim() || undefined,
    });

    setSlug("");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">새 문서 생성</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">
            Slug (URL 경로)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="getting-started"
            className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            required
          />
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/40">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSlug(normalizeSlug(title))}
              disabled={!title.trim()}
              className="text-xs"
            >
              제목으로 슬러그 만들기
            </Button>
            <span>예: /docs/getting-started</span>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Getting Started"
            className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.3em] text-white/50">
            설명 (선택)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="이 문서에 대한 간단한 설명..."
            className="min-h-[80px] w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={isPending || !slug.trim() || !title.trim()}>
            {isPending ? "생성 중..." : "문서 생성"}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}

type DocumentCardProps = {
  document: DocDocument;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublished: () => void;
  isPending: boolean;
};

function DocumentCard({
  document,
  onEdit,
  onDelete,
  onTogglePublished,
  isPending,
}: DocumentCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">{document.title}</h3>
            {document.published ? (
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">
                Published
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-300">
                Draft
              </span>
            )}
          </div>
          {document.description && (
            <p className="mt-1 text-sm text-white/60">{document.description}</p>
          )}
          <div className="mt-3 flex items-center gap-4 text-xs text-white/40">
            <span>Slug: /docs/{document.slug}</span>
            <span>•</span>
            <span>
              업데이트: {new Date(document.updatedAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
        <div className="ml-4 flex gap-2">
          <Button
            variant="ghost"
            onClick={onEdit}
            disabled={isPending}
            className="text-sm"
          >
            편집
          </Button>
          <Button
            variant="ghost"
            onClick={onTogglePublished}
            disabled={isPending}
            className="text-sm"
          >
            {document.published ? "비공개" : "공개"}
          </Button>
          <Button
            variant="ghost"
            onClick={onDelete}
            disabled={isPending}
            className="text-sm text-red-400 hover:text-red-300"
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
