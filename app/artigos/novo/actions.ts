"use server";

import prisma from "@/lib/prisma";

import { articleSchema, zodErrorHandler } from "@/services/zod-schemas";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export const createArticle = async (prevState: any, formData: FormData) => {
  let articleId: string;
  try {
    console.log("Creating article...");
    const articleData = Object.fromEntries(formData.entries());
    const validated = await articleSchema.parseAsync({
      ...articleData,
      id: null,
    });
    const { slug, title, content, categoryName } = validated;

    // Create the article
    const article = await prisma.article.create({
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

    articleId = article.id;
    console.log("Article created: ", article.id);
  } catch (error) {
    if (error instanceof ZodError) return zodErrorHandler(error);
    return { errors: {}, message: "Erro interno do servidor" };
  }

  // Redirect to the article page
  console.log("Redirecting to: ", `/artigos/editar/${articleId}`);
  if (articleId) redirect(`/artigos/editar/${articleId}`);
};
