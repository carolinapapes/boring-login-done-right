import type { LoginFormValues } from "./login.schema";

export type LoginCredentials = LoginFormValues;

export type LoginUser = {
  id: string;
  email: string;
};

export type LoginResponse = {
  user: LoginUser;
};
