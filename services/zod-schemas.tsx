import translation from "zod-i18n-map/locales/pt/zod.json";
import prisma from "@/lib/prisma";
import i18next from "i18next";

import z, { ZodError } from "zod";
import { zodI18nMap } from "zod-i18n-map";

i18next.init({ lng: "pt", resources: { pt: { zod: translation } } });
z.setErrorMap(zodI18nMap);

const slugInUse = async (slug: string, id: string | null) => {
  const query = { where: { slug } };
  if (id) Object.assign(query.where, { NOT: { id } });

  const existingArticle = await prisma.article.findUnique(query);
  return Boolean(existingArticle);
};

export type ArticleData = z.infer<typeof articleSchema>;

export const articleSchema = z
  .object({
    id: z.string().uuid().nullable(),
    slug: z
      .string()
      .min(3)
      .max(50)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i),
    title: z.string().min(3).max(50),
    content: z.string().min(3).max(500),
    categoryName: z.string().min(3).max(50),
  })
  .refine(async (data: { slug: string; id: string | null }) => {
    const { slug, id } = data;
    const result = await slugInUse(slug, id);

    return !result
      ? {
          message: "Slug is already in use",
          errors: { slug: "Slug is already in use" },
        }
      : undefined;
  }, "slug");

async function isSlugInUse(slug: string, id: string): Promise<boolean> {
  const existingArticle = await prisma.article.findUnique({
    where: { slug, NOT: { id } },
  });
  return Boolean(existingArticle);
}

export function zodErrorHandler(error: ZodError) {
  const fieldErrors: Partial<Record<keyof Article, string | undefined>> = {};
  for (const [fieldName, errors] of Object.entries(
    error.flatten().fieldErrors
  )) {
    fieldErrors[fieldName] = errors?.[0] || undefined;
  }
  return { errors: fieldErrors, message: error.message };
}
