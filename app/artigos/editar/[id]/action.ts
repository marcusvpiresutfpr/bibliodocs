"use server";

import prisma from "@/lib/prisma";
import articleValidation, { handleValidationErrors } from "../../validation";

import { State } from "@/components/article-forms";
import { ValidationError } from "yup";

export default async function updateAarticle(
  id: string,
  prev: State,
  formData: FormData
): Promise<State> {
  try {
    const articleData = Object.fromEntries(formData.entries()); 
    const validated = await articleValidation({ id, ...articleData});

    const createdArticle = await prisma.article.update({
      where: { id },
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

    return {
      message: `Artigo atualizado! ${createdArticle.updatedAt.toLocaleString()}`,
      updatedAt: createdArticle.updatedAt,
      sucess: true,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return handleValidationErrors(error);
    } else {
      console.error("Unknow error on update article:", error);
      return {
        message: "Não foi possível atualizar o artigo.",
        unknownError: error,
        sucess: false,
      };
    }
  }
}
