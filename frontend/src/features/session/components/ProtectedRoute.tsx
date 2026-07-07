import { Navigate, Outlet, useLocation } from "react-router";

import { useSession } from "../hooks/useSession";
import { SessionSkeleton } from "./SessionSkeleton";

export function ProtectedRoute() {
  const session = useSession();
  const location = useLocation();

  if (session.status === "checking") {
    return <SessionSkeleton />;
  }

  if (session.status === "authenticated") {
    return <Outlet />;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
}
