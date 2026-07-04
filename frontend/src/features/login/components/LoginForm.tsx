import { FormSubmitButton } from "@/components/forms/FormSubmitButton";
import { FormTextField } from "@/components/forms/FormTextField";
import { Form } from "@/components/forms/Form";

export function LoginForm() {
  return (
    <Form>
      <FormTextField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={undefined}
      />

      <FormTextField
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        error={undefined}
      />

      <FormSubmitButton>Log in</FormSubmitButton>
    </Form>
  );
}
