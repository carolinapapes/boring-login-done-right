import type { SubmitHandler } from "react-hook-form";

import { Form } from "@/components/forms/Form";
import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { LoginFields } from "./LoginFields";
import { FormErrorMessage } from "@/components/forms/FormErrorMessage";
import { usePreventDuplicateSubmit } from "@/components/forms/hooks/usePreventDuplicateSubmit";
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
  const guardedSubmit = usePreventDuplicateSubmit(onSubmit);

  return (
    <Form onSubmit={handleSubmit(guardedSubmit)}>
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
