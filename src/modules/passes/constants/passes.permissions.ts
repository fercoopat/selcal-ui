export const PASSES_PERMISSIONS = {
  READ: "passes.read",
  CREATE: "passes.create",
  UPDATE: "passes.update",
  DELETE: "passes.delete",
} as const;

export type PassesPermission =
  (typeof PASSES_PERMISSIONS)[keyof typeof PASSES_PERMISSIONS];

export const PASSES_PERMISSIONS_VALUES = Object.values(PASSES_PERMISSIONS);
