import request from "./request";

import { Prisma } from "@prisma/client";

// Types for GET method
type GetRequest = { args?: Prisma.ArticleFindManyArgs };
type GetResponse = { articles: Prisma.ArticleCreateInput[] } | ApiError;

// Types for POST method (example, adjust based on the actual API)
type PostRequest = { args: Prisma.ArticleCreateManyArgs };
type PostResponse = { result: Prisma.BatchPayload } | ApiError;

// Types for PUT method (example, adjust based on the actual API)
type PutRequest = { args: Prisma.ArticleUpdateManyArgs };
type PutResponse = { result: Prisma.BatchPayload } | ApiError;

// Types for DELETE method (example, adjust based on the actual API)
type DeleteRequest = { args?: Prisma.ArticleDeleteManyArgs };
type DeleteResponse = { result: Prisma.BatchPayload };

export async function get(args?: GetRequest, ghost: boolean = false) {
  return await request({
    method: "GET",
    path: "/api/articles",
    body: { args },
    ghost,
  }) as Promise<GetResponse>;
}

export async function post(args: PostRequest, ghost: boolean = false) {
  return await request({
    method: "POST",
    path: "/api/articles",
    body: { args },
    ghost,
  }) as Promise<PostResponse>;
}

export async function put(args: PutRequest, ghost: boolean = false) {
  return await request({
    method: "PUT",
    path: "/api/articles",
    body: { args },
    ghost,
  }) as Promise<PutResponse>;
}

export async function del(args: DeleteRequest, ghost: boolean = false) {
  return await request({
    method: "DELETE",
    path: "/api/articles",
    body: { args },
    ghost,
  }) as Promise<DeleteResponse>;
}
