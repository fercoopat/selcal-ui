export const ISSUES_PERMISSIONS = {
  CREATE: "issues_create",
  READ: "issues_read",
  UPDATE: "issues_update",
  DELETE: "issues_delete",
} as const;

export const ISSUES_PERMISSIONS_VALUES = Object.values(ISSUES_PERMISSIONS);

export type IssuePermission =
  (typeof ISSUES_PERMISSIONS)[keyof typeof ISSUES_PERMISSIONS];
