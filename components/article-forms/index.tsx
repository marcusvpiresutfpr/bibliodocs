"use client";

import ArticleFormControl from "./form-control";
import ArticleSubmitButton from "./submit-button";
import { useFormState } from "react-dom";

type Props = {
  article: Article;
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<
    | {
        errors?: Partial<Record<keyof Article, string>>;
        message?: string;
      }
    | undefined
  >;
};

export default function ArticleForms({ article, action }: Props) {
  const [state, formAction] = useFormState(action, {});
  console.log("Resposta do servidor:", state);

  return (
    <form className="card-body p-4" action={formAction}>
      <ArticleFormControl label="URL" error={state?.errors?.slug || " "}>
        <input
          className="input input-bordered"
          placeholder="titulo-do-artigo"
          autoComplete="off"
          defaultValue={article?.slug}
          name="slug"
          type="text"
        />
      </ArticleFormControl>
      <ArticleFormControl label="Título" error={state?.errors?.title || " "}>
        <input
          className="input input-bordered"
          defaultValue={article?.title}
          autoComplete="off"
          name="title"
          type="text"
        />
      </ArticleFormControl>
      <ArticleFormControl
        label="Categoria"
        error={state?.errors?.categoryName || " "}
      >
        <input
          className="input input-bordered"
          defaultValue={article?.categoryName}
          autoComplete="off"
          type="text"
          name="categoryName"
        />
      </ArticleFormControl>
      <ArticleFormControl
        label="Conteúdo"
        error={state?.errors?.content || " "}
      >
        <textarea
          className="textarea textarea-bordered"
          defaultValue={article?.content}
          name="content"
        />
      </ArticleFormControl>

      <div className="divider"></div>
      <ArticleSubmitButton />
    </form>
  );
}
