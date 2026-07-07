import { LoginForm } from "./LoginForm";
import { useLoginFlow } from "../hooks/useLoginFlow";

export function LoginSection() {
  const { submitLogin, isSubmitting, errorMessage } = useLoginFlow();

  return (
    <LoginForm
      onSubmit={submitLogin}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    />
  );
}
