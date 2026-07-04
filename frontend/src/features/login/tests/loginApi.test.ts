import { describe, expect, it } from "vitest";

import { login } from "../api/loginApi";
import { LoginError } from "../model/login.errors";

describe("loginApi", () => {
  it("returns the user on successful login", async () => {
    await expect(
      login({
        email: "success@example.com",
        password: "password",
      }),
    ).resolves.toEqual({
      user: {
        id: "user-1",
        email: "success@example.com",
      },
    });
  });

  it("throws INVALID_CREDENTIALS for invalid login", async () => {
    try {
      await login({
        email: "wrong@example.com",
        password: "password",
      });

      throw new Error("Expected login to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(LoginError);
      expect((error as LoginError).code).toBe("INVALID_CREDENTIALS");
    }
  });

  it("throws ACCOUNT_NOT_VERIFIED for unverified accounts", async () => {
    try {
      await login({
        email: "unverified@example.com",
        password: "password",
      });

      throw new Error("Expected login to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(LoginError);
      expect((error as LoginError).code).toBe("ACCOUNT_NOT_VERIFIED");
    }
  });

  it("throws RATE_LIMITED for too many attempts", async () => {
    try {
      await login({
        email: "limited@example.com",
        password: "password",
      });

      throw new Error("Expected login to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(LoginError);
      expect((error as LoginError).code).toBe("RATE_LIMITED");
    }
  });

  it("throws SERVER_ERROR for server errors", async () => {
    try {
      await login({
        email: "server@example.com",
        password: "password",
      });

      throw new Error("Expected login to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(LoginError);
      expect((error as LoginError).code).toBe("SERVER_ERROR");
    }
  });

  it("throws NETWORK_ERROR for network failures", async () => {
    try {
      await login({
        email: "network@example.com",
        password: "password",
      });

      throw new Error("Expected login to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(LoginError);
      expect((error as LoginError).code).toBe("NETWORK_ERROR");
    }
  });
});
