import type { Control } from "react-hook-form";

import { FormCheckboxField } from "@/components/forms/FormCheckboxField";
import type { LoginFormValues } from "../model/login.schema";
import { AppLink } from "@/components/navigation/AppLink";

type LoginOptionsProps = {
  control: Control<LoginFormValues>;
  disabled?: boolean;
};

export function LoginOptions({ control, disabled }: LoginOptionsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <FormCheckboxField
        control={control}
        name="rememberMe"
        id="remember-me"
        label="Remember me"
        disabled={disabled}
      />

      <AppLink to="/forgot-password">Forgot password?</AppLink>
    </div>
  );
}
