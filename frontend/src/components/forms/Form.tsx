import type { FormHTMLAttributes, ReactNode } from "react";

import { Stack } from "@/components/layout/Stack";

type FormProps = {
  children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export function Form({ children, ...props }: FormProps) {
  return (
    <Stack as="form" gap="sm" noValidate {...props}>
      {children}
    </Stack>
  );
}
