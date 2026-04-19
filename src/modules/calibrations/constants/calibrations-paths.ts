export const CALIBRATIONS_PATHS = {
  LIST: "/calibrations",
  
  DETAILS: (id: string) => `/calibrations/${id}`,
} as const;
