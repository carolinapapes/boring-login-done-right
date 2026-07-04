import type { SubmitHandler } from "react-hook-form";

import { Form } from "@/components/forms/Form";
import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { FormTextField } from "@/components/forms/FormTextField";

import { useLoginForm } from "../hooks/useLoginForm";
import type { LoginFormValues } from "../model/login.schema";

type LoginFormProps = {
  onSubmit: SubmitHandler<LoginFormValues>;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { clearErrors, errors, handleSubmit, register } =
    useLoginForm(onSubmit);

  return (
    <Form onSubmit={handleSubmit}>
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

      <FormSubmitButton>Log in</FormSubmitButton>
    </Form>
  );
}
