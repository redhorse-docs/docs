import { prisma } from "@/lib/utils/prisma";

export async function GET() {
  try {
    const r = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 AS ok`;
    return Response.json({ ok: true, result: r });
  } catch (error: unknown) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
