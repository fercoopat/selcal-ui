export const PASS_GEOMETRY_TYPES_QUERIES = {
  all: ["pass-geometry-types"] as const,
  findAll: ["pass-geometry-types", "list"] as const,
  findOne: (id: string) => ["pass-geometry-types", "details", id] as const,
} as const;
