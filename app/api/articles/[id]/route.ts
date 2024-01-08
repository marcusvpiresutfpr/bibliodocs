import prisma from "@/lib-server/prisma";
import errorHandler from "@/lib-server/error-handler";

import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;

    // Retrieve the article with the specified ID
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      // Return a 404 response if the article is not found
      return new NextResponse(JSON.stringify({ error: "Article not found" }), {
        status: 404,
      });
    }

    // Returning a well-structured JSON response with status 200 (OK)
    return new NextResponse(JSON.stringify({ article }), {
      status: 200,
    });
  } catch (error) {
    errorHandler(error, request);
  }
}

type PutRequest = { args: Omit<Prisma.ArticleUpdateArgs, "where"> };

export async function PUT(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;

    const body = (await request.json()) as PutRequest;
    const args = body.args || {};

    // Ensure that the article with the specified ID exists
    const article = await prisma.article.update({
      where: { id },
      ...args,
    });

    if (!article) {
      // Return a 404 response if the article is not found
      return new NextResponse(JSON.stringify({ error: "Article not found" }), {
        status: 404,
      });
    }

    // Returning a well-structured JSON response with status 200 (OK)
    return new NextResponse(JSON.stringify({ article }), {
      status: 200,
    });
  } catch (error) {
    errorHandler(error, request);
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;

    // Ensure that the article with the specified ID exists
    const article = await prisma.article.delete({
      where: { id },
    });

    if (!article) {
      // Return a 404 response if the article is not found
      return new NextResponse(JSON.stringify({ error: "Article not found"}), {
        status: 404,
      });
    }
    // Returning a well-structured JSON response with status 200 (OK)
    return new NextResponse(JSON.stringify({ article }), {
      status: 200,
    });
  } catch (error) {
    errorHandler(error, request);
  }
}
