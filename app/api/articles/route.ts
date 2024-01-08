import errorHandler from "@/services-server/error-handler";
import prisma from "@/lib-server/prisma";
import stt from "@/services-server/status-code";

import { Prisma } from "@prisma/client";
import { AM } from "api-models";

export async function GET(request: Request) {
  try {
    const { args } =
      (await request.json()) as AM.RequestData<Prisma.ArticleFindManyArgs>;

    console.log("Fetching articles: ", args);
    const articles = await prisma.article.findMany({
      ...args,
    });

    const response: AM.ResponseData<AM.Article[]> = {
      message: "Articles fetched successfully",
      data: articles,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}

export async function PUT(request: Request) {
  try {
    const { args, data } = (await request.json()) as AM.RequestData<Prisma.ArticleUpdateManyArgs>;

    // Adicione a validação para evitar a atualização de todos os artigos inadvertidamente
    if (!args || Object.keys(args).length === 0) {
      throw new Error("Invalid request. Please provide valid arguments for updating.");
    }

    console.log("Updating articles: ", args, data);
    const updateResult = await prisma.article.updateMany({
      where: args.where,
      data: data,
    });

    const response: AM.ResponseData<AM.BatchPayload> = {
      message: "Articles updated successfully",
      data: updateResult,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}

export async function DELETE(request: Request) {
  try {
    const { args } =
      (await request.json()) as AM.RequestData<Prisma.ArticleDeleteManyArgs>;

    // Adicione a validação para evitar a exclusão de todos os artigos
    if (!args || Object.keys(args).length === 0) {
      throw new Error(
        "Invalid request. Please provide valid arguments for deletion."
      );
    }

    console.log("Deleting articles: ", args);
    const deleteResult = await prisma.article.deleteMany({
      ...args,
    });

    const response: AM.ResponseData<AM.BatchPayload> = {
      message: "Articles deleted successfully",
      data: deleteResult,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}
