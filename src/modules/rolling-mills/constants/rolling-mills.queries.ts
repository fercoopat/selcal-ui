export const ROLLING_MILLS_QUERIES = {
  all: ["rolling-mills"] as const,
  findAll: ["rolling-mills", "list"] as const,
  findOne: (id: string) => ["rolling-mills", "details", id] as const,
} as const;
