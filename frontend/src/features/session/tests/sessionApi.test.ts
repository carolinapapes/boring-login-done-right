import { afterEach, describe, expect, it, vi } from "vitest";

import { getSession } from "../api/sessionApi";

describe("getSession", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an authenticated session when the API returns a valid user", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            user: {
              id: "user-1",
              email: "user@example.com",
            },
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      ),
    );

    await expect(getSession()).resolves.toEqual({
      status: "authenticated",
      user: {
        id: "user-1",
        email: "user@example.com",
      },
    });
  });

  it("returns unauthenticated when the API returns 401", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 401 })),
    );

    await expect(getSession()).resolves.toEqual({
      status: "unauthenticated",
    });
  });

  it("returns expired when the API returns 419", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 419 })),
    );

    await expect(getSession()).resolves.toEqual({
      status: "expired",
    });
  });

  it("returns unauthenticated when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    await expect(getSession()).resolves.toEqual({
      status: "unauthenticated",
    });
  });

  it("returns unauthenticated when the success response is malformed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ user: null }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ),
    );

    await expect(getSession()).resolves.toEqual({
      status: "unauthenticated",
    });
  });

  it("uses credentials include for cookie-based sessions", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          user: {
            id: "user-1",
            email: "user@example.com",
          },
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    await getSession();

    expect(fetchMock).toHaveBeenCalledWith("/api/session", {
      method: "GET",
      credentials: "include",
    });
  });
});
