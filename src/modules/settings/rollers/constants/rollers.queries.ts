export const ROLLERS_QUERIES = {
  all: ["ROLLERS"] as const,
  list: ["ROLLERS", "list"] as const,
  detail: (id: string | undefined) => ["ROLLERS", "detail", id] as const,
  findAll: ["ROLLERS", "list"] as const,
  findOne: (id: string | undefined) => ["ROLLERS", "detail", id] as const,
} as const;