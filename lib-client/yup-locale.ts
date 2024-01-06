/*eslint-disable no-template-curly-in-string*/

import { printValue, LocaleObject } from "yup";

// Based on https://github.com/jquense/yup/blob/b940eef48eb7456622ae384d0ffa7363d4fbad25/src/locale.ts
export const mixed: LocaleObject["mixed"] = {
  default: "Inválido.",
  required: "Obrigatório",
  defined: "$Não deve ser indefinido",
  notNull: "Não pode ser vazio",
  oneOf: "Deve ter um dos seguintes valores: ${values}",
  notOneOf: "Não deve ter nenhum dos seguintes valores: ${values}",
  notType: ({
    path,
    type,
    value,
    originalValue,
  }: {
    path: string;
    type: string;
    value: any;
    originalValue: any;
  }) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg =
      `Deve ser do tipo \`${type}\`, ` +
      `mas o valor final foi: \`${printValue(value, true)}\`` +
      (isCast
        ? ` (cast do valor \`${printValue(originalValue, true)}\`).`
        : ".");

    if (value === null) {
      msg +=
        '\n Se a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`';
    }

    return msg;
  },
};

export const string: LocaleObject["string"] = {
  length: ({ path, length }: { path: string; length: number }) =>
    `Deve ter exatamente ${length} ${
      length === 1 ? "caractere" : "caracteres"
    }`,
  min: ({ path, min }: { path: string; min: number }) =>
    `Deve ter no mínimo ${min} ${
      min === 1 ? "caractere" : "caracteres"
    }`,
  max: ({ path, max }: { path: string; max: number }) =>
    `Deve ter no máximo ${max} ${
      max === 1 ? "caractere" : "caracteres"
    }`,
  matches: 'Deve corresponder ao padrão: "${regex}"',
  email: "Deve ser um e-mail válido",
  url: "Deve ser uma URL válida",
  uuid: "Deve ser um UUID válido",
  trim: "Não deve conter espaços no início nem no fim",
  lowercase: "Deve estar em letras minúsculas",
  uppercase: "Deve estar em letras maiúsculas",
};

export const number: LocaleObject["number"] = {
  min: "Deve ser maior ou igual a ${min}",
  max: "Deve ser menor ou igual a ${max}",
  lessThan: "Deve ser menor que ${less}",
  moreThan: "Deve ser maior que ${more}",
  positive: "Deve ser um número positivo",
  negative: "Deve ser um número negativo",
  integer: "Deve ser um número inteiro",
};

export const date: LocaleObject["date"] = {
  min: "Deve ser posterior a ${min}",
  max: "Deve ser anterior a ${max}",
};

export const boolean: LocaleObject["boolean"] = {
  isValue: "Deve ser ${value}",
};

export const object: LocaleObject["object"] = {
  noUnknown: "${path} tem chaves desconhecidas: ${unknown}",
};

export const array: LocaleObject["array"] = {
  min: ({ path, min }: { path: string; min: number }) =>
    `Deve ter no mínimo ${min} ${min === 1 ? "item" : "itens"}`,
  max: ({ path, max }: { path: string; max: number }) =>
    `Deve ter no máximo ${max} ${max === 1 ? "item" : "itens"}`,
  length: ({ path, length }: { path: string; length: number }) =>
    `Deve ter ${length} ${length === 1 ? "item" : "itens"}`,
};
