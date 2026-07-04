import { LoginForm } from "./LoginForm";
import { useLogin } from "../hooks/useLogin";
import { getLoginErrorMessageFromError } from "../model/login.errors";

import type { LoginFormValues } from "../model/login.schema";

export function LoginSection() {
  const loginMutation = useLogin();

  function handleLogin(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  const errorMessage = loginMutation.isError
    ? getLoginErrorMessageFromError(loginMutation.error)
    : undefined;

  return (
    <LoginForm
      onSubmit={handleLogin}
      isSubmitting={loginMutation.isPending}
      errorMessage={errorMessage}
    />
  );
}
