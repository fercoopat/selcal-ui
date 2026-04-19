export const CALIBRATIONS_PERMISSIONS = {
  READ: "calibrations.read",
  CREATE: "calibrations.create",
  UPDATE: "calibrations.update",
  DELETE: "calibrations.delete",
} as const;

export type CalibrationsPermission =
  (typeof CALIBRATIONS_PERMISSIONS)[keyof typeof CALIBRATIONS_PERMISSIONS];

export const CALIBRATIONS_PERMISSIONS_VALUES = Object.values(CALIBRATIONS_PERMISSIONS);
