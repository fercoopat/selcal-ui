export const ENGINES_QUERIES = {
  all: ["ENGINES"] as const,
  list: ["ENGINES", "list"] as const,
  detail: (id: string | undefined) => ["ENGINES", "detail", id] as const,
  findAll: ["ENGINES", "list"] as const,
  findOne: (id: string | undefined) => ["ENGINES", "detail", id] as const,
} as const;