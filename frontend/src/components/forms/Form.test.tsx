import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Form } from "./Form";

describe("Form", () => {
  it("renders a form with children and disables native validation", () => {
    render(
      <Form aria-label="Login form">
        <button type="submit">Submit</button>
      </Form>,
    );

    const form = screen.getByRole("form", { name: "Login form" });

    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("novalidate");
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
});
