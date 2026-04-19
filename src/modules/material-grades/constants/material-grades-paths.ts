export const MATERIAL_GRADES_PATHS = {
  LIST: "/material-grades",

  DETAILS: (id: string) => `/material-grades/${id}`,
} as const;
