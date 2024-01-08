import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib-server/prisma";
import * as yup from "yup";

const bodySchema = yup.object({
  articleIds: yup.array(yup.string().required()).required(),
});

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const { articleIds } = await bodySchema.validate(body);
    const { count } = await prisma.article.deleteMany({
      where: { id: { in: articleIds } },
    });

    // Verifica se o número de artigos deletados é igual ao número de IDs fornecidos
    if (count === articleIds.length) {
      return NextResponse.json(
        { message: "Artigos deletados com sucesso" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Alguns artigos não foram encontrados",
          deletedCount: count,
          articleIds: articleIds,
          articleIdsCount: articleIds.length,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro interno do servidor", error },
      { status: 500 }
    );
  }
}
