"use server";

import { docsMock } from "@/lib/data/docs.mock";
import type { Prisma } from "@prisma/client";
import type { DocDocument, DocsArticle, DocsContent } from "@/lib/types/docs";
import { prisma } from "@/lib/utils/prisma";

export async function getDocsContent(): Promise<DocsContent> {
  if (!process.env.DATABASE_URL) {
    return docsMock;
  }

  try {
    const record = await prisma.docsContent.findUnique({
      where: { id: "default" },
    });

    if (record && record.content) {
      return record.content as DocsContent;
    }

    return docsMock;
  } catch (error) {
    console.error("Failed to fetch docs content from database", error);
    return docsMock;
  }
}

export async function saveDocsContent(
  content: DocsContent
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.docsContent.upsert({
      where: { id: "default" },
      update: {
        content: content as unknown as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
      create: {
        id: "default",
        content: content as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      success: true,
      message: "Docs 내용이 데이터베이스에 저장되었습니다.",
    };
  } catch (error) {
    console.error("Failed to save docs content to database", error);
    return {
      success: false,
      message: "저장에 실패했습니다. 다시 시도해주세요.",
    };
  }
}

export async function resetDocsContent(): Promise<{
  success: boolean;
  message: string;
  content: DocsContent;
}> {
  try {
    await prisma.docsContent.upsert({
      where: { id: "default" },
      update: {
        content: docsMock as unknown as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
      create: {
        id: "default",
        content: docsMock as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      success: true,
      message: "Docs 내용을 기본값으로 초기화했습니다.",
      content: docsMock,
    };
  } catch (error) {
    console.error("Failed to reset docs content to database", error);
    return {
      success: false,
      message: "초기화에 실패했습니다. 다시 시도해주세요.",
      content: docsMock,
    };
  }
}

export async function getDocDocuments(): Promise<DocDocument[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    // Prisma Client가 제대로 초기화되었는지 확인
    if (!prisma || !prisma.docDocument) {
      console.error("Prisma Client가 제대로 초기화되지 않았습니다.");
      console.error("prisma:", prisma);
      console.error("prisma.docDocument:", prisma?.docDocument);
      return [];
    }

    const documents = await prisma.docDocument.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return documents.map((doc) => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      description: doc.description || undefined,
      content: doc.content as DocsArticle,
      order: doc.order,
      published: doc.published,
      updatedAt: doc.updatedAt.toISOString(),
      createdAt: doc.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch doc documents from database", error);
    return [];
  }
}

// 단일 독스 문서 조회
export async function getDocDocument(
  slug: string
): Promise<DocDocument | null> {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const document = await prisma.docDocument.findUnique({
      where: { slug },
    });

    if (!document) {
      return null;
    }

    return {
      id: document.id,
      slug: document.slug,
      title: document.title,
      description: document.description || undefined,
      content: document.content as DocsArticle,
      order: document.order,
      published: document.published,
      updatedAt: document.updatedAt.toISOString(),
      createdAt: document.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch doc document from database", error);
    return null;
  }
}

// 독스 문서 생성
export async function createDocDocument(data: {
  slug: string;
  title: string;
  description?: string;
  content: DocsArticle;
}): Promise<{ success: boolean; message: string; document?: DocDocument }> {
  try {
    // slug 정규화 및 유효성 검사
    const normalizedSlug = data.slug.trim().toLowerCase().replace(/\s+/g, "-");

    // 빈 값 체크
    if (!normalizedSlug) {
      return {
        success: false,
        message: "Slug는 비어있을 수 없습니다.",
      };
    }

    // 유효한 slug 형식 체크 (영문자, 숫자, 하이픈만 허용)
    if (!/^[a-z0-9-]+$/.test(normalizedSlug)) {
      return {
        success: false,
        message: "Slug는 영문자, 숫자, 하이픈(-)만 사용할 수 있습니다.",
      };
    }

    // slug 중복 체크
    const existing = await prisma.docDocument.findUnique({
      where: { slug: normalizedSlug },
    });

    if (existing) {
      return {
        success: false,
        message: `이미 존재하는 slug입니다: ${normalizedSlug}`,
      };
    }

    // 기본 content가 없으면 빈 문서 생성
    const defaultContent: DocsArticle = data.content || {
      title: data.title,
      updated: new Date().toLocaleDateString("ko-KR"),
      body: [],
      callouts: [],
    };

    const document = await prisma.docDocument.create({
      data: {
        slug: normalizedSlug,
        title: data.title,
        description: data.description,
        content: defaultContent as Prisma.InputJsonValue,
        order: 0,
        published: true,
      },
    });

    return {
      success: true,
      message: "독스 문서가 생성되었습니다.",
      document: {
        id: document.id,
        slug: document.slug,
        title: document.title,
        description: document.description || undefined,
        content: document.content as DocsArticle,
        order: document.order,
        published: document.published,
        updatedAt: document.updatedAt.toISOString(),
        createdAt: document.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Failed to create doc document", error);
    return {
      success: false,
      message: "독스 문서 생성에 실패했습니다. 다시 시도해주세요.",
    };
  }
}

// 독스 문서 업데이트
export async function updateDocDocument(
  id: string,
  data: Partial<{
    slug: string;
    title: string;
    description: string;
    content: DocsArticle;
    order: number;
    published: boolean;
  }>
): Promise<{ success: boolean; message: string; document?: DocDocument }> {
  try {
    // slug 변경 시 유효성 검사 및 중복 체크
    if (data.slug !== undefined) {
      // slug 정규화
      const normalizedSlug = data.slug
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

      // 빈 값 체크
      if (!normalizedSlug) {
        return {
          success: false,
          message: "Slug는 비어있을 수 없습니다.",
        };
      }

      // 유효한 slug 형식 체크 (영문자, 숫자, 하이픈만 허용)
      if (!/^[a-z0-9-]+$/.test(normalizedSlug)) {
        return {
          success: false,
          message: "Slug는 영문자, 숫자, 하이픈(-)만 사용할 수 있습니다.",
        };
      }

      // 중복 체크
      const existing = await prisma.docDocument.findUnique({
        where: { slug: normalizedSlug },
      });

      if (existing && existing.id !== id) {
        return {
          success: false,
          message: `이미 존재하는 slug입니다: ${normalizedSlug}`,
        };
      }

      // 정규화된 slug 사용
      data.slug = normalizedSlug;
    }

    const updateData: Prisma.DocDocumentUpdateInput = {};

    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.content !== undefined)
      updateData.content = data.content as Prisma.InputJsonValue;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.published !== undefined) updateData.published = data.published;

    const updated = await prisma.docDocument.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "독스 문서가 업데이트되었습니다.",
      document: {
        id: updated.id,
        slug: updated.slug,
        title: updated.title,
        description: updated.description || undefined,
        content: updated.content as DocsArticle,
        order: updated.order,
        published: updated.published,
        updatedAt: updated.updatedAt.toISOString(),
        createdAt: updated.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Failed to update doc document", error);
    return {
      success: false,
      message: "독스 문서 업데이트에 실패했습니다. 다시 시도해주세요.",
    };
  }
}

// 독스 문서 삭제
export async function deleteDocDocument(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.docDocument.delete({
      where: { id },
    });

    return {
      success: true,
      message: "독스 문서가 삭제되었습니다.",
    };
  } catch (error) {
    console.error("Failed to delete doc document", error);
    return {
      success: false,
      message: "독스 문서 삭제에 실패했습니다. 다시 시도해주세요.",
    };
  }
}
