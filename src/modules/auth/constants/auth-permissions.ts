export const AUTH_PERMISSIONS = {
  ADMIN: "ADMIN",
} as const;

export type AuthPermissions =
  (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS];
