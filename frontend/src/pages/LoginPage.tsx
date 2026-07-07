import { PageShell } from "@/components/layout/PageShell";
import { LoginSection } from "@/features/login/components/LoginSection";

export function LoginPage() {
  return (
    <PageShell
      title="Log in"
      description="Access your dashboard with your email and password."
      contentVariant="card"
    >
      <LoginSection />
    </PageShell>
  );
}
