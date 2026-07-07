import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getSession } from "../api/sessionApi";
import { useSession } from "../hooks/useSession";

vi.mock("../api/sessionApi", () => ({
  getSession: vi.fn(),
}));

const getSessionMock = vi.mocked(getSession);

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function renderUseSession() {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return renderHook(() => useSession(), { wrapper: Wrapper });
}

describe("useSession", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns checking while the session request is pending", () => {
    getSessionMock.mockReturnValue(new Promise(() => {}));

    const { result } = renderUseSession();

    expect(result.current).toEqual({
      status: "checking",
    });
  });

  it("returns authenticated when the user has a valid session", async () => {
    getSessionMock.mockResolvedValue({
      status: "authenticated",
      user: {
        id: "user-1",
        email: "user@example.com",
      },
    });

    const { result } = renderUseSession();

    await waitFor(() => {
      expect(result.current).toEqual({
        status: "authenticated",
        user: {
          id: "user-1",
          email: "user@example.com",
        },
      });
    });
  });

  it("returns unauthenticated when there is no active session", async () => {
    getSessionMock.mockResolvedValue({
      status: "unauthenticated",
    });

    const { result } = renderUseSession();

    await waitFor(() => {
      expect(result.current).toEqual({
        status: "unauthenticated",
      });
    });
  });

  it("returns expired when the session has expired", async () => {
    getSessionMock.mockResolvedValue({
      status: "expired",
    });

    const { result } = renderUseSession();

    await waitFor(() => {
      expect(result.current).toEqual({
        status: "expired",
      });
    });
  });

  it("returns unauthenticated when the session request fails unexpectedly", async () => {
    getSessionMock.mockRejectedValue(new Error("Unexpected session error"));

    const { result } = renderUseSession();

    await waitFor(() => {
      expect(result.current).toEqual({
        status: "unauthenticated",
      });
    });
  });
});
