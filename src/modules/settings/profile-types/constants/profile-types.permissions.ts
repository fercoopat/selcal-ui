export const PROFILE_TYPES_PERMISSIONS = {
  READ: "profile_types.read",
  CREATE: "profile_types.create",
  UPDATE: "profile_types.update",
  DELETE: "profile_types.delete",
} as const;

export type ProfileTypesPermission =
  (typeof PROFILE_TYPES_PERMISSIONS)[keyof typeof PROFILE_TYPES_PERMISSIONS];

export const PROFILE_TYPES_PERMISSIONS_VALUES = Object.values(PROFILE_TYPES_PERMISSIONS);
