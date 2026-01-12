"use server";

import { landingMock } from "@/lib/data/landing.mock";
import type { Prisma } from "@prisma/client";
import type { LandingContent } from "@/lib/types/landing";
import { prisma } from "@/lib/utils/prisma";

/** 데이터 베이스에서 LandingContent를 불러온다. */
export async function getLandingContent(): Promise<LandingContent> {
  if (!process.env.DATABASE_URL) {
    return landingMock;
  }

  try {
    const record = await prisma.landingContent.findUnique({
      where: { id: "default" },
    });

    if (record && record.content) {
      return record.content as LandingContent;
    }

    return landingMock;
  } catch (error) {
    console.error("Failed to fetch landing content from database", error);
    return landingMock;
  }
}

/**
 * LadingContent를 DB에 저장
 */
export async function saveLandingContent(content: LandingContent): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await prisma.landingContent.upsert({
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
      message: "DB에 저장을 성공하였습니다, 메인 페이지('/)로 새로고침 하세요.",
    };
  } catch (error) {
    console.error("Failed to save landing content to database", error);
    return {
      success: false,
      message: "저장에 실패하였습니다. 다시 시도해주세요.",
    };
  }
}

/** 데이터베이스의 내용을 기본값으로 초기화합니다. */
export async function resetLandingContent(): Promise<{
  success: boolean;
  message: string;
  content: LandingContent;
}> {
  try {
    await prisma.landingContent.upsert({
      where: { id: "default" },
      update: {
        content: landingMock as unknown as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
      create: {
        id: "default",
        content: landingMock as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      success: true,
      message: "데이터베이스를 기본값으로 초기화했습니다.",
      content: landingMock,
    };
  } catch (err) {
    console.error("Failed to reset landing content to database", err);
    return {
      success: false,
      message: "초기화에 실패하였습니다. 다시 시도해주세요.",
      content: landingMock,
    };
  }
}
