export const ROLES_PERMISSIONS = {
  CREATE: "roles_create",
  READ: "roles_read",
  UPDATE: "roles_update",
  DELETE: "roles_delete",
} as const;

export type RolePermission =
  (typeof ROLES_PERMISSIONS)[keyof typeof ROLES_PERMISSIONS];

export const ROLES_PERMISSIONS_VALUES = Object.values(ROLES_PERMISSIONS);
