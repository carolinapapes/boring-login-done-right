import { LoginForm } from "./LoginForm";
import { useLogin } from "../hooks/useLogin";

import type { LoginFormValues } from "../model/login.schema";

export function LoginSection() {
  const loginMutation = useLogin();

  function handleLogin(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  return <LoginForm onSubmit={handleLogin} />;
}
