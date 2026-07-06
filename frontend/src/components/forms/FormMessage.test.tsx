import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { FormMessage } from "./FormMessage";

describe("FormMessage", () => {
  it("renders an error message as an assertive alert by default", () => {
    render(<FormMessage id="login-error" message="Invalid credentials" />);

    const message = screen.getByRole("alert");

    expect(message).toHaveTextContent("Invalid credentials");
    expect(message).toHaveAttribute("id", "login-error");
    expect(message).toHaveAttribute("aria-live", "assertive");
  });

  it("renders a status message as polite feedback", () => {
    render(
      <FormMessage
        message="This is taking longer than usual."
        variant="status"
      />,
    );

    const message = screen.getByRole("status");

    expect(message).toHaveTextContent("This is taking longer than usual.");
    expect(message).toHaveAttribute("aria-live", "polite");
  });
});
