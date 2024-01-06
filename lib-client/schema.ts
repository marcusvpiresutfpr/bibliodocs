import { ObjectSchema } from "yup";
import * as y from "yup";

export const categoryShape: ObjectSchema<
  Omit<Category, "articles" | "formulas">
> = y.object({
  id: y.string().max(500).default(undefined),
  createdAt: y.date().default(undefined),
  updatedAt: y.date().default(undefined),
  name: y.string().required(),
});

export const articleShape: ObjectSchema<Omit<Article, "category">> = y.object({
  id: y.string().max(500).default(undefined),
  createdAt: y.date().default(undefined),
  updatedAt: y.date().default(undefined),
  title: y.string().required().min(1).max(50),
  content: y.string().required().min(1).max(50000),
  categoryName: y.string().required().min(1).max(50),
});

export const formulaShape: ObjectSchema<Omit<Formula, "category">> = y.object({
  id: y.string().max(500).default(undefined),
  createdAt: y.date().default(undefined),
  updatedAt: y.date().default(undefined),
  name: y.string().required().min(1).max(50),
  content: y
    .object({
      expression: y.string().required().min(1).max(1000),
      parameters: y
        .array(
          y.object({
            name: y.string().required().min(1).max(50).default(undefined),
            value: y.number().max(1000000000).default(undefined),
            unit: y.string().max(50).default(undefined),
            description: y.string().max(500).default(undefined),
          })
        )
        .required()
        .default([])
        .max(100),
    })
    .required(),
  categoryName: y.string().required().max(50),
});

export const articleSchema: ObjectSchema<Article> = y.object({
  ...articleShape.fields,
  category: categoryShape.default(undefined),
}) as ObjectSchema<Article>;

export const formulaSchema: ObjectSchema<Formula> = y.object({
  ...formulaShape.fields,
  category: categoryShape.default(undefined),
}) as ObjectSchema<Formula>;

export const categorySchema: ObjectSchema<Category> = y.object({
  ...categoryShape.fields,
  articles: y.array(articleSchema).default([]),
  formulas: y.array(formulaSchema).default([]),
}) as ObjectSchema<Category>;
