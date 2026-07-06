import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";

import { FormTextField } from "@/components/forms/FormTextField";
import { usePasswordVisibility } from "@/components/forms/hooks/usePasswordVisibility";
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
  const { passwordInputType, passwordToggleButton } = usePasswordVisibility();

  return (
    <>
      {LOGIN_FIELDS.map((field) => {
        const isPasswordField = field.name === "password";

        return (
          <FormTextField
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            type={isPasswordField ? passwordInputType : field.type}
            autoComplete={field.autoComplete}
            register={register(field.name)}
            error={errors[field.name]?.message}
            onFocus={() => clearErrors(field.name)}
            endButton={isPasswordField ? passwordToggleButton : undefined}
          />
        );
      })}
    </>
  );
}
