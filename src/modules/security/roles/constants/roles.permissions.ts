export const ROLES_PERMISSIONS = {
  READ: "roles.read",
  CREATE: "roles.create",
  UPDATE: "roles.update",
  DELETE: "roles.delete",
} as const;

export type RolePermission =
  (typeof ROLES_PERMISSIONS)[keyof typeof ROLES_PERMISSIONS];

export const ROLES_PERMISSIONS_VALUES = Object.values(ROLES_PERMISSIONS);
