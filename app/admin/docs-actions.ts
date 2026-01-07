"use server";

import { docsMock } from "@/lib/data/docs.mock";
import type { Prisma } from "@/lib/generated/prisma/client";
import type { DocsContent } from "@/lib/types/docs";
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
