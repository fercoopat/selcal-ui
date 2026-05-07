export const ROLLING_MILLS_PERMISSIONS = {
  READ: "rollingMills.read",
  CREATE: "rollingMills.create",
  UPDATE: "rollingMills.update",
  DELETE: "rollingMills.delete",
} as const;

export type RollingMillsPermission =
  (typeof ROLLING_MILLS_PERMISSIONS)[keyof typeof ROLLING_MILLS_PERMISSIONS];

export const ROLLING_MILLS_PERMISSIONS_VALUES = Object.values(
  ROLLING_MILLS_PERMISSIONS,
);
