import type { InputHTMLAttributes } from "react";
import type { LoginFormValues } from "./login.schema";

type LoginFieldConfig = {
  id: string;
  name: keyof Pick<LoginFormValues, "email" | "password">;
  label: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  spellCheck?: boolean;
  autoCapitalize?: string;
};

export const LOGIN_FIELDS = [
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    inputMode: "email",
    spellCheck: false,
    autoCapitalize: "none",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
  },
] satisfies LoginFieldConfig[];
