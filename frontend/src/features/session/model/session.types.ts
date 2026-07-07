export type SessionUser = {
  id: string;
  email: string;
};

export type AuthenticatedSession = {
  status: "authenticated";
  user: SessionUser;
};

export type UnauthenticatedSession = {
  status: "unauthenticated";
};

export type ExpiredSession = {
  status: "expired";
};

export type SessionState =
  AuthenticatedSession | UnauthenticatedSession | ExpiredSession;
