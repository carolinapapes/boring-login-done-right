import { useEffect, useRef } from "react";

type FormErrorSummaryProps = {
  message?: string;
};

export function FormErrorSummary({ message }: FormErrorSummaryProps) {
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message) {
      errorRef.current?.focus();
    }
  }, [message]);

  return (
    <div className="min-h-12">
      {message ? (
        <div
          ref={errorRef}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="
        rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive
        outline-none
        focus:ring-1 focus:ring-ring focus:ring-offset-1
      "
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
