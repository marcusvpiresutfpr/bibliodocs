import * as pt from "@/lib-client/yup-locale";
import * as yup from "yup";

yup.setLocale(pt);

export const articleSchema = yup
  .object({
    título: yup.string().min(3).max(25).required(),
    conteúdo: yup.string().max(50000).required(),
    categoria: yup.string().required(),
  })
  .required();