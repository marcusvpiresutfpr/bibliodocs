"use client";

import React from "react";

import ArticleForm from "@/app/artigos/[id]/article-forms";
import { put } from "@/services/api-request-toast";

type Props = {
  id: string;
  categories: Pick<Category, "name">[];
  slugs: Pick<Article, "slug">[];
  article: Article;
};

export default function UpdateArticleClient({ id, categories, slugs, article }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (values: Article) => {
    try {
      setIsLoading(true);
      await put(`/api/articles/${id}`, values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ArticleForm
      categories={categories}
      slugs={slugs}
      onSubmit={handleSubmit}
      initial={article}
      isLoading={isLoading}
    />
  );
}
