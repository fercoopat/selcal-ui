export const CHEMICAL_ELEMENTS_PATHS = {
  LIST: "/chemical-elements",
  
  DETAILS: (id: string) => `/chemical-elements/${id}`,
} as const;
