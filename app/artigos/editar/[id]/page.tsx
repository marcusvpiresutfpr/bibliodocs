import prisma from "@/lib-server/prisma";
import UpdateArticleClient from "./client";
import ErrorHero from "@/components/hero-error";

export default async function UpdateArticlePage({
  params,
}: {
  params: { id: string };
}) {
  if (!prisma)
    return (
      <ErrorHero message="Não foi possível se comunicar com o banco de dados" />
    );

  const categories = await prisma.category.findMany({
    select: { name: true },
  });

  const article = await prisma.article.findUnique({
    where: { id: params.id },
  });

  const slugs = await prisma.article.findMany({
    where: { NOT: { slug: article?.slug } },
    select: { slug: true },
  });

  if (!article) return <ErrorHero message="Artigo não encontrado" />;

  return (
    <UpdateArticleClient
      id={params.id}
      categories={categories}
      slugs={slugs}
      article={article}
    />
  );
}
