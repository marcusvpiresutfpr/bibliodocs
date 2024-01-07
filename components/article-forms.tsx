"use client";

import AutocompleteInput from "@/components/autocomplete-input";
import React from "react";

import { useForm, Controller } from "react-hook-form";
import { articleSchema } from "@/services/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  initial: ArticleSchema;
  onSubmit: (data: ArticleSchema) => void;
  categories: Pick<Category, "name">[];
  slugs: Pick<Article, "slug">[];
};

export default function ArticleForm({
  onSubmit,
  initial,
  categories,
  slugs,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(articleSchema),
    defaultValues: initial,
  });

  const isSlugUnique = (slug: string) => {
    // Verifica se o slug já existe na lista de slugs
    return !slugs.find((existingSlug) => existingSlug.slug === slug);
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.trim().toLowerCase();
    // Substitui espaços por -
    value = value.replace(/\s+/g, "-");
    // Remove caracteres especiais
    value = value.replace(/[^a-z0-9-]/g, "");

    setValue("slug", value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <form
        className="hero-content flex-col items-start max-w-lg w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
     <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Link</span>
          </label>
          <input
            autoComplete="off"
            className="input input-bordered"
            {...register("slug")}
            onChange={handleSlugChange}
          />
          <label className="label">
            <span className="label-text text-error">
              {errors.slug && <p>{String(errors.slug.message)}</p>}
            </span>
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Título</span>
          </label>
          <input
            autoComplete="off"
            className="input input-bordered"
            {...register("title")}
          />
          <label className="label">
            <span className="label-text text-error">
              {errors.title && <p>{String(errors.title.message)}</p>}
            </span>
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Conteúdo</span>
          </label>
          <textarea
            autoComplete="off"
            className="textarea textarea-bordered"
            {...register("content")}
          />
          <label>
            <span className="label-text text-error">
              {errors.content && <p>{String(errors.content.message)}</p>}
            </span>
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Categoria</span>
          </label>
          <Controller
            control={control}
            name="categoryName"
            render={({ field }) => (
              <AutocompleteInput
                field={field}
                categories={categories}
                setValue={setValue}
              />
            )}
          />
          <label>
            <span className="label-text text-error">
              {errors.categoryName && (
                <p>{String(errors.categoryName.message)}</p>
              )}
            </span>
          </label>
        </div>
        <button className="btn mt-6" type="submit">
          Criar novo artigo
        </button>
      </form>
    </div>
  );
}
