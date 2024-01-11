"use server";

import prisma from "@/lib/prisma";
import articleValidation, { handleValidationErrors } from "../validation";

import { State } from "@/components/article-forms";
import { redirect } from "next/navigation";
import { ValidationError } from "yup";

export default async function articleAction(
  prev: State,
  formData: FormData
): Promise<State> {
  let articleId: string | undefined;

  try {
    const articleData = Object.fromEntries(formData.entries());
    const validated = await articleValidation(articleData);

    const createdArticle = await prisma.article.create({
      data: {
        slug: validated.slug,
        title: validated.title,
        content: validated.content,
        category: {
          connectOrCreate: {
            where: { name: validated.categoryName },
            create: { name: validated.categoryName },
          },
        },
      },
    });
    articleId = createdArticle.id;

  } catch (error) {
    if (error instanceof ValidationError) {
      return handleValidationErrors(error);
    } else {
      console.error("Unknow error on create article:", error);
      return {
        message: "Não foi possível criar o artigo.",
        unknownError: error,
        sucess: false,
      };
    }
  }

  // Redirect to the article page
  console.log("Redirecting to: ", `/artigos/editar/${articleId}`);
  if (articleId) redirect(`/artigos/editar/${articleId}`);

  return {
    message: "Artigo criado com sucesso.",
    sucess: true,
  }
}
