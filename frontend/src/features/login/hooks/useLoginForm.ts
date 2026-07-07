import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginFormValues } from "../model/login.schema";

export function useLoginForm() {
  const {
    trigger,
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    shouldFocusError: true,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return {
    trigger,
    control,
    errors,
    handleSubmit,
    register,
  };
}
