import type { LoginFormValues } from "./login.schema";

type LoginFieldConfig = {
  name: keyof LoginFormValues;
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  autoComplete: string;
};

export const LOGIN_FIELDS: LoginFieldConfig[] = [
  {
    name: "email",
    id: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    id: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
  },
];
