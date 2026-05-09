export const STANDS_QUERIES = {
  all: ["STANDS"] as const,
  list: ["STANDS", "list"] as const,
  detail: (id: string | undefined) => ["STANDS", "detail", id] as const,
  findAll: ["STANDS", "list"] as const,
  findOne: (id: string | undefined) => ["STANDS", "detail", id] as const,
} as const;
