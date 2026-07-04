import { Button } from "@/components/ui/button";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  isSubmitting?: boolean;
  submittingText?: string;
};

export function FormSubmitButton({
  children,
  isSubmitting = false,
  submittingText = "Submitting...",
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className="h-11 w-full text-base"
    >
      {isSubmitting ? submittingText : children}
    </Button>
  );
}
