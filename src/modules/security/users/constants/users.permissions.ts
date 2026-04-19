export const USERS_PERMISSIONS = {
  CREATE: "users_create",
  READ: "users_read",
  UPDATE: "users_update",
  DELETE: "users_delete",
} as const;

export type UsersPermission =
  (typeof USERS_PERMISSIONS)[keyof typeof USERS_PERMISSIONS];

export const USERS_PERMISSIONS_VALUES = Object.values(USERS_PERMISSIONS);
