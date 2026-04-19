export const AUTH_PERMISSIONS = {
  ADMIN: "ADMIN",
} as const;

export type AuthPermission =
  (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS];
