import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { sessionQueryKey } from "@/features/session/hooks/useSession";
import type { SessionState } from "@/features/session/model/session.types";

import { useLogin } from "./useLogin";
import { getLoginErrorMessageFromError } from "../model/login.errors";
import type { LoginFormValues } from "../model/login.schema";

function createAuthenticatedSession(response: {
  user: {
    id: string;
    email: string;
  };
}): SessionState {
  return {
    status: "authenticated",
    user: {
      id: response.user.id,
      email: response.user.email,
    },
  };
}

export function useLoginFlow() {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function submitLogin(values: LoginFormValues) {
    loginMutation.mutate(values, {
      onSuccess: (response) => {
        queryClient.setQueryData<SessionState>(
          sessionQueryKey,
          createAuthenticatedSession(response),
        );

        navigate("/dashboard", { replace: true });
      },
    });
  }

  const errorMessage = loginMutation.isError
    ? getLoginErrorMessageFromError(loginMutation.error)
    : undefined;

  return {
    submitLogin,
    isSubmitting: loginMutation.isPending,
    errorMessage,
  };
}
