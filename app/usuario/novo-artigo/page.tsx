"use client";

import React from "react";
import AutocompleteInput from "@/components/autocomplete-input";

import { useForm, Controller } from "react-hook-form";
import { articleSchema } from "@/services/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

const MyForm = () => {
  const [categories, setCategories] = React.useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(articleSchema),
  });

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <form className="hero-content flex-col items-start max-w-lg w-full">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Título</span>
          </label>
          <input
            autoComplete="off"
            className="input input-bordered"
            {...register("título")}
          />
          <label className="label">
            <span className="label-text text-error">
              {errors.título && <p>{errors.título.message}</p>}
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
            {...register("conteúdo")}
          />
          <label>
            <span className="label-text text-error">
              {errors.conteúdo && <p>{errors.conteúdo.message}</p>}
            </span>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Categoria</span>
          </label>
          <Controller
            control={control}
            name="categoria"
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
              {errors.categoria && <p>{errors.categoria.message}</p>}
            </span>
          </label>
        </div>

        <button className="btn mt-6" type="submit">
          Criar novo artigo
        </button>
      </form>
    </div>
  );
};

export default MyForm;
