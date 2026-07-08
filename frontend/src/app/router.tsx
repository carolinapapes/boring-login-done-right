import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

import { ProtectedRoute } from "@/features/session/components/ProtectedRoute";
import { PublicOnlyRoute } from "@/features/session/components/PublicOnlyRoute";
import { DashboardPage } from "@/pages/DashboardPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { LoginPage } from "@/pages/LoginPage";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
];

export const router = createBrowserRouter(appRoutes);
