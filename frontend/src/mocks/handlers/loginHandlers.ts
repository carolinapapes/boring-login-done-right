import { delay, http, HttpResponse } from "msw";

import type { LoginCredentials } from "@/features/login/model/login.types";

export const loginHandlers = [
  http.post("/api/login", async ({ request }) => {
    const credentials = (await request.json()) as LoginCredentials;

    if (credentials.email === "success@example.com") {
      return HttpResponse.json({
        user: {
          id: "user-1",
          email: credentials.email,
        },
      });
    }

    if (credentials.email === "unverified@example.com") {
      return HttpResponse.json(
        { code: "ACCOUNT_NOT_VERIFIED" },
        { status: 403 },
      );
    }

    if (credentials.email === "limited@example.com") {
      return HttpResponse.json({ code: "RATE_LIMITED" }, { status: 429 });
    }

    if (credentials.email === "server@example.com") {
      return HttpResponse.json({ code: "SERVER_ERROR" }, { status: 500 });
    }

    if (credentials.email === "network@example.com") {
      return HttpResponse.error();
    }

    if (credentials.email === "slow@example.com") {
      await delay(2000);

      return HttpResponse.json({
        user: {
          id: "slow-user",
          email: credentials.email,
        },
      });
    }

    return HttpResponse.json({ code: "INVALID_CREDENTIALS" }, { status: 401 });
  }),
];
