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
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Admin Mode
          </p>
          <h1 className="text-3xl font-semibold">Content Editor</h1>
          <p className="text-sm text-white/70">
            각 입력 필드를 수정한 뒤 &ldquo;변경 저장&rdquo;을 누르면
            데이터베이스에 내용이 반영됩니다. 해당 페이지를 새로고침하면 저장된
            내용으로 즉시 미리볼 수 있습니다.
          </p>

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
              Landing
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
              Docs
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
              Documents
            </button>
          </div>

          {/* 액션 버튼 */}
          {activeTab === "documents" && selectedDocument ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSaveDocument} disabled={isPending}>
                {isPending ? "저장 중..." : "문서 저장"}
              </Button>
            </div>
          ) : activeTab === "landing" ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSaveLanding} disabled={isPending}>
                {isPending ? "저장 중..." : "Landing 변경 저장"}
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
