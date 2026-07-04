import {
  LoginError,
  isLoginErrorCode,
  type LoginErrorCode,
} from "../model/login.errors";

import type { LoginCredentials, LoginResponse } from "../model/login.types";

type LoginApiErrorResponse = {
  code?: unknown;
};

const LOGIN_STATUS_ERROR_CODES = new Map<number, LoginErrorCode>([
  [401, "INVALID_CREDENTIALS"],
  [403, "ACCOUNT_NOT_VERIFIED"],
  [429, "RATE_LIMITED"],
]);

function mapStatusToLoginErrorCode(status: number): LoginErrorCode {
  return LOGIN_STATUS_ERROR_CODES.get(status) ?? "SERVER_ERROR";
}

async function parseLoginSuccess(response: Response): Promise<LoginResponse> {
  try {
    return (await response.json()) as LoginResponse;
  } catch {
    throw new LoginError("SERVER_ERROR");
  }
}

async function parseLoginError(response: Response): Promise<LoginError> {
  try {
    const data = (await response.json()) as LoginApiErrorResponse;

    if (isLoginErrorCode(data.code)) {
      return new LoginError(data.code);
    }
  } catch {
    // Malformed error responses fall back to status-based mapping.
  }

  return new LoginError(mapStatusToLoginErrorCode(response.status));
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  let response: Response;

  try {
    response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  } catch {
    throw new LoginError("NETWORK_ERROR");
  }

  if (!response.ok) {
    throw await parseLoginError(response);
  }

  return parseLoginSuccess(response);
}
