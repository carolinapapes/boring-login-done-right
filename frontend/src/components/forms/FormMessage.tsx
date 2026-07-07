type FormMessageVariant = "error" | "status";

type FormMessageProps = {
  id?: string;
  message?: string;
  variant?: FormMessageVariant;
  reserveSpace?: boolean;
};

const messageStyles: Record<FormMessageVariant, string> = {
  error: "text-destructive",
  status: "text-muted-foreground",
};

export function FormMessage({
  id,
  message,
  variant = "error",
  reserveSpace = false,
}: FormMessageProps) {
  const isError = variant === "error";

  const content = message ? (
    <p
      id={id}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={`text-xs ${messageStyles[variant]}`}
    >
      {message}
    </p>
  ) : null;

  if (reserveSpace) {
    return <div className="min-h-4">{content}</div>;
  }

  return content;
}
