export const CALIBRATIONS_PATHS = {
  basePath: "/calibrations",
  detailPath: (id: string) => `/calibrations/${id}`,
} as const;
