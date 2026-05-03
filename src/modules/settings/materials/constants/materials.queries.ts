export const MATERIALS_QUERIES = {
  all: ["MATERIALS"] as const,
  list: ["MATERIALS", "list"] as const,
  detail: (id: string | undefined) => ["MATERIALS", "detail", id] as const,
  findAll: ["MATERIALS", "list"] as const,
  findOne: (id: string | undefined) => ["MATERIALS", "detail", id] as const,
} as const;
