import { Stack } from "@/components/layout/Stack";
import { Input } from "@/components/ui/input";

type FormTextFieldEndButtonProps = {
  label: string;
  text: string;
  pressed?: boolean;
  onClick: () => void;
};

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
  endButton?: FormTextFieldEndButtonProps;
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
  endButton,
}: FormTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <Stack gap="sm">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <Input
          {...register}
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={endButton ? "h-11 pr-16" : "h-11"}
          onFocus={onFocus}
        />
        {endButton && (
          <button
            type="button"
            aria-label={endButton.label}
            aria-pressed={endButton.pressed}
            onClick={endButton.onClick}
            className="absolute inset-y-0 right-3 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {endButton.text}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Stack>
  );
}
