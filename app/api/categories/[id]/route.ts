import errorHandler from "@/services-server/error-handler";
import prisma from "@/lib-server/prisma";
import stt from "@/services-server/status-code";

import { Prisma } from "@prisma/client";
import { AM } from "api-models";

type context = {
  
};

export async function GET(request: Request, id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      const notFoundResponse: AM.ResponseData<null> = {
        message: "Category not found",
        data: null,
      };

      return new Response(JSON.stringify(notFoundResponse), { status: stt.notFound });
    }

    const response: AM.ResponseData<AM.Category> = {
      message: "Category fetched successfully",
      data: category,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}

export async function PUT(request: Request, id: string) {
  try {
    const { data } = (await request.json()) as AM.RequestData<Prisma.CategoryUpdateArgs>;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
    });

    const response: AM.ResponseData<AM.Category> = {
      message: "Category updated successfully",
      data: updatedCategory,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}

export async function DELETE(request: Request, id: string) {
  try {
    const deleteResult = await prisma.category.delete({
      where: { id },
    });

    const response: AM.ResponseData<AM.BatchPayload> = {
      message: "Category deleted successfully",
      data: deleteResult,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}