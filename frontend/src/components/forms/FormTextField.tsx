import { Stack } from "@/components/layout/Stack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "./FormMessage";

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
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  spellCheck?: boolean;
  autoCapitalize?: string;
  placeholder?: string;
  register?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
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
  inputMode,
  spellCheck,
  autoCapitalize,
  placeholder,
  register,
  error,
  endButton,
}: FormTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <Stack gap="sm">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          spellCheck={spellCheck}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...register}
        />
        {endButton && <OptionalButton {...endButton} />}
      </div>
      <FormMessage id={errorId} message={error} reserveSpace />
    </Stack>
  );
}
