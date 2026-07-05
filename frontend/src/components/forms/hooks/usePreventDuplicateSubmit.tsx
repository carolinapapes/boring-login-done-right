import { useRef } from "react";
import type { SubmitHandler } from "react-hook-form";

export function usePreventDuplicateSubmit<TValues>(
  onSubmit: SubmitHandler<TValues>,
): SubmitHandler<TValues> {
  const isSubmittingRef = useRef(false);

  return async (values, event) => {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    try {
      await Promise.resolve(onSubmit(values, event));
    } finally {
      isSubmittingRef.current = false;
    }
  };
}
