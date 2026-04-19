export const ROLLING_MILLS_PERMISSIONS = {
  READ: "rolling_mills.read",
  CREATE: "rolling_mills.create",
  UPDATE: "rolling_mills.update",
  DELETE: "rolling_mills.delete",
} as const;

export type RollingMillsPermission =
  (typeof ROLLING_MILLS_PERMISSIONS)[keyof typeof ROLLING_MILLS_PERMISSIONS];

export const ROLLING_MILLS_PERMISSIONS_VALUES = Object.values(ROLLING_MILLS_PERMISSIONS);
