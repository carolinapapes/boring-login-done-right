import type { SubmitHandler } from "react-hook-form";

import { Form } from "@/components/forms/Form";
import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { FormTextField } from "@/components/forms/FormTextField";
import { FormErrorMessage } from "@/components/forms/FormErrorMessage";

import { useLoginForm } from "../hooks/useLoginForm";

import type { LoginFormValues } from "../model/login.schema";

type LoginFormProps = {
  onSubmit: SubmitHandler<LoginFormValues>;
  isSubmitting?: boolean;
  errorMessage?: string;
};

export function LoginForm({
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: LoginFormProps) {
  const { clearErrors, errors, handleSubmit, register } = useLoginForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormTextField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        register={register("email")}
        error={errors.email?.message}
        onFocus={() => clearErrors("email")}
      />

      <FormTextField
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        register={register("password")}
        error={errors.password?.message}
        onFocus={() => clearErrors("password")}
      />

      {errorMessage && (
        <FormErrorMessage id="login-error" message={errorMessage} />
      )}

      <FormSubmitButton
        isSubmitting={isSubmitting}
        submittingText="Logging in..."
      >
        Log in
      </FormSubmitButton>
    </Form>
  );
}
