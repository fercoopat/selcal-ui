export const ENGINES_PERMISSIONS = {
  READ: "engines.read",
  CREATE: "engines.create",
  UPDATE: "engines.update",
  DELETE: "engines.delete",
} as const;

export type EnginePermission =
  (typeof ENGINES_PERMISSIONS)[keyof typeof ENGINES_PERMISSIONS];

export const ENGINES_PERMISSIONS_VALUES = Object.values(ENGINES_PERMISSIONS);