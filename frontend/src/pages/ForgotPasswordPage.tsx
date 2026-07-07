import { PageShell } from "@/components/layout/PageShell";
import { AppLink } from "@/components/navigation/AppLink";

export function ForgotPasswordPage() {
  return (
    <PageShell
      title="Forgot password"
      description="Password reset is not implemented yet. This route exists to support the login flow."
      contentVariant="card"
    >
      <AppLink to="/login" appearance="button" buttonVariant="outline">
        Back to login
      </AppLink>
    </PageShell>
  );
}
