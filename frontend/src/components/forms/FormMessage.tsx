type FormMessageVariant = "error" | "status";

type FormMessageProps = {
  id?: string;
  message: string;
  variant?: FormMessageVariant;
};

const messageStyles: Record<FormMessageVariant, string> = {
  error: "text-destructive",
  status: "text-muted-foreground",
};

export function FormMessage({
  id,
  message,
  variant = "error",
}: FormMessageProps) {
  const isError = variant === "error";

  return (
    <p
      id={id}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={`text-sm ${messageStyles[variant]}`}
    >
      {message}
    </p>
  );
}
