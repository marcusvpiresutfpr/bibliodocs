"use client";

import AutocompleteInput from "@/components/input-autocomplete";
import React from "react";

import { useForm, Controller } from "react-hook-form";
import { articleSchema } from "@/services/yup-schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import RandomData from "./debug-generator";

type Props = {
  initial: Article;
  onSubmit: (data: Article) => void;
  categories: Pick<Category, "name">[];
  slugs: Pick<Article, "slug">[];
  isLoading: boolean;
};

export default function ArticleForm({
  onSubmit,
  initial,
  categories,
  slugs,
  isLoading,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(articleSchema),
    defaultValues: initial,
  });

  const currentSlug = watch("slug");

  const isSlugUnique = React.useCallback(
    (slug: string) => {
      // Verifica se o slug já existe na lista de slugs
      return !slugs.find((existingSlug) => existingSlug.slug === slug);
    },
    [slugs]
  );

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toLowerCase();
    value = value.replace(/\s+/g, "-");
    setValue("slug", value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <form
        className="hero-content flex-col items-start max-w-2xl w-full"
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
              {isSlugUnique(currentSlug)
                ? errors.slug
                  ? String(errors.slug.message)
                  : " "
                : "Esse link já está em uso"}
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
          <label className="label">
            <span className="label-text text-error">
              {errors.categoryName ? String(errors.categoryName.message) : " "}
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
              {errors.title ? String(errors.title.message) : " "}
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
          <label className="label">
            <span className="label-text text-error">
              {errors.content ? String(errors.content.message) : " "}
            </span>
          </label>
        </div>

        <div className="flex space-x-2">
          <button
            disabled={isLoading}
            className="btn btn-primary"
            type="submit"
          >
            Salvar alterações
          </button>
          <button
            disabled={isLoading}
            className="btn"
            onClick={() => {
              const data = RandomData();
              setValue("slug", data.slug);
              setValue("categoryName", data.categoryName);
              setValue("title", data.title);
              setValue("content", data.content);
            }}
          >
            Exemplo para debug
          </button>
        </div>
      </form>
    </div>
  );
}
