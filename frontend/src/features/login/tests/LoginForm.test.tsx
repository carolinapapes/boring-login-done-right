import { render, screen, act, waitFor } from "@testing-library/react";
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

  it("keeps the field error on focus and clears it when the field becomes valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Log in" }));

    const emailInput = screen.getByLabelText("Email");

    expect(await screen.findByText("Email is required")).toBeInTheDocument();

    await user.click(emailInput);

    expect(screen.getByText("Email is required")).toBeInTheDocument();

    await user.type(emailInput, "user@example.com");

    await waitFor(() => {
      expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
    });
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
        rememberMe: false,
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
    await user.type(screen.getByLabelText(/^password$/i), "password");

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
    const password = screen.getByLabelText(/^password$/i);

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

      act(() => {
        vi.advanceTimersByTime(0);
      });

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
  it("toggles password visibility", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const toggleButton = screen.getByRole("button", {
      name: /show password/i,
    });

    await user.type(passwordInput, "password");

    expect(passwordInput).toHaveValue("password");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");

    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: /hide password/i }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /hide password/i }));

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(
      screen.getByRole("button", { name: /show password/i }),
    ).toHaveAttribute("aria-pressed", "false");
  });
  it("submits remember me as true when checked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.click(screen.getByRole("checkbox", { name: "Remember me" }));
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(onSubmit).toHaveBeenCalledWith(
      {
        email: "user@example.com",
        password: "password",
        rememberMe: true,
      },
      expect.anything(),
    );
  });
  it("uses mobile and autofill friendly email attributes", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText("Email");

    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("autocomplete", "email");
    expect(emailInput).toHaveAttribute("inputmode", "email");
    expect(emailInput).toHaveAttribute("spellcheck", "false");
    expect(emailInput).toHaveAttribute("autocapitalize", "none");
  });
  it("uses password-manager friendly password attributes", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const passwordInput = screen.getByLabelText("Password");

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("name", "password");
    expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
  });
  it("moves focus to the first invalid field after empty submit", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText("Email")).toHaveFocus();
    });
  });
  it("moves focus to the form error summary when an API error is shown", async () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        errorMessage="Invalid email or password."
      />,
    );

    const errorSummary = screen.getByRole("alert");

    expect(errorSummary).toHaveTextContent("Invalid email or password.");

    await waitFor(() => {
      expect(errorSummary).toHaveFocus();
    });
  });
  it("uses a logical keyboard tab order", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const passwordToggle = screen.getByRole("button", {
      name: "Show password",
    });
    const rememberMe = screen.getByRole("checkbox", {
      name: "Remember me",
    });
    const submitButton = screen.getByRole("button", {
      name: "Log in",
    });

    await user.tab();
    expect(emailInput).toHaveFocus();

    await user.tab();
    expect(passwordInput).toHaveFocus();

    await user.tab();
    expect(passwordToggle).toHaveFocus();

    await user.tab();
    expect(rememberMe).toHaveFocus();

    await user.tab();
    expect(submitButton).toHaveFocus();
  });
});
