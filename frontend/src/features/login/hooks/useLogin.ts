import { useMutation } from "@tanstack/react-query";

import { login } from "../api/loginApi";
import { toLoginCredentials } from "../model/login.mappers";
import type { LoginFormValues } from "../model/login.schema";

export function useLogin() {
  return useMutation({
    mutationFn: (values: LoginFormValues) => login(toLoginCredentials(values)),
  });
}
