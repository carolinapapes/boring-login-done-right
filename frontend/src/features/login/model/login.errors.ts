export const LOGIN_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  ACCOUNT_NOT_VERIFIED: "Please verify your account before logging in.",
  RATE_LIMITED: "Too many attempts. Please try again later.",
  SERVER_ERROR: "Something went wrong. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
} as const;

export type LoginErrorCode = keyof typeof LOGIN_ERROR_MESSAGES;

export class LoginError extends Error {
  readonly code: LoginErrorCode;

  constructor(code: LoginErrorCode) {
    super(code);
    this.name = "LoginError";
    this.code = code;
  }
}

export function isLoginErrorCode(code: unknown): code is LoginErrorCode {
  return (
    typeof code === "string" &&
    Object.prototype.hasOwnProperty.call(LOGIN_ERROR_MESSAGES, code)
  );
}

export function getLoginErrorMessage(code: LoginErrorCode): string {
  return LOGIN_ERROR_MESSAGES[code];
}

export function getLoginErrorMessageFromError(error: unknown): string {
  if (error instanceof LoginError) {
    return getLoginErrorMessage(error.code);
  }

  return LOGIN_ERROR_MESSAGES.SERVER_ERROR;
}
