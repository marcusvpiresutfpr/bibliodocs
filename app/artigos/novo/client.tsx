"use client";

import ArticleForm from "@/components/article-forms";
import { post } from "@/services/api-request-toast";

type Props = {
  categories: Pick<Category, "name">[];
  slugs: Pick<Article, "slug">[];
};

export default function NewArticleClient({ categories, slugs }: Props) {
  const handleSubmit = async (values: ArticleSchema) => {
    await post("/api/articles/create", values);
  };

  return (
    <ArticleForm
      categories={categories}
      slugs={slugs}
      onSubmit={handleSubmit}
      initial={{
        title: `Novo artigo de teste ${new Date().toLocaleString()}`,
        slug: 'novo-artigo-de-teste-' + new Date().toLocaleString().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        content: `Conteúdo do artigo de teste ${new Date().toLocaleString()}`,
        categoryName: `categoria teste ${Math.floor(Math.random() * 10) + 1}`,
      }}
    />
  );
}
