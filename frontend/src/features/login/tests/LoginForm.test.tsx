import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoginForm } from "../components/LoginForm";

describe("LoginForm", () => {
  it("renders the login fields and submit button", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(
      screen.getByRole("button", {
        name: "Log in",
      }),
    ).toBeEnabled();
  });
});
