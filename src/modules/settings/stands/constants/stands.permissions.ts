export const STANDS_PERMISSIONS = {
  READ: "stands.read",
  CREATE: "stands.create",
  UPDATE: "stands.update",
  DELETE: "stands.delete",
} as const;

export type StandsPermission =
  (typeof STANDS_PERMISSIONS)[keyof typeof STANDS_PERMISSIONS];

export const STANDS_PERMISSIONS_VALUES = Object.values(STANDS_PERMISSIONS);
