import type { SubmitHandler } from "react-hook-form";

import { Form } from "@/components/forms/Form";
import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { LoginFields } from "./LoginFields";
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LoginFields
        register={register}
        errors={errors}
        clearErrors={clearErrors}
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
