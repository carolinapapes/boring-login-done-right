import { describe, expect, it } from "vitest";
import { loginSchema } from "../model/login.schema";

describe("loginSchema", () => {
  it("accepts valid login values", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "password",
      rememberMe: false,
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "wrong-email",
      password: "password",
      rememberMe: false,
    });

    expect(result.success).toBe(false);
  });

  it("requires an email", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "password",
      rememberMe: false,
    });

    expect(result.success).toBe(false);
  });

  it("requires a password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
      rememberMe: false,
    });

    expect(result.success).toBe(false);
  });
});
