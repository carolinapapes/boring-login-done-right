import type { SessionState, SessionUser } from "../model/session.types";

type SessionApiResponse = {
  user?: {
    id?: unknown;
    email?: unknown;
  };
};

function isSessionUser(user: unknown): user is SessionUser {
  if (!user || typeof user !== "object") {
    return false;
  }

  const candidate = user as Record<string, unknown>;

  return (
    typeof candidate.id === "string" && typeof candidate.email === "string"
  );
}

async function parseAuthenticatedSession(
  response: Response,
): Promise<SessionState> {
  try {
    const data = (await response.json()) as SessionApiResponse;

    if (isSessionUser(data.user)) {
      return {
        status: "authenticated",
        user: data.user,
      };
    }
  } catch {
    // Malformed responses are mapped to a safe unauthenticated state.
  }

  return { status: "unauthenticated" };
}

function mapSessionStatus(status: number): SessionState {
  if (status === 401) {
    return { status: "unauthenticated" };
  }

  if (status === 419) {
    return { status: "expired" };
  }

  return { status: "unauthenticated" };
}

export async function getSession(): Promise<SessionState> {
  let response: Response;

  try {
    response = await fetch("/api/session", {
      method: "GET",
      credentials: "include",
    });
  } catch {
    return { status: "unauthenticated" };
  }

  if (!response.ok) {
    return mapSessionStatus(response.status);
  }

  return parseAuthenticatedSession(response);
}
