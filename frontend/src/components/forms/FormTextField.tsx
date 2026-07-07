import { Stack } from "@/components/layout/Stack";
import { Input } from "@/components/ui/input";
import { FormMessage } from "./FormMessage";
import { Label } from "@/components/ui/label";

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

function OptionalButton({
  label,
  pressed,
  onClick,
  text,
}: FormTextFieldEndButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {text}
    </button>
  );
}

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
      <Label htmlFor={id}>{label}</Label>
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
        {endButton && <OptionalButton {...endButton} />}
      </div>
      {error && <FormMessage id={errorId} message={error} />}
    </Stack>
  );
}
