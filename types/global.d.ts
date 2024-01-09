import {
  Article as PrismaArticle,
  Formula as PrismaFormula,
  Category as PrismaCategory,
} from '@prisma/client';
declare global {
  type Article = PrismaArticle;
  type Formula = PrismaFormula;
  type Category = PrismaCategory;
}

