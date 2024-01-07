import { ObjectSchema } from "yup";

import * as y from "yup";
import * as pt from "@/lib-client/yup-locale";

y.setLocale(pt);

export const categorySchema: ObjectSchema<Category> = y.object({
  id: y.string().max(500).required(),
  createdAt: y.date().required(),
  updatedAt: y.date().required(),
  name: y.string().required(),
});

export const articleSchema: ObjectSchema<Article> = y.object({
  id: y.string().max(500).required(),
  createdAt: y.date().required(),
  updatedAt: y.date().required(),
  views: y.number().required(),
  slug: y
    .string()
    .min(1)
    .max(50)
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Deve conter apenas letras minúsculas e números"
    )
    .required(),
  title: y.string().required().min(1).max(50),
  content: y.string().required().min(1).max(50000),
  categoryName: y.string().required().min(1).max(50),
});

export const formulaSchema: ObjectSchema<Formula> = y.object({
  id: y.string().max(500).required(),
  createdAt: y.date().required(),
  updatedAt: y.date().required(),
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
