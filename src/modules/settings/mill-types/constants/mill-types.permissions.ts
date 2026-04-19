export const MILL_TYPES_PERMISSIONS = {
  READ: "mill_types.read",
  CREATE: "mill_types.create",
  UPDATE: "mill_types.update",
  DELETE: "mill_types.delete",
} as const;

export type MillTypesPermission =
  (typeof MILL_TYPES_PERMISSIONS)[keyof typeof MILL_TYPES_PERMISSIONS];

export const MILL_TYPES_PERMISSIONS_VALUES = Object.values(MILL_TYPES_PERMISSIONS);
