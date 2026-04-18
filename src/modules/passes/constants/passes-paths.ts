export const PASSES_PATHS = {
  basePath: "/passes",
  detailPath: (id: string) => `/passes/${id}`,
} as const;
