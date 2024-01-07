import {
  Article as PrismaArticle,
  Formula as PrismaFormula,
  Category as PrismaCategory,
} from "@prisma/client";

import * as schema from "@/services/schemas";

declare global {
  type Article = PrismaArticle & { category?: Category };
  type Formula = PrismaFormula & {
    category?: Category;
    content: {
      expression: string;
      parameters: {
        name: string;
        value: number | null | BigIntege;
        unit: string;
        description: string;
      }[];
    } | JSON;
  };
  type Category = PrismaCategory & {
    articles?: Article[];
    formulas?: Formula[];
  };
  type ArticleSchema = schema.TypeOf<typeof schema.articleSchema>;
  type CategorySchema = schema.TypeOf<typeof schema.categorySchema>;
  type FormulaSchema = schema.TypeOf<typeof schema.formulaSchema>;
}
