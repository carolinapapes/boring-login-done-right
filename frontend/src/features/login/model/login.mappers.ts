import type { LoginCredentials } from "./login.types";
import type { LoginFormValues } from "./login.schema";

export function toLoginCredentials({
  email,
  password,
}: LoginFormValues): LoginCredentials {
  return {
    email,
    password,
  };
}
