import prisma from "@/lib/prisma";
import ArticleForms from "@/components/article-forms";
import createArticle from "./action";

export default async function NewArticle() {
  const categories = await prisma.category.findMany({
    select: { name: true },
  });

  // TODO: Remove this debugKey
  const debugKey = `${new Date()
    .toISOString()
    .replace(/[^0-9]/g, "-")
    .slice(0, -1)}`;
  const article = {
    slug: debugKey,
    title: `artigo ${debugKey}`,
    categoryName: `categoria ${Math.floor(Math.random() * 3)}`,
    content: `# conteúdo ${debugKey}`,
  };

  return (
    <ArticleForms
      button={"Novo Artigo"}
      categories={categories}
      article={article}
      action={createArticle}
    />
  );
}
