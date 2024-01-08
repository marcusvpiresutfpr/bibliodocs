import prisma from "@/lib-server/prisma";
import errorHandler from "@/lib-server/error-handler";

import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

type GetRequest = { args?: Prisma.ArticleFindManyArgs<DefaultArgs> };

export async function GET(request: NextRequest) {
  try {
    const body = (await request.json()) as GetRequest;
    const args = body.args || {};

    // Fetching articles from the database ordered by update date
    const articles = await prisma.article.findMany({
      ...args,
    });

    // Returning a well-structured JSON response with status 200 (OK)
    return new NextResponse(JSON.stringify({ articles }), {
      status: 200,
    });
  } catch (error) {
    errorHandler(error, request);
  }
}

type PostRequest = { args: Prisma.ArticleCreateManyArgs<DefaultArgs> };
type PostResponse = { result: Prisma.BatchPayload };

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PostRequest;
    const args = body.args || {};

    // Creating articles in the database
    const result = await prisma.article.createMany({
      ...args,
    });

    // Returning a well-structured JSON response with status 200 (OK)
    return new NextResponse<PostResponse>(JSON.stringify({ result }), {
      status: 200,
    });
  } catch (error) {
    errorHandler(error, request);
  }
}

type PutRequest = { args: Prisma.ArticleUpdateManyArgs<DefaultArgs> };
type PutResponse = { articles: Prisma.BatchPayload };

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as PutRequest;
    const args = body.args || {};

    // Updating articles in the database
    const result = await prisma.article.updateMany({
      ...args,
    });

    // Returning a well-structured JSON response with status 200 (OK)
    return new NextResponse<PutResponse>(JSON.stringify({ result }), {
      status: 200,
    });
  } catch (error) {
    errorHandler(error, request);
  }
}

type DeleteRequest = { args?: Prisma.ArticleDeleteManyArgs<DefaultArgs> };
type DeleteResponse = { result: Prisma.BatchPayload };

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as DeleteRequest;
    const args = body.args || {};

    // Deleting articles from the database
    const result = await prisma.article.deleteMany({
      ...args,
    });

    // Returning a well-structured JSON response with status 200 (OK)
    return new NextResponse<DeleteResponse>(JSON.stringify({ result }), {
      status: 200,
    });
  } catch (error) {
    errorHandler(error, request)
  }
}
