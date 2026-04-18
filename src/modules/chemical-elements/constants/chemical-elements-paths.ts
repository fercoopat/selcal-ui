export const CHEMICAL_ELEMENTS_PATHS = {
  basePath: "/chemical-elements",
  detailPath: (id: string) => `/chemical-elements/${id}`,
} as const;
