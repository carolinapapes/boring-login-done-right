import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, describe, expect, it } from "vitest";

import { server } from "@/mocks/server";
import {
  mockExpiredSession,
  mockSlowAuthenticatedSession,
  mockUnauthenticatedSession,
  resetMockSessionStatus,
  setMockSessionStatus,
} from "@/mocks/handlers/sessionHandlers";

import { appRoutes } from "./router";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function renderRouter(initialEntry: string) {
  const queryClient = createTestQueryClient();

  const router = createMemoryRouter(appRoutes, {
    initialEntries: [initialEntry],
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return render(<RouterProvider router={router} />, {
    wrapper: Wrapper,
  });
}

describe("routing and session flow", () => {
  afterEach(() => {
    server.resetHandlers();
    resetMockSessionStatus();
  });

  it("redirects to dashboard after successful login", async () => {
    const user = userEvent.setup();

    renderRouter("/login");

    await user.type(
      await screen.findByLabelText("Email"),
      "success@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(
      await screen.findByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("keeps failed login attempts on login", async () => {
    const user = userEvent.setup();

    renderRouter("/login");

    await user.type(await screen.findByLabelText("Email"), "wrong@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid email or password.",
    );

    expect(screen.getByRole("heading", { name: "Log in" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Dashboard" }),
    ).not.toBeInTheDocument();
  });

  it("redirects unauthenticated dashboard access to login", async () => {
    server.use(mockUnauthenticatedSession);

    renderRouter("/dashboard");

    expect(
      await screen.findByRole("heading", { name: "Log in" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Dashboard" }),
    ).not.toBeInTheDocument();
  });

  it("shows the session-checking skeleton while session is loading", async () => {
    server.use(mockSlowAuthenticatedSession);

    renderRouter("/dashboard");

    expect(screen.getByRole("status")).toHaveTextContent("Checking session...");

    await waitForElementToBeRemoved(() => screen.queryByRole("status"), {
      timeout: 3000,
    });

    expect(
      await screen.findByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("redirects expired sessions to login", async () => {
    server.use(mockExpiredSession);

    renderRouter("/dashboard");

    expect(
      await screen.findByRole("heading", { name: "Log in" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Dashboard" }),
    ).not.toBeInTheDocument();
  });

  it("redirects authenticated users away from login", async () => {
    setMockSessionStatus("authenticated");

    renderRouter("/login");

    expect(
      await screen.findByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "Log in" }),
    ).not.toBeInTheDocument();
  });
});
