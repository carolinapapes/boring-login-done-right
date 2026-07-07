import { PageShell } from "@/components/layout/PageShell";

export function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      description="You are viewing the protected dashboard placeholder."
      maxWidth="lg"
    >
      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          Dashboard content will be added in the session flow.
        </p>
      </div>
    </PageShell>
  );
}
