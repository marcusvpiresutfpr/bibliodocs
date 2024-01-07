import prisma from "@/lib-server/prisma";
import NewArticleClient from "./client";

export default async function NewArticlePage() {
  if (!prisma) return <div>Prisma Client not found</div>;

  const categories = await prisma.category.findMany({
    select: { name: true },
  });

  const slugs = await prisma.article.findMany({
    select: { slug: true },
  });

  return <NewArticleClient categories={categories} slugs={slugs} />;
}
