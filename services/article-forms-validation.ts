import prisma from "@/lib/prisma";
import y from "@/lib/br-yup";

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
              where: { NOT: { id: context.parent.id, slug: slug } },
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

export default async function articleValidation(article: ArticleFormsData) {
  return schema.validate(article, {
    abortEarly: false,
    stripUnknown: true,
    strict: true,
  });
}
