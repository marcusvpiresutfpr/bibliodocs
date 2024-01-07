import { redirect } from 'next/navigation'

import prisma from "@/lib-server/prisma";
import HeroError from "@/components/hero-error";

export default async function NewArticlePage() {
  if (!prisma) {
    console.error("Prisma Client not found");
    return <HeroError message="Não foi possível se comunicar com o banco de dados" />;
  };

  const newArticle = await prisma.article.create({
    data: {
      title: "Novo Artigo",
      content: "",
      category: {
        connectOrCreate: {
          where: { name: "Sem categoria" },
          create: { name: "Sem categoria" },
        },
      },
    },
  });

  if (!newArticle) return <HeroError message="Não foi possível criar um novo artigo" />;
  else redirect(`/artigos/${newArticle.id}`);
}
