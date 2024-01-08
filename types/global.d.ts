import { Prisma } from "@prisma/client";

declare global {
  type Article = Prisma.Article;
  type Formula = Prisma.Formula;
  type Category = Prisma.Category;
}

