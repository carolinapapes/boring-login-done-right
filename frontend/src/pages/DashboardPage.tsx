import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/PageShell";
import { useLogout } from "@/features/session/hooks/useLogout";

export function DashboardPage() {
  const logoutMutation = useLogout();

  return (
    <PageShell
      title="Dashboard"
      description="You are viewing the protected dashboard placeholder."
      maxWidth="lg"
      contentVariant="card"
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? "Logging out..." : "Log out"}
      </Button>
    </PageShell>
  );
}
