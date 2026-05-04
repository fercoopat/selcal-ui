export const MILL_TYPES_QUERIES = {
  all: ["MILL_TYPES"] as const,
  list: ["MILL_TYPES", "list"] as const,
  detail: (id: string | undefined) => ["MILL_TYPES", "detail", id] as const,
  findAll: ["MILL_TYPES", "list"] as const,
  findOne: (id: string | undefined) => ["MILL_TYPES", "detail", id] as const,
} as const;
