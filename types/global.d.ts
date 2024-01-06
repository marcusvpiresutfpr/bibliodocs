import {
  Article as PrismaArticle,
  Formula as PrismaFormula,
  Category as PrismaCategory,
} from "@prisma/client";

declare global {
  type Article = {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    title: string;
    content: string;
    categoryName: string;
    category?: Category;
  };
  type Formula = {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string;
    content: {
      expression: string;
      parameters: {
        name: string;
        value?: number | undefined | null | BigIntege;
        unit?: string | undefined;
        description?: string | undefined;
      }[];
    };
    categoryName: string;
    category?: Category;
  };
  type Category = {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
    name: string;
    articles?: Article[];
    formulas?: Formula[];
  };
}
