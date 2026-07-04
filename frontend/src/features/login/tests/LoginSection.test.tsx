import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { delay, http, HttpResponse } from "msw";

import { server } from "@/mocks/server";
import { LoginSection } from "../components/LoginSection";

function renderWithQueryClient(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe("LoginSection", () => {
  it("shows a pending state while login is submitting", async () => {
    server.use(
      http.post("/api/login", async () => {
        await delay(10);

        return HttpResponse.json({
          user: {
            id: "slow-user",
            email: "slow@example.com",
          },
        });
      }),
    );

    const user = userEvent.setup();

    renderWithQueryClient(<LoginSection />);

    await user.type(screen.getByLabelText("Email"), "slow@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    const button = await screen.findByRole("button", {
      name: "Logging in...",
    });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("shows an account not verified message", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<LoginSection />);

    await user.type(screen.getByLabelText("Email"), "unverified@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Please verify your account before logging in.",
    );
  });

  it("shows a rate limited message", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<LoginSection />);

    await user.type(screen.getByLabelText("Email"), "limited@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Too many attempts. Please try again later.",
    );
  });

  it("shows a server error message", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<LoginSection />);

    await user.type(screen.getByLabelText("Email"), "server@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Something went wrong. Please try again.",
    );
  });

  it("shows a network error message", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<LoginSection />);

    await user.type(screen.getByLabelText("Email"), "network@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Network error. Please check your connection.",
    );
  });
});
