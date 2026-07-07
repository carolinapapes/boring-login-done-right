import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg";
  contentVariant?: "plain" | "card";
};

const maxWidthClassName = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-3xl",
};

function PageHeader({
  title,
  description,
}: Pick<PageShellProps, "title" | "description">) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>

      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function PageShell({
  title,
  description,
  children,
  maxWidth = "md",
  contentVariant = "plain",
}: PageShellProps) {
  return (
    <main className="min-h-screen px-4 py-10">
      <section
        className={`mx-auto flex w-full ${maxWidthClassName[maxWidth]} flex-col gap-6`}
      >
        {contentVariant === "card" ? (
          <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
            <PageHeader title={title} description={description} />
            {children}
          </div>
        ) : (
          <>
            <PageHeader title={title} description={description} />
            {children}
          </>
        )}
      </section>
    </main>
  );
}
