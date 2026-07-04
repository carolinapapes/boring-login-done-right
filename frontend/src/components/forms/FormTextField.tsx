import { Stack } from "@/components/layout/Stack";
import { Input } from "@/components/ui/input";

type FormTextFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  placeholder?: string;
  register?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  onFocus?: () => void;
};

export function FormTextField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  register,
  error,
  onFocus,
}: FormTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <Stack gap="sm">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <Input
        {...register}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className="h-11"
        onFocus={onFocus}
      />

      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Stack>
  );
}
