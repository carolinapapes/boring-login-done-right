type FormErrorMessageProps = {
  id: string;
  message: string;
};

export function FormErrorMessage({ id, message }: FormErrorMessageProps) {
  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
