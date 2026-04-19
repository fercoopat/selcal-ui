export const PASSES_PATHS = {
  BASE_PATH: "/passes",

  detailPath: (id: string) => `/passes/${id}`,
} as const;
