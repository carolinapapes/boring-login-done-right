import { Navigate, Outlet } from "react-router";

import { useSession } from "../hooks/useSession";
import { SessionSkeleton } from "./SessionSkeleton";

export function PublicOnlyRoute() {
  const session = useSession();

  if (session.status === "checking") {
    return <SessionSkeleton />;
  }

  if (session.status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
