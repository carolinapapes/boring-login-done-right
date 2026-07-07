import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginFormValues } from "../model/login.schema";

export function useLoginForm() {
  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return {
    clearErrors,
    control,
    errors,
    handleSubmit,
    register,
  };
}
