import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { FormCheckboxField } from "./FormCheckboxField";

type TestFormValues = {
  rememberMe: boolean;
};

function TestForm({
  onSubmit,
}: {
  onSubmit: (values: TestFormValues) => void;
}) {
  const { control, handleSubmit } = useForm<TestFormValues>({
    defaultValues: {
      rememberMe: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormCheckboxField
        control={control}
        name="rememberMe"
        id="remember-me"
        label="Remember me"
      />

      <button type="submit">Submit</button>
    </form>
  );
}

describe("FormCheckboxField", () => {
  it("renders an accessible checkbox with its label", () => {
    render(<TestForm onSubmit={vi.fn()} />);

    expect(
      screen.getByRole("checkbox", { name: "Remember me" }),
    ).toBeInTheDocument();
  });

  it("uses the default unchecked value", () => {
    render(<TestForm onSubmit={vi.fn()} />);

    expect(
      screen.getByRole("checkbox", { name: "Remember me" }),
    ).not.toBeChecked();
  });

  it("submits true when checked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<TestForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("checkbox", { name: "Remember me" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      {
        rememberMe: true,
      },
      expect.anything(),
    );
  });
  it("submits false when left unchecked", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalledWith(
      {
        rememberMe: false,
      },
      expect.anything(),
    );
  });
});
