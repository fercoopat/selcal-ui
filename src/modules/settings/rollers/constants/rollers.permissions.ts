export const ROLLERS_PERMISSIONS = {
  READ: "rollers.read",
  CREATE: "rollers.create",
  UPDATE: "rollers.update",
  DELETE: "rollers.delete",
} as const;

export type RollerPermission =
  (typeof ROLLERS_PERMISSIONS)[keyof typeof ROLLERS_PERMISSIONS];

export const ROLLERS_PERMISSIONS_VALUES = Object.values(ROLLERS_PERMISSIONS);