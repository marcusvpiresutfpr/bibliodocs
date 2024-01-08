import errorHandler from "@/services-server/error-handler";
import prisma from "@/lib-server/prisma";
import stt from "@/services-server/status-code";

import { Prisma } from "@prisma/client";
import { AM } from "api-models";

export async function GET(request: Request) {
  try {
    const { args } = (await request.json()) as AM.RequestData<Prisma.CategoryFindManyArgs>;

    const categories = await prisma.category.findMany({
      ...args,
    });

    const response: AM.ResponseData<AM.Category[]> = {
      message: "Categories fetched successfully",
      data: categories,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}

export async function PUT(request: Request) {
  try {
    const { args, data } = (await request.json()) as AM.RequestData<Prisma.CategoryUpdateManyArgs>;

    const updateResult = await prisma.category.updateMany({
      ...args,
      data,
    });

    const response: AM.ResponseData<AM.BatchPayload> = {
      message: "Categories updated successfully",
      data: updateResult,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}

export async function DELETE(request: Request) {
  try {
    const { args } = (await request.json()) as AM.RequestData<Prisma.CategoryDeleteManyArgs>;

    const deleteResult = await prisma.category.deleteMany({
      ...args,
    });

    const response: AM.ResponseData<AM.BatchPayload> = {
      message: "Categories deleted successfully",
      data: deleteResult,
    };

    return new Response(JSON.stringify(response), { status: stt.success });
  } catch (error) {
    errorHandler(error, request);
  }
}