import type { VariantProps } from "class-variance-authority";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppLinkAppearance = "text" | "button";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type AppLinkProps = RouterLinkProps & {
  appearance?: AppLinkAppearance;
  buttonVariant?: ButtonVariantProps["variant"];
  buttonSize?: ButtonVariantProps["size"];
};

export function AppLink({
  appearance = "text",
  buttonVariant = "link",
  buttonSize = "default",
  className,
  ...props
}: AppLinkProps) {
  const linkClassName =
    appearance === "button"
      ? cn(
          buttonVariants({
            variant: buttonVariant,
            size: buttonSize,
          }),
          className,
        )
      : cn(
          "rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        );

  return <RouterLink className={linkClassName} {...props} />;
}
