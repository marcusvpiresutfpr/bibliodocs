import prisma from "@/lib-server/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return new Response(
    JSON.stringify({
      articles,
    }),
    { status: 200 }
  );
}
