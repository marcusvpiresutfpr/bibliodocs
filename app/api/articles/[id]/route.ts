import prisma from "@/lib-server/prisma";

import { articleSchema } from "@/services/yup-schemas";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { id, createdAt, updatedAt, categoryName, ...data } =
      await articleSchema.validate(body);

    const article = await prisma.article.update({
      where: { id: context.params.id },
      data: {
        ...data,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 201 }
    );
  }
}
