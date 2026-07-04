import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginFormValues } from "../model/login.schema";

export function useLoginForm() {
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  return {
    clearErrors,
    errors,
    handleSubmit,
    register,
  };
}
