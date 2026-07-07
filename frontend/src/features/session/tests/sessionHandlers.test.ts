import { describe, expect, it } from "vitest";

import { server } from "@/mocks/server";
import {
  mockExpiredSession,
  mockSlowAuthenticatedSession,
  mockUnauthenticatedSession,
} from "@/mocks/handlers/sessionHandlers";

import { getSession } from "../api/sessionApi";

describe("session MSW handlers", () => {
  it("mocks an authenticated session by default", async () => {
    await expect(getSession()).resolves.toEqual({
      status: "authenticated",
      user: {
        id: "user-1",
        email: "user@example.com",
      },
    });
  });

  it("mocks an unauthenticated session", async () => {
    server.use(mockUnauthenticatedSession);

    await expect(getSession()).resolves.toEqual({
      status: "unauthenticated",
    });
  });

  it("mocks an expired session", async () => {
    server.use(mockExpiredSession);

    await expect(getSession()).resolves.toEqual({
      status: "expired",
    });
  });

  it("mocks slow session checking", async () => {
    server.use(mockSlowAuthenticatedSession);

    await expect(getSession()).resolves.toEqual({
      status: "authenticated",
      user: {
        id: "slow-user",
        email: "slow@example.com",
      },
    });
  });
});
