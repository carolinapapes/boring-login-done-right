export function SessionSkeleton() {
  return (
    <main className="min-h-screen px-4 py-10">
      <section
        role="status"
        aria-live="polite"
        className="mx-auto flex w-full max-w-3xl flex-col gap-4"
      >
        <p className="text-sm text-muted-foreground">Checking session...</p>

        <div className="space-y-3" aria-hidden="true">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
        </div>
      </section>
    </main>
  );
}
