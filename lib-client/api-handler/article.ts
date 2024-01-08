import request from "./request";
import { Prisma } from "@prisma/client";

// Tipo para representar a estrutura de um artigo
type ArticleResponse = Prisma.ArticleCreateInput;

// Tipos para GET method
type GetRequest = { id: string };
type GetResponse = { article?: ArticleResponse } | ApiError;

// Tipos para PUT method
type PutRequest = { args: Omit<Prisma.ArticleUpdateArgs, "where"> };
type UpdateResponse = { article?: ArticleResponse } | ApiError;

// Tipos para DELETE method
type DeleteResponse = { article?: ArticleResponse } | ApiError;

export async function getArticleById(args: GetRequest, ghost: boolean = false): Promise<GetResponse> {
  const { id } = args;

  // Faça uma solicitação GET para recuperar o artigo com o ID especificado
  const response = await request({
    method: "GET",
    path: `/api/articles/${id}`,
    ghost,
  }) as Promise<GetResponse>;

  return response;
}

export async function updateArticleById(id: string, args: PutRequest, ghost: boolean = false): Promise<UpdateResponse> {
  // Faça uma solicitação PUT para atualizar o artigo com o ID especificado
  const response = await request({
    method: "PUT",
    path: `/api/articles/${id}`,
    body: { args },
    ghost,
  }) as Promise<UpdateResponse>;

  return response;
}

export async function deleteArticleById(id: string, ghost: boolean = false): Promise<DeleteResponse> {
  // Faça uma solicitação DELETE para excluir o artigo com o ID especificado
  const response = await request({
    method: "DELETE",
    path: `/api/articles/${id}`,
    ghost,
  }) as Promise<DeleteResponse>;

  return response;
}
