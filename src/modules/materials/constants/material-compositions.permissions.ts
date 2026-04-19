export const MATERIAL_COMPOSITIONS_PERMISSIONS = {
  READ: "material_compositions.read",
  CREATE: "material_compositions.create",
  UPDATE: "material_compositions.update",
  DELETE: "material_compositions.delete",
} as const;

export type MaterialCompositionsPermission =
  (typeof MATERIAL_COMPOSITIONS_PERMISSIONS)[keyof typeof MATERIAL_COMPOSITIONS_PERMISSIONS];

export const MATERIAL_COMPOSITIONS_PERMISSIONS_VALUES = Object.values(MATERIAL_COMPOSITIONS_PERMISSIONS);
