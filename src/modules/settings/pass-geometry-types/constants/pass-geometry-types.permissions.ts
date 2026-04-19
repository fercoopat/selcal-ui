export const PASS_GEOMETRY_TYPES_PERMISSIONS = {
  READ: "pass_geometry_types.read",
  CREATE: "pass_geometry_types.create",
  UPDATE: "pass_geometry_types.update",
  DELETE: "pass_geometry_types.delete",
} as const;

export type PassGeometryTypesPermission =
  (typeof PASS_GEOMETRY_TYPES_PERMISSIONS)[keyof typeof PASS_GEOMETRY_TYPES_PERMISSIONS];

export const PASS_GEOMETRY_TYPES_PERMISSIONS_VALUES = Object.values(PASS_GEOMETRY_TYPES_PERMISSIONS);
