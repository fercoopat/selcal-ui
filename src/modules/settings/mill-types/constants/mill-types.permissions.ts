export const MILL_TYPES_PERMISSIONS = {
  READ: "millTypes.read",
  CREATE: "millTypes.create",
  UPDATE: "millTypes.update",
  DELETE: "millTypes.delete",
} as const;

export type MillTypesPermission =
  (typeof MILL_TYPES_PERMISSIONS)[keyof typeof MILL_TYPES_PERMISSIONS];

export const MILL_TYPES_PERMISSIONS_VALUES = Object.values(
  MILL_TYPES_PERMISSIONS,
);
