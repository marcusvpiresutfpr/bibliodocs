import prisma from "@/lib-server/prisma";
import ArticleForm from "@/components/article-forms";

export default async function NewArticlePage() {
  if (!prisma) return <div>Prisma Client not found</div>;

  const categories = await prisma.category.findMany({
    select: { name: true },
  });

  return (
    <ArticleForm
      categories={categories}
      initial={{
        títlulo: "",
        conteúdo: "",
        categoria: "",
      }}
    />
  );
}
