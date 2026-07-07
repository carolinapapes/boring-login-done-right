import { useQuery } from "@tanstack/react-query";

import { getSession } from "../api/sessionApi";
import type { SessionViewState } from "../model/session.types";

export const sessionQueryKey = ["session"] as const;

export function useSession(): SessionViewState {
  const { data, isPending, isError } = useQuery({
    queryKey: sessionQueryKey,
    queryFn: getSession,
    retry: false,
  });

  if (isPending) {
    return { status: "checking" };
  }

  if (isError) {
    return { status: "unauthenticated" };
  }

  return data ?? { status: "unauthenticated" };
}
