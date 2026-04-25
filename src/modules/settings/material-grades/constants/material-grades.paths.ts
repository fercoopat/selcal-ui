const BASE_PATH = "/material-grades";

export const SETTINGS_MATERIAL_GRADES_BASE_PATH = `/settings${BASE_PATH}`;

export const MATERIAL_GRADES_PATHS = {
  LIST: SETTINGS_MATERIAL_GRADES_BASE_PATH,

  DETAILS: (id: string) => `${SETTINGS_MATERIAL_GRADES_BASE_PATH}/${id}`,
} as const;
