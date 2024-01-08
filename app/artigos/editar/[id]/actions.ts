"use server";

import prisma from "@/lib/prisma";

import { articleSchema, zodErrorHandler } from "@/services/zod-schemas";
import { ZodError } from "zod";

export const updateArticle = async (
  id: string,
  prev: any,
  formData: FormData
) => {
  try {
    const articleData = Object.fromEntries(formData.entries());
    const validated = await articleSchema.parseAsync({ ...articleData, id });
    const { slug, title, content, categoryName } = validated;

    // Create the article
    const article = await prisma.article.update({
      where: { id },
      data: {
        slug,
        title,
        content,
        category: {
          connectOrCreate: {
            where: { name: categoryName },
            create: { name: categoryName },
          },
        },
      },
    });

    console.log("Article updated: ", article.id);
    return { errors: {}, message: "Artigo atualizado com sucesso !" };
  } catch (error) {
    if (error instanceof ZodError) return zodErrorHandler(error);
    console.error(error);
    return { errors: {}, message: "Erro interno do servidor" };
  }
};
