"use client";

import React from "react";
import AutocompleteInput from "@/components/autocomplete-input";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    título: yup.string().min(3).max(25).required(),
    conteúdo: yup.string().max(50000).required(),
    categoria: yup.string().required(),
  })
  .required();

const exampleOptions = new Array(100).fill(0).map((_, i) => ({
  name: `option ${i}`,
}));

type FormType = yup.InferType<typeof schema>;

const MyForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-base-200" onSubmit={handleSubmit(onSubmit)}>
      <form className="hero-content flex-col">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Título</span>
          </label>
          <input {...register("título")} />
          <label className="label">
            <span className="label-text text-error">
              {errors.título && <p>{errors.título.message}</p>}
            </span>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Conteúdo</span>
          </label>
          <textarea {...register("conteúdo")} />
          <label>
            <span className="label-text text-error">
              {errors.conteúdo && <p>{errors.conteúdo.message}</p>}
            </span>
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Categoria</span>
          </label>
          <Controller
            control={control}
            name="categoria"
            render={({ field }) => (
              <AutocompleteInput
                field={field}
                categories={exampleOptions}
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

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default MyForm;
