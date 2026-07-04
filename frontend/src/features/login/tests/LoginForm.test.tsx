import { render, screen } from "@testing-library/react";
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
});
