import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormTextField } from "./FormTextField";

describe("FormTextField", () => {
  it("renders an input accessible by label", () => {
    render(
      <FormTextField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
      />,
    );

    const input = screen.getByLabelText("Email");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
  });

  it("renders an accessible error message", () => {
    render(
      <FormTextField
        id="email"
        name="email"
        label="Email"
        error="Email is required"
      />,
    );

    const input = screen.getByLabelText("Email");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("Email is required");
    expect(error).toHaveAttribute("id", "email-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Email is required");
  });
});
