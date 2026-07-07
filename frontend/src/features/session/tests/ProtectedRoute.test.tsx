import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";

import { useSession } from "../hooks/useSession";
import { ProtectedRoute } from "../components/ProtectedRoute";

vi.mock("../hooks/useSession", () => ({
  useSession: vi.fn(),
}));

const useSessionMock = vi.mocked(useSession);

function renderProtectedRoute(initialRoute = "/dashboard") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Route>

        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  it("shows a session skeleton while checking the session", () => {
    useSessionMock.mockReturnValue({
      status: "checking",
    });

    renderProtectedRoute();

    expect(screen.getByRole("status")).toHaveTextContent("Checking session...");
    expect(screen.queryByRole("heading", { name: "Dashboard" })).toBeNull();
  });

  it("allows authenticated users to access the dashboard", () => {
    useSessionMock.mockReturnValue({
      status: "authenticated",
      user: {
        id: "user-1",
        email: "user@example.com",
      },
    });

    renderProtectedRoute();

    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("redirects unauthenticated users to login", () => {
    useSessionMock.mockReturnValue({
      status: "unauthenticated",
    });

    renderProtectedRoute();

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Dashboard" })).toBeNull();
  });

  it("redirects expired sessions to login", () => {
    useSessionMock.mockReturnValue({
      status: "expired",
    });

    renderProtectedRoute();

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Dashboard" })).toBeNull();
  });
});
