export const CHEMICAL_ELEMENTS_QUERIES = {
  all: ["chemical-elements"] as const,
  findAll: ["chemical-elements", "list"] as const,
  findOne: (id: string) => ["chemical-elements", "details", id] as const,
} as const;
