import { Stack } from "@/components/layout/Stack";
import { Input } from "@/components/ui/input";

type FormTextFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
};

export function FormTextField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  error,
}: FormTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <Stack gap="sm">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className="h-11"
      />

      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Stack>
  );
}
