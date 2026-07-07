import type { Control } from "react-hook-form";

import { FormCheckboxField } from "@/components/forms/FormCheckboxField";
import type { LoginFormValues } from "../model/login.schema";

type LoginOptionsProps = {
  control: Control<LoginFormValues>;
  disabled?: boolean;
};

export function LoginOptions({ control, disabled }: LoginOptionsProps) {
  return (
    <FormCheckboxField
      control={control}
      name="rememberMe"
      id="remember-me"
      label="Remember me"
      disabled={disabled}
    />
  );
}
