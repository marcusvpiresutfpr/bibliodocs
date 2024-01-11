import prisma from "@/lib/prisma";
import y from "@/lib/br-yup";

import { State } from "@/components/article-forms";

export type ArticleFormsData = Omit<
  Optional<Article, "id" | "views">,
  "createdAt" | "updatedAt"
>;

const schema: y.ObjectSchema<ArticleFormsData> = y.object({
  id: y.string().uuid().optional(),
  slug: y
    .string()
    .defined()
    .min(3)
    .max(255)
    .matches(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens.")
    .test({
      name: "unique-slug",
      message: "Essa URL já está em uso.",
      test: async (slug, context) => {
        console.log("context parent", context.parent);
        const isSlugUnique =
          (
            await prisma.article.findMany({
              where: { slug: slug, NOT: { id: context.parent.id } },
              select: { slug: true },
            })
          ).length === 0;

        return isSlugUnique;
      },
    }),
  title: y.string().defined().min(3).max(255),
  content: y.string().defined().min(3).max(255000),
  categoryName: y.string().defined().min(3).max(255),
  views: y.number().optional(),
});

export default async function articleValidation(article: Object) {
  return schema.validate(article, {
    abortEarly: false,
    stripUnknown: true,
    strict: true,
  });
}

export function handleValidationErrors(error: y.ValidationError): State {
  const errorMessages = error.inner.reduce((acc, error) => {
    return { ...acc, [String(error.path)]: error.message };
  }, {});

  return {
    validationError: errorMessages,
    message: "Não foi possível atualizar o artigo.",
    sucess: false,
  };
}
