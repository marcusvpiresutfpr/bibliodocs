import {
  Article as PrismaArticle,
  Formula as PrismaFormula,
  Category as PrismaCategory,
} from "@prisma/client";

declare global {
  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

  type Article = PrismaArticle;
  type Formula = PrismaFormula;
  type Category = PrismaCategory;
}
