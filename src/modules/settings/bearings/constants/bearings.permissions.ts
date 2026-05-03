export const BEARINGS_PERMISSIONS = {
  READ: "bearings.read",
  CREATE: "bearings.create",
  UPDATE: "bearings.update",
  DELETE: "bearings.delete",
} as const;

export type BearingPermission =
  (typeof BEARINGS_PERMISSIONS)[keyof typeof BEARINGS_PERMISSIONS];

export const BEARINGS_PERMISSIONS_VALUES = Object.values(BEARINGS_PERMISSIONS);
