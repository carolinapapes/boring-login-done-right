import type {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";

import { FormTextField } from "@/components/forms/FormTextField";
import { usePasswordVisibility } from "@/components/forms/hooks/usePasswordVisibility";
import { LOGIN_FIELDS } from "../model/login.fields";
import type { LoginFormValues } from "../model/login.schema";

type LoginFieldsProps = {
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  trigger: UseFormTrigger<LoginFormValues>;
};

type LoginFieldName = (typeof LOGIN_FIELDS)[number]["name"];

type RevalidatingRegisterParams = {
  fieldName: LoginFieldName;
  register: UseFormRegister<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  trigger: UseFormTrigger<LoginFormValues>;
};

function getRevalidatingRegister({
  fieldName,
  register,
  errors,
  trigger,
}: RevalidatingRegisterParams) {
  const fieldRegister = register(fieldName);
  const hasError = Boolean(errors[fieldName]);

  return {
    ...fieldRegister,
    onChange: async (event: Parameters<typeof fieldRegister.onChange>[0]) => {
      await fieldRegister.onChange(event);

      if (hasError) {
        await trigger(fieldName);
      }
    },
  };
}

export function LoginFields({ register, errors, trigger }: LoginFieldsProps) {
  const { passwordInputType, passwordToggleButton } = usePasswordVisibility();

  return (
    <>
      {LOGIN_FIELDS.map((field) => {
        const isPasswordField = field.name === "password";
        const error = errors[field.name]?.message;

        return (
          <FormTextField
            key={field.id}
            id={field.id}
            name={field.name}
            label={field.label}
            type={isPasswordField ? passwordInputType : field.type}
            autoComplete={field.autoComplete}
            inputMode={field.inputMode}
            spellCheck={field.spellCheck}
            autoCapitalize={field.autoCapitalize}
            register={getRevalidatingRegister({
              fieldName: field.name,
              register,
              errors,
              trigger,
            })}
            error={error}
            endButton={isPasswordField ? passwordToggleButton : undefined}
          />
        );
      })}
    </>
  );
}
