import { Link } from "react-router";

import { PageShell } from "@/components/layout/PageShell";

export function ForgotPasswordPage() {
  return (
    <PageShell
      title="Forgot password"
      description="Password reset is not implemented yet. This route exists to support the login flow."
    >
      <Link
        to="/login"
        className="inline-flex justify-center text-sm font-medium underline-offset-4 hover:underline"
      >
        Back to login
      </Link>
    </PageShell>
  );
}
