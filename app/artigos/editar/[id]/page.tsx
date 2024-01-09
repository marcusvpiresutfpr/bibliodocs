import ArticleForms from "@/components/article-forms";
import { updateArticle } from "./actions";
import prisma from "@/lib/prisma";

type Context = {
  params: {
    id: string;
  };
};

export default async function NewArticle({ params: { id } }: Context) {
  const categories = await prisma.category.findMany({
    select: { name: true },
  });

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) return <div>Artigo não encontrado</div>;  

  const updateArticleWithId = updateArticle.bind(null, id)

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content max-w-xl w-full">
        <ArticleForms buttonMessage="Atualizar Artigo" article={article} action={updateArticleWithId} categories={categories} />
      </div>
    </div>
  );
}
