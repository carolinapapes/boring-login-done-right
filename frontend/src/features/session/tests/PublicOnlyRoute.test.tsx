import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";

import { PublicOnlyRoute } from "../components/PublicOnlyRoute";
import { useSession } from "../hooks/useSession";

vi.mock("../hooks/useSession", () => ({
  useSession: vi.fn(),
}));

const useSessionMock = vi.mocked(useSession);

function renderPublicOnlyRoute() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<h1>Login</h1>} />
        </Route>

        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("PublicOnlyRoute", () => {
  it("shows a session skeleton while checking the session", () => {
    useSessionMock.mockReturnValue({
      status: "checking",
    });

    renderPublicOnlyRoute();

    expect(screen.getByRole("status")).toHaveTextContent("Checking session...");
    expect(screen.queryByRole("heading", { name: "Login" })).toBeNull();
  });

  it("allows unauthenticated users to access login", () => {
    useSessionMock.mockReturnValue({
      status: "unauthenticated",
    });

    renderPublicOnlyRoute();

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("allows expired sessions to access login", () => {
    useSessionMock.mockReturnValue({
      status: "expired",
    });

    renderPublicOnlyRoute();

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  it("redirects authenticated users to dashboard", () => {
    useSessionMock.mockReturnValue({
      status: "authenticated",
      user: {
        id: "user-1",
        email: "user@example.com",
      },
    });

    renderPublicOnlyRoute();

    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Login" })).toBeNull();
  });
});
