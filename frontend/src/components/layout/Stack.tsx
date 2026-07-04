import type { ElementType, ReactNode } from "react";

type StackProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  gap?: "sm" | "md" | "lg";
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const gapClassName = {
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-6",
};

export function Stack<T extends ElementType = "div">({
  as,
  children,
  gap = "md",
  className = "",
  ...props
}: StackProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={`${gapClassName[gap]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
