import { LoginForm } from "./LoginForm";
import type { LoginFormValues } from "../model/login.schema";

export function LoginSection() {
  function handleLogin(values: LoginFormValues) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return <LoginForm onSubmit={handleLogin} />;
}
