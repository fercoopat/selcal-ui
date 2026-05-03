export const BEARINGS_QUERIES = {
  all: ["BEARINGS"] as const,
  list: ["BEARINGS", "list"] as const,
  detail: (id: string | undefined) => ["BEARINGS", "detail", id] as const,
  findAll: ["BEARINGS", "list"] as const,
  findOne: (id: string | undefined) => ["BEARINGS", "detail", id] as const,
} as const;
