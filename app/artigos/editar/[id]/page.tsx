import ArticleForms from "@/components/article-forms";
import { updateArticle } from "./actions";
import prisma from "@/lib/prisma";

type Context = {
  params: {
    id: string;
  };
};

export default async function NewArticle({ params: { id } }: Context) {
  const article = await prisma.article.findUnique({
    where: { id },
  });

  const updateArticleWithId = updateArticle.bind(null, id)

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content max-w-xl w-full">
        <ArticleForms article={article} action={updateArticleWithId} />
      </div>
    </div>
  );
}
