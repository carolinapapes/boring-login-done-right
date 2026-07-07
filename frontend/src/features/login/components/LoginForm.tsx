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
import { FormErrorSummary } from "@/components/forms/FormErrorSummary";

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
  const { trigger, control, errors, handleSubmit, register } = useLoginForm();
  const guardedSubmit = usePreventDuplicateSubmit(onSubmit);
  const showSlowFeedback = useSlowFeedback(isSubmitting);

  return (
    <Form onSubmit={handleSubmit(guardedSubmit)}>
      <LoginFields register={register} errors={errors} trigger={trigger} />

      <FormErrorSummary message={errorMessage} />

      <FormMessage
        message={
          showSlowFeedback ? "This is taking longer than usual." : undefined
        }
        variant="status"
      />

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
