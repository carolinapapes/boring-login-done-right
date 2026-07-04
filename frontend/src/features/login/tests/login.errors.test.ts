import { describe, expect, it } from "vitest";

import { LoginError, getLoginErrorMessage } from "../model/login.errors";

describe("LoginError", () => {
  it("stores a safe login error code", () => {
    const error = new LoginError("INVALID_CREDENTIALS");

    expect(error.code).toBe("INVALID_CREDENTIALS");
    expect(error.message).toBe("INVALID_CREDENTIALS");
    expect(error.name).toBe("LoginError");
  });
});

describe("getLoginErrorMessage", () => {
  it("returns a generic message for invalid credentials", () => {
    expect(getLoginErrorMessage("INVALID_CREDENTIALS")).toBe(
      "Invalid email or password.",
    );
  });

  it("returns a message for rate limiting", () => {
    expect(getLoginErrorMessage("RATE_LIMITED")).toBe(
      "Too many attempts. Please try again later.",
    );
  });

  it("returns a message for network errors", () => {
    expect(getLoginErrorMessage("NETWORK_ERROR")).toBe(
      "Network error. Please check your connection.",
    );
  });
});
