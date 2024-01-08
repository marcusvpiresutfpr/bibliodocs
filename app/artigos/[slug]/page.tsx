import Link from "next/link";
import prisma from "@/lib-server/prisma";
import ErrorHero from "@/components/hero-error";
import Remote from "@/components/mdx/remote";
import { PenLine } from "lucide-react";

export default async function UpdateArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  if (!prisma)
    return (
      <ErrorHero message="Não foi possível se comunicar com o banco de dados" />
    );

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return <ErrorHero message="Artigo não encontrado" />;

  return (
    <article className="prose-sm md:prose my-44 w-full">
      <h1>{article.title}</h1>
      <div className="divider divider-start mb-10 ">
      </div>
      <Remote source={article.content} />
      <Link className="btn btn-sm mt-10" href={`/artigos/editar/${article.id}`}>
        <PenLine size={15} />
        Editar artigo
      </Link>
    </article>
  );
}
