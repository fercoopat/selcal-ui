export const PASSES_QUERIES = {
  all: ["passes"] as const,
  findAll: ["passes", "list"] as const,
  findOne: (id: string) => ["passes", "details", id] as const,
} as const;
