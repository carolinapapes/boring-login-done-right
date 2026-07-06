import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LoginForm } from "../components/LoginForm";

describe("LoginForm", () => {
  it("renders email, password, and submit button", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("shows validation errors on blur", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByLabelText("Email"));
    await user.tab();

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("clears the field error on focus and validates again on blur", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText("Email");

    await user.click(emailInput);
    await user.tab();

    expect(await screen.findByText("Email is required")).toBeInTheDocument();

    await user.click(emailInput);

    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();

    await user.tab();

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("shows an invalid email error on blur", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText("Email");

    await user.type(emailInput, "wrong-email");
    await user.tab();

    expect(
      await screen.findByText("Enter a valid email address"),
    ).toBeInTheDocument();
  });

  it("calls onSubmit with valid values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(onSubmit).toHaveBeenCalledWith(
      {
        email: "user@example.com",
        password: "password",
      },
      expect.anything(),
    );
  });
  it("shows the submitting state", () => {
    render(<LoginForm onSubmit={vi.fn()} isSubmitting />);

    const button = screen.getByRole("button", { name: "Logging in..." });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("shows a login error message", () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        errorMessage="Invalid email or password."
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid email or password.",
    );
  });
  it("submits the form only once when the submit button is clicked rapidly", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    await user.type(screen.getByLabelText(/password/i), "password");

    const submitButton = screen.getByRole("button", { name: /log in/i });

    await Promise.all([user.click(submitButton), user.click(submitButton)]);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
  it("submits only once when Enter is pressed repeatedly", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "user@example.com");
    const password = screen.getByLabelText(/password/i);

    await user.type(password, "password");

    await Promise.all([
      user.keyboard("{Enter}"),
      user.keyboard("{Enter}"),
      user.keyboard("{Enter}"),
    ]);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
  it("shows and hides slow network feedback based on the submitting state", () => {
    vi.useFakeTimers();

    try {
      const { rerender } = render(
        <LoginForm onSubmit={vi.fn()} isSubmitting />,
      );

      expect(
        screen.queryByText(/taking longer than usual/i),
      ).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(999);
      });

      expect(
        screen.queryByText(/taking longer than usual/i),
      ).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1);
      });

      expect(screen.getByText(/taking longer than usual/i)).toBeInTheDocument();

      rerender(<LoginForm onSubmit={vi.fn()} isSubmitting={false} />);

      expect(
        screen.queryByText(/taking longer than usual/i),
      ).not.toBeInTheDocument();

      rerender(<LoginForm onSubmit={vi.fn()} isSubmitting />);
      expect(
        screen.queryByText(/taking longer than usual/i),
      ).not.toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByText(/taking longer than usual/i)).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
