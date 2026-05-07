export const ROLLING_MILLS_QUERIES = {
  all: ["ROLLING_MILLS"] as const,
  list: ["ROLLING_MILLS", "list"] as const,
  detail: (id: string | undefined) => ["ROLLING_MILLS", "detail", id] as const,
  findAll: ["ROLLING_MILLS", "list"] as const,
  findOne: (id: string | undefined) => ["ROLLING_MILLS", "detail", id] as const,
} as const;
