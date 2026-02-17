export const PROJECTS_PERMISSIONS = {
  CREATE: "projects_create",
  READ: "projects_read",
  UPDATE: "projects_update",
  DELETE: "projects_delete",
} as const;

export type ProjectsPermission =
  (typeof PROJECTS_PERMISSIONS)[keyof typeof PROJECTS_PERMISSIONS];

export const PROJECTS_PERMISSIONS_VALUES = Object.values(PROJECTS_PERMISSIONS);
