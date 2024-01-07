import { articleSchema } from "@/services/schemas";
import prisma from "@/lib-server/prisma";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, categoryName } = await articleSchema.validate(body)

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Article Created Sussefuly", article: newArticle },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 201 }
    );
  }
}
