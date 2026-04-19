export const FILES_PERMISSIONS = {
  READ: "files.read",
  CREATE: "files.create",
  UPDATE: "files.update",
  DELETE: "files.delete",
} as const;

export type FilesPermission =
  (typeof FILES_PERMISSIONS)[keyof typeof FILES_PERMISSIONS];

export const FILES_PERMISSIONS_VALUES = Object.values(FILES_PERMISSIONS);
