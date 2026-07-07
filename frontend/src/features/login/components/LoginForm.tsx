import type { SubmitHandler } from "react-hook-form";

import { Form } from "@/components/forms/Form";
import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { LoginFields } from "./LoginFields";
import { FormMessage } from "@/components/forms/FormMessage";
import { usePreventDuplicateSubmit } from "@/components/forms/hooks/usePreventDuplicateSubmit";
import { useLoginForm } from "../hooks/useLoginForm";
import { useSlowFeedback } from "@/components/forms/hooks/useSlowFeedback";

import type { LoginFormValues } from "../model/login.schema";
import { LoginOptions } from "./LoginOptions";

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
  const { clearErrors, control, errors, handleSubmit, register } =
    useLoginForm();
  const guardedSubmit = usePreventDuplicateSubmit(onSubmit);
  const showSlowFeedback = useSlowFeedback(isSubmitting);

  return (
    <Form onSubmit={handleSubmit(guardedSubmit)}>
      <LoginFields
        register={register}
        errors={errors}
        clearErrors={clearErrors}
      />

      {errorMessage && <FormMessage id="login-error" message={errorMessage} />}

      {showSlowFeedback && (
        <FormMessage
          message="This is taking longer than usual."
          variant="status"
        />
      )}

      <LoginOptions control={control} disabled={isSubmitting} />

      <FormSubmitButton
        isSubmitting={isSubmitting}
        submittingText="Logging in..."
      >
        Log in
      </FormSubmitButton>
    </Form>
  );
}
