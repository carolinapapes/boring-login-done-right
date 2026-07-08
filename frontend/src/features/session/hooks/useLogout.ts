import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { logout } from "../api/logoutApi";
import { sessionQueryKey } from "./useSession";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.setQueryData(sessionQueryKey, {
        status: "unauthenticated",
      });

      navigate("/login", { replace: true });
    },
  });
}
