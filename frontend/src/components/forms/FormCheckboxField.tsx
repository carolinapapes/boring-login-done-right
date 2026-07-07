import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FormCheckboxFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  id: string;
  label: string;
  disabled?: boolean;
};

export function FormCheckboxField<TFormValues extends FieldValues>({
  control,
  name,
  id,
  label,
  disabled,
}: FormCheckboxFieldProps<TFormValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            id={id}
            checked={field.value}
            disabled={disabled}
            onCheckedChange={(checked) => field.onChange(checked === true)}
          />

          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
    />
  );
}
