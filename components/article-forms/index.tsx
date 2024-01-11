"use client";

import React from "react";
import ArticleFormControl from "./form-control";
import ArticleButtonSubmit from "./button-submit";
import CategoryInput from "./category-input";

import { useFormState } from "react-dom";
import { ArticleFormsData } from "@/services/article-forms-validation";

export type State = {
  validationError?: { [K in keyof ArticleFormsData]?: string };
  unknownError?: Error | unknown;
  message?: string;
  sucess?: boolean;
  updatedAt?: Date;
};

type Props = {
  categories: { name: string }[];
  article: ArticleFormsData;
  button: string;
  action: (prevState: State, formData: FormData) => Promise<State>;
};

export default function ArticleForms({
  categories,
  article,
  button,
  action,
}: Props) {
  const [state, formAction] = useFormState<State, FormData>(action, {});

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content max-w-3xl w-full">
        <form className="card-body p-4" action={formAction}>
          <ArticleFormControl
            label="URL"
            error={state.validationError?.slug || " "}
          >
            <input
              className="input input-bordered"
              placeholder="titulo-do-artigo"
              autoComplete="off"
              defaultValue={article.slug}
              name="slug"
              type="text"
            />
          </ArticleFormControl>
          <ArticleFormControl
            label="Título"
            error={state.validationError?.title || " "}
          >
            <input
              className="input input-bordered"
              defaultValue={article.title}
              autoComplete="off"
              name="title"
              type="text"
            />
          </ArticleFormControl>
          <ArticleFormControl
            label="Categoria"
            error={state.validationError?.categoryName || " "}
          >
            <CategoryInput
              categories={categories}
              defaultValue={article.categoryName}
              name="categoryName"
            />
          </ArticleFormControl>
          <ArticleFormControl
            label="Conteúdo"
            error={state.validationError?.content || " "}
          >
            <textarea
              className="textarea textarea-bordered"
              defaultValue={article.content}
              name="content"
            />
          </ArticleFormControl>

          <div className="divider">
            {state.message && (
              <span
                className={`text-sm ${
                  state.sucess ? "text-gray-500" : "text-error"
                }`}
              >
                {state.message}
              </span>
            )}
          </div>
          <ArticleButtonSubmit buttonMessage={button} />
        </form>
      </div>
    </div>
  );
}
