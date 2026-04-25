export const MATERIAL_GRADES_PERMISSIONS = {
  READ: "material_grades.read",
  CREATE: "material_grades.create",
  UPDATE: "material_grades.update",
  DELETE: "material_grades.delete",
} as const;

export type MaterialGradesPermission =
  (typeof MATERIAL_GRADES_PERMISSIONS)[keyof typeof MATERIAL_GRADES_PERMISSIONS];

export const MATERIAL_GRADES_PERMISSIONS_VALUES = Object.values(MATERIAL_GRADES_PERMISSIONS);
