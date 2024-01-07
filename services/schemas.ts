import * as y from "yup";
import * as pt from "@/lib-client/yup-locale";

y.setLocale(pt);

export const categorySchema = y.object({
  id: y.string().max(500).default(undefined),
  createdAt: y.date().default(undefined),
  updatedAt: y.date().default(undefined),
  name: y.string().required(),
  articles: y.array(y.object()),
  formulas: y.array(y.object()),
});

export const articleSchema = y.object({
  id: y.string().max(500).default(undefined),
  createdAt: y.date().default(undefined),
  updatedAt: y.date().default(undefined),
  views: y.number().default(undefined),
  slug: y
    .string()
    .min(1)
    .max(50)
    .matches(/^[a-z]+(?:-[a-z]+)*$/, 'Deve conter apenas letras minúsculas')
    .required(),  title: y.string().required().min(1).max(50),
  content: y.string().required().min(1).max(50000),
  categoryName: y.string().required().min(1).max(50),
  category: y.object(),
});

export const formulaSchema = y.object({
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
  category: y.object(),
});
