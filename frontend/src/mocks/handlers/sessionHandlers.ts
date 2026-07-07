import { delay, http, HttpResponse } from "msw";

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

export const sessionHandlers = [mockAuthenticatedSession];
