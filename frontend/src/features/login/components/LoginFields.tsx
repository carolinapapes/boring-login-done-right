import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";

import { FormTextField } from "@/components/forms/FormTextField";

import { LOGIN_FIELDS } from "../model/login.fields";

import type { LoginFormValues } from "../model/login.schema";

type LoginFieldsProps = {
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  clearErrors: UseFormClearErrors<LoginFormValues>;
};

export function LoginFields({
  register,
  errors,
  clearErrors,
}: LoginFieldsProps) {
  return (
    <>
      {LOGIN_FIELDS.map((field) => (
        <FormTextField
          key={field.id}
          id={field.id}
          name={field.name}
          label={field.label}
          type={field.type}
          autoComplete={field.autoComplete}
          register={register(field.name)}
          error={errors[field.name]?.message}
          onFocus={() => clearErrors(field.name)}
        />
      ))}
    </>
  );
}
