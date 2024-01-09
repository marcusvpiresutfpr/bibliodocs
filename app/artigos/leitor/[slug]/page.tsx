import Markdown from "./markdown";
import prisma from "@/lib/prisma";
import Link from "next/link";

type Context = { params: { slug: string } };

export default async function ArticleReaderPage({ params: { slug } }: Context) {
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    // TODO: 404 page
    return <div>Artigo não encontrado</div>;
  }

  return (
    <main>
      <Markdown article={article} />
      <div className="flex justify-end mb-10">
        <Link
          className="btn btn-sm btn-neutral m-4"
          href={`/artigos/editar/${article.id}`}
        >
          Editar artigo
        </Link>
      </div>
    </main>
  );
}
