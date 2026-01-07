"use client";

import {
  getLandingContent,
  resetLandingContent,
  saveLandingContent,
} from "@/app/admin/actions";
import {
  getDocsContent,
  resetDocsContent,
  saveDocsContent,
  updateDocDocument,
} from "@/app/admin/docs-actions";
import { DocsEditor } from "@/components/admin/docs-editor";
import { DocumentEditor } from "@/components/admin/document-editor";
import { DocumentsManager } from "@/components/admin/documents-manager";
import { LandingEditor } from "@/components/admin/landing-editor";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { docsMock } from "@/lib/data/docs.mock";
import { landingMock } from "@/lib/data/landing.mock";
import type { DocDocument, DocsContent } from "@/lib/types/docs";
import type { LandingContent } from "@/lib/types/landing";
import { useEffect, useState, useTransition } from "react";

type TabType = "landing" | "docs" | "documents";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("landing");
  const [landingContent, setLandingContent] =
    useState<LandingContent>(landingMock);
  const [docsContent, setDocsContent] = useState<DocsContent>(docsMock);
  const [selectedDocument, setSelectedDocument] = useState<DocDocument | null>(
    null
  );
  const [documentsRefreshTrigger, setDocumentsRefreshTrigger] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const tabDetails = {
    landing: {
      label: "랜딩",
      title: "랜딩 페이지",
      description:
        "홈 화면의 헤더, 섹션 설명, 버튼 문구를 수정합니다.",
      previewHref: "/",
    },
    docs: {
      label: "Docs 설정",
      title: "Docs 메인",
      description:
        "Docs 첫 화면에 보이는 제목, 요약, 사이드바 구성을 수정합니다.",
      previewHref: "/docs",
    },
    documents: {
      label: "문서 목록",
      title: "개별 문서",
      description:
        "실제 문서의 제목/본문을 편집하거나 새 문서를 추가합니다.",
      previewHref: selectedDocument ? `/docs/${selectedDocument.slug}` : "/docs",
    },
  } as const;
  const activeDetails = tabDetails[activeTab];

  // DB를 이용해서 데이터 로딩
  useEffect(() => {
    async function loadContent() {
      try {
        const [landingData, docsData] = await Promise.all([
          getLandingContent(),
          getDocsContent(),
        ]);
        setLandingContent(landingData);
        setDocsContent(docsData);
      } catch (error) {
        console.error("Failed to load content from database", error);
        setStatus("데이터 로딩에 실패했습니다. 기본값으로 설정합니다.");
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, []);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const stored = window.localStorage.getItem(STORAGE_KEY);
  //   if (stored) {
  //     try {
  //       // eslint-disable-next-line react-hooks/set-state-in-effect
  //       setContent(JSON.parse(stored) as LandingContent);
  //     } catch {
  //       window.localStorage.removeItem(STORAGE_KEY);
  //     }
  //   }
  // }, []);

  const flashStatus = (message: string) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 2500);
  };

  // Landing 핸들러
  const handleSaveLanding = () => {
    startTransition(async () => {
      const result = await saveLandingContent(landingContent);
      flashStatus(result.message);
    });
  };

  const handleResetLanding = () => {
    startTransition(async () => {
      const result = await resetLandingContent();
      if (result.success) {
        setLandingContent(result.content);
      }
      flashStatus(result.message);
    });
  };

  const handleCopyLanding = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(landingContent, null, 2)
      );
      flashStatus("Landing JSON을 클립보드에 복사했습니다.");
    } catch {
      flashStatus("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // Docs 핸들러
  const handleSaveDocs = () => {
    startTransition(async () => {
      const result = await saveDocsContent(docsContent);
      flashStatus(result.message);
    });
  };

  const handleResetDocs = () => {
    startTransition(async () => {
      const result = await resetDocsContent();
      if (result.success) {
        setDocsContent(result.content);
      }
      flashStatus(result.message);
    });
  };

  const handleCopyDocs = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(docsContent, null, 2));
      flashStatus("Docs JSON을 클립보드에 복사했습니다.");
    } catch {
      flashStatus("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // Documents 핸들러
  const handleSaveDocument = () => {
    if (!selectedDocument) return;

    startTransition(async () => {
      const result = await updateDocDocument(selectedDocument.id, {
        slug: selectedDocument.slug,
        title: selectedDocument.title,
        description: selectedDocument.description,
        content: selectedDocument.content,
      });
      flashStatus(result.message);
      if (result.success && result.document) {
        // 저장 성공 후 업데이트된 문서로 상태 업데이트
        setSelectedDocument(result.document);
      }
    });
  };

  const handleSelectDocument = (document: DocDocument) => {
    setSelectedDocument(document);
  };

  const handleBackToDocuments = () => {
    setSelectedDocument(null);
    // 목록 새로고침 트리거
    setDocumentsRefreshTrigger((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="bg-[var(--rh-background)] py-12 text-white">
        <Container>
          <p className="text-sm text-white/70">데이터를 불러오는 중...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[var(--rh-background)] py-12 text-white">
      <Container className="space-y-8">
        <header className="space-y-3">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                Admin Mode
              </p>
              <h1 className="text-3xl font-semibold">Content Editor</h1>
              <p className="text-sm text-white/70">
                각 입력 필드를 수정한 뒤 &ldquo;변경 저장&rdquo;을 누르면
                데이터베이스에 내용이 반영됩니다. 해당 페이지를 새로고침하면
                저장된 내용으로 즉시 미리볼 수 있습니다.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                  현재 편집
                </span>
                <p className="mt-1 text-base text-white">{activeDetails.title}</p>
                <p className="mt-1 text-sm text-white/60">
                  {activeDetails.description}
                </p>
              </div>
            </div>
            <aside className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                빠른 편집 가이드
              </p>
              <ol className="mt-3 space-y-2 text-sm text-white/70">
                <li>1. 탭을 선택해 수정할 영역을 고릅니다.</li>
                <li>2. 입력칸에 내용을 넣고 저장 버튼을 눌러요.</li>
                <li>3. 미리보기로 화면이 어떻게 보이는지 확인합니다.</li>
              </ol>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                내용이 길면 자동으로 줄바꿈됩니다. 문단은 빈 줄로 구분해요.
              </div>
            </aside>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex gap-2 border-b border-white/10">
            <button
              onClick={() => {
                setActiveTab("landing");
                setSelectedDocument(null);
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "landing"
                  ? "border-b-2 border-white text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              {tabDetails.landing.label}
            </button>
            <button
              onClick={() => {
                setActiveTab("docs");
                setSelectedDocument(null);
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "docs"
                  ? "border-b-2 border-white text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              {tabDetails.docs.label}
            </button>
            <button
              onClick={() => {
                setActiveTab("documents");
                setSelectedDocument(null);
              }}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "documents"
                  ? "border-b-2 border-white text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              {tabDetails.documents.label}
            </button>
          </div>

          {/* 액션 버튼 */}
          {activeTab === "documents" && selectedDocument ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSaveDocument} disabled={isPending}>
                {isPending ? "저장 중..." : "문서 저장"}
              </Button>
              <Button variant="ghost" href={activeDetails.previewHref}>
                문서 미리보기
              </Button>
            </div>
          ) : activeTab === "landing" ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSaveLanding} disabled={isPending}>
                {isPending ? "저장 중..." : "Landing 변경 저장"}
              </Button>
              <Button variant="ghost" href={activeDetails.previewHref}>
                랜딩 미리보기
              </Button>
              <Button
                variant="ghost"
                onClick={handleCopyLanding}
                disabled={isPending}
              >
                Landing JSON 복사
              </Button>
              <Button
                variant="ghost"
                onClick={handleResetLanding}
                disabled={isPending}
              >
                Landing 기본값으로 초기화
              </Button>
            </div>
          ) : activeTab === "docs" ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSaveDocs} disabled={isPending}>
                {isPending ? "저장 중..." : "Docs 변경 저장"}
              </Button>
              <Button variant="ghost" href={activeDetails.previewHref}>
                Docs 미리보기
              </Button>
              <Button
                variant="ghost"
                onClick={handleCopyDocs}
                disabled={isPending}
              >
                Docs JSON 복사
              </Button>
              <Button
                variant="ghost"
                onClick={handleResetDocs}
                disabled={isPending}
              >
                Docs 기본값으로 초기화
              </Button>
            </div>
          ) : null}

          {status && (
            <p className="text-sm text-emerald-300" role="status">
              {status}
            </p>
          )}
        </header>

        {/* 편집 영역 */}
        {activeTab === "landing" ? (
          <LandingEditor
            content={landingContent}
            onChange={setLandingContent}
          />
        ) : activeTab === "docs" ? (
          <DocsEditor content={docsContent} onChange={setDocsContent} />
        ) : activeTab === "documents" ? (
          selectedDocument ? (
            <DocumentEditor
              document={selectedDocument}
              onChange={setSelectedDocument}
              onBack={handleBackToDocuments}
            />
          ) : (
            <DocumentsManager
              onSelectDocument={handleSelectDocument}
              refreshTrigger={documentsRefreshTrigger}
            />
          )
        ) : null}
      </Container>
    </div>
  );
}
