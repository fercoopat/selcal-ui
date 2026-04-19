export const USERS_PERMISSIONS = {
  READ: "users.read",
  CREATE: "users.create",
  UPDATE: "users.update",
  DELETE: "users.delete",
} as const;

export type UsersPermission =
  (typeof USERS_PERMISSIONS)[keyof typeof USERS_PERMISSIONS];

export const USERS_PERMISSIONS_VALUES = Object.values(USERS_PERMISSIONS);
