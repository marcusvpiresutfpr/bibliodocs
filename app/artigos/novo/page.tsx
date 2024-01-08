import ArticleForms from "@/components/article-forms";

import { createArticle } from "./actions";

export default function NewArticle() {

  const debugKey = `${new Date().toISOString().replace(/[^0-9]/g, "-").slice(0, -1)}`

  const article = {
    slug: debugKey,
    title: `Artigo ${debugKey}`,
    categoryName: `Categoria ${Math.floor(Math.random() * 3)}`,
    content: `Conteúdo ${debugKey}`,
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content max-w-xl w-full">
        <ArticleForms article={article} action={createArticle} />
      </div>  
    </div>
  );
}
