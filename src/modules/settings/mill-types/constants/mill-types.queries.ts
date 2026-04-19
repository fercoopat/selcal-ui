export const MILL_TYPES_QUERIES = {
  all: ["mill-types"] as const,
  findAll: ["mill-types", "list"] as const,
  findOne: (id: string) => ["mill-types", "details", id] as const,
} as const;
