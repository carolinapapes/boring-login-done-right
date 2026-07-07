import type { LoginFormValues } from "./login.schema";

export type LoginCredentials = Pick<LoginFormValues, "email" | "password">;

export type LoginUser = {
  id: string;
  email: string;
};

export type LoginResponse = {
  user: LoginUser;
};
