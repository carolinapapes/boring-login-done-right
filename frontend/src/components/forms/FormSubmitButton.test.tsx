import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormSubmitButton } from "./FormSubmitButton";

describe("FormSubmitButton", () => {
  it("renders a submit button", () => {
    render(<FormSubmitButton>Log in</FormSubmitButton>);

    expect(screen.getByRole("button", { name: "Log in" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("disables the button while submitting", () => {
    render(
      <FormSubmitButton isSubmitting submittingText="Logging in...">
        Log in
      </FormSubmitButton>,
    );

    const button = screen.getByRole("button", { name: "Logging in..." });

    expect(button).toBeDisabled();
  });
});
