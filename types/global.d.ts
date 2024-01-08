import {
  Article as PrismaArticle,
  Formula as PrismaFormula,
  Category as PrismaCategory,
} from "@prisma/client";

import * as schema from "@/services/yup-schemas";

declare global {
  type Article = PrismaArticle;
  type Formula = PrismaFormula;
  type Category = PrismaCategory;
  type ApiError = { error: string, details?: unknown };
}
