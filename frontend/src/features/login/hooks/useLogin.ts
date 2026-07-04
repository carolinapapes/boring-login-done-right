import { useMutation } from "@tanstack/react-query";

import { login } from "../api/loginApi";

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
