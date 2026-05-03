export const MATERIALS_PERMISSIONS = {
  READ: "materials.read",
  CREATE: "materials.create",
  UPDATE: "materials.update",
  DELETE: "materials.delete",
} as const;

export type MaterialsPermission =
  (typeof MATERIALS_PERMISSIONS)[keyof typeof MATERIALS_PERMISSIONS];

export const MATERIALS_PERMISSIONS_VALUES = Object.values(
  MATERIALS_PERMISSIONS,
);
