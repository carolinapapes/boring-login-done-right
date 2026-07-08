import { delay, http, HttpResponse } from "msw";

type MockSessionStatus = "authenticated" | "unauthenticated" | "expired";

const MOCK_SESSION_STATUS_KEY = "boring-login:mock-session-status";

function isMockSessionStatus(value: unknown): value is MockSessionStatus {
  return (
    value === "authenticated" ||
    value === "unauthenticated" ||
    value === "expired"
  );
}

function readMockSessionStatus(): MockSessionStatus {
  if (typeof sessionStorage === "undefined") {
    return "unauthenticated";
  }

  const storedStatus = sessionStorage.getItem(MOCK_SESSION_STATUS_KEY);

  return isMockSessionStatus(storedStatus) ? storedStatus : "unauthenticated";
}

let mockSessionStatus: MockSessionStatus = readMockSessionStatus();

export function setMockSessionStatus(status: MockSessionStatus) {
  mockSessionStatus = status;

  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(MOCK_SESSION_STATUS_KEY, status);
  }
}

export function resetMockSessionStatus() {
  mockSessionStatus = "unauthenticated";

  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(MOCK_SESSION_STATUS_KEY, "unauthenticated");
  }
}

export const mockSession = http.get("/api/session", () => {
  if (mockSessionStatus === "authenticated") {
    return HttpResponse.json({
      user: {
        id: "user-1",
        email: "user@example.com",
      },
    });
  }

  if (mockSessionStatus === "expired") {
    return HttpResponse.json(
      {
        code: "SESSION_EXPIRED",
      },
      {
        status: 419,
      },
    );
  }

  return HttpResponse.json(
    {
      code: "UNAUTHENTICATED",
    },
    {
      status: 401,
    },
  );
});

export const mockLogout = http.post("/api/logout", () => {
  setMockSessionStatus("unauthenticated");

  return new HttpResponse(null, {
    status: 204,
  });
});

export const mockAuthenticatedSession = http.get("/api/session", () => {
  return HttpResponse.json({
    user: {
      id: "user-1",
      email: "user@example.com",
    },
  });
});

export const mockUnauthenticatedSession = http.get("/api/session", () => {
  return HttpResponse.json(
    {
      code: "UNAUTHENTICATED",
    },
    {
      status: 401,
    },
  );
});

export const mockExpiredSession = http.get("/api/session", () => {
  return HttpResponse.json(
    {
      code: "SESSION_EXPIRED",
    },
    {
      status: 419,
    },
  );
});

export const mockSlowAuthenticatedSession = http.get(
  "/api/session",
  async () => {
    await delay(1000);

    return HttpResponse.json({
      user: {
        id: "slow-user",
        email: "slow@example.com",
      },
    });
  },
);

export const sessionHandlers = [mockSession, mockLogout];
